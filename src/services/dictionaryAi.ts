export interface QuickTranslationResult {
    word: string;
    translation: string;
    alternativeTranslations: string[];
    synonyms: string[];
}

export interface AIExample {
    en: string;
    pt: string;
}

export interface AIComparison {
    similarWord: string;
    difference: string;
}

export interface AIEnrichment {
    phonetic: string;
    partOfSpeech: string;
    conceptTip: string;
    comparison: AIComparison;
    examples: AIExample[];
    collocations: string[];
}

export async function quickTranslate(
    text: string,
    sourceLang: string,
    targetLang: string
): Promise<QuickTranslationResult> {
    const clean = text.trim();
    if (!clean) {
        return { word: "", translation: "", alternativeTranslations: [], synonyms: [] };
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=at&dt=ss&q=${encodeURIComponent(clean)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro no Google Translate");

    const data = await res.json();
    const mainTranslation = data?.[0]?.map((item: any) => item[0]).join("") || "";

    const altList: string[] = [];
    if (Array.isArray(data?.[5])) {
        data[5].forEach((entry: any) => {
            if (Array.isArray(entry?.[2])) {
                entry[2].forEach((item: any) => {
                    const word = item?.[0];
                    if (word && !altList.includes(word) && word.toLowerCase() !== mainTranslation.toLowerCase()) {
                        altList.push(word);
                    }
                });
            }
        });
    }

    const synonymsList: string[] = [];
    if (Array.isArray(data?.[11])) {
        data[11].forEach((group: any) => {
            if (Array.isArray(group?.[1])) {
                group[1].forEach((item: any) => {
                    if (Array.isArray(item?.[0])) {
                        item[0].forEach((syn: string) => {
                            if (syn && !synonymsList.includes(syn) && syn.toLowerCase() !== clean.toLowerCase()) {
                                synonymsList.push(syn);
                            }
                        });
                    }
                });
            }
        });
    }

    return {
        word: clean,
        translation: mainTranslation,
        alternativeTranslations: altList.slice(0, 5),
        synonyms: synonymsList.slice(0, 6),
    };
}

export async function enrichWordWithAI(term: string, translation: string): Promise<AIEnrichment> {
    const response = await fetch("http://localhost:3000/api/dictionary/enrich", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ term, translation }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Falha ao consultar a IA no servidor");
    }

    return await response.json();
}

export function speakWord(text: string, lang = "en-US") {
    if (!("speechSynthesis" in window) || !text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}