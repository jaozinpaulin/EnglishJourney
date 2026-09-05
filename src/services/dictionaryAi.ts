import { Type } from "@google/genai"
import ai from "../server/ai/gemini"

export interface QuickTranslationResult {
    word: string
    translation: string
    alternativeTranslations: string[]
    synonyms: string[]
}

export interface AIEnrichment {
    phonetic: string
    partOfSpeech: string
    example: string
    conceptTip: string
}

export async function quickTranslate(
    text: string,
    sourceLang: string,
    targetLang: string
): Promise<QuickTranslationResult> {
    const clean = text.trim()
    if (!clean) {
        return { word: "", translation: "", alternativeTranslations: [], synonyms: [] }
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=at&dt=ss&q=${encodeURIComponent(clean)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Erro no Google Translate")

    const data = await res.json()
    const mainTranslation = data?.[0]?.map((item: any) => item[0]).join("") || ""

    const altList: string[] = []
    if (Array.isArray(data?.[5])) {
        data[5].forEach((entry: any) => {
            if (Array.isArray(entry?.[2])) {
                entry[2].forEach((item: any) => {
                    const word = item?.[0]
                    if (word && !altList.includes(word) && word.toLowerCase() !== mainTranslation.toLowerCase()) {
                        altList.push(word)
                    }
                })
            }
        })
    }

    const synonymsList: string[] = []
    if (Array.isArray(data?.[11])) {
        data[11].forEach((group: any) => {
            if (Array.isArray(group?.[1])) {
                group[1].forEach((item: any) => {
                    if (Array.isArray(item?.[0])) {
                        item[0].forEach((syn: string) => {
                            if (syn && !synonymsList.includes(syn) && syn.toLowerCase() !== clean.toLowerCase()) {
                                synonymsList.push(syn)
                            }
                        })
                    }
                })
            }
        })
    }

    return {
        word: clean,
        translation: mainTranslation,
        alternativeTranslations: altList.slice(0, 5),
        synonyms: synonymsList.slice(0, 6),
    }
}

export async function enrichWordWithAI(term: string, translation: string): Promise<AIEnrichment> {
    const prompt = `Analise a palavra em inglês "${term}" (tradução: "${translation}"). Retorne a fonética IPA, classe gramatical, 1 frase de exemplo natural e 1 dica curta de uso prático.`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    phonetic: { type: Type.STRING },
                    partOfSpeech: { type: Type.STRING },
                    example: { type: Type.STRING },
                    conceptTip: { type: Type.STRING },
                },
                required: ["phonetic", "partOfSpeech", "example", "conceptTip"],
            },
        },
    })

    if (!response.text) throw new Error("Resposta da IA vazia")
    return JSON.parse(response.text)
}

export function speakWord(text: string, lang = "en-US") {
    if (!("speechSynthesis" in window) || !text.trim()) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
}