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

    const url = `http://localhost:3000/api/translate?sl=${sourceLang}&tl=${targetLang}&q=${encodeURIComponent(clean)}`;
    const res = await fetch(url);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Status da tradução:", res.status, errorData);
        throw new Error(errorData.error || `Erro de tradução: status ${res.status}`);
    }

    const data = await res.json();

    return {
        word: data.word || clean,
        translation: data.translation || "",
        alternativeTranslations: data.alternativeTranslations || [],
        synonyms: data.synonyms || [],
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
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}