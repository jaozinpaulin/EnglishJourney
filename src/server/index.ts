import "dotenv/config";
import cors from "cors";
import express from "express";
import { Type } from "@google/genai";
import ai from "./ai/gemini";
import { generateJourney } from "./ai/generateJourney";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/translate", async (req, res) => {
    try {
        const { q, sl = "en", tl = "pt" } = req.query;

        if (!q || typeof q !== "string") {
            return res.status(400).json({ error: "Texto não informado." });
        }

        const cleanText = q.trim();

        try {
            const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${sl}|${tl}`;
            const mmRes = await fetch(myMemoryUrl);
            if (mmRes.ok) {
                const mmData = await mmRes.json();
                const translation = mmData?.responseData?.translatedText;
                if (translation) {
                    const matches = mmData?.matches || [];
                    const altList = matches
                        .map((m: any) => m.translation)
                        .filter((t: string) => t && t.toLowerCase() !== translation.toLowerCase())
                        .slice(0, 4);

                    return res.json({
                        word: cleanText,
                        translation,
                        alternativeTranslations: altList,
                        synonyms: [],
                    });
                }
            }
        } catch (e) {
            console.warn("MyMemory falhou, tentando fallback...");
        }

        const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&dt=at&q=${encodeURIComponent(cleanText)}`;
        const gRes = await fetch(googleUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
        });

        if (!gRes.ok) {
            throw new Error(`Serviço de tradução indisponível (${gRes.status})`);
        }

        const gData = await gRes.json();
        const mainTranslation = gData?.[0]?.map((item: any) => item[0]).join("") || "";

        return res.json({
            word: cleanText,
            translation: mainTranslation,
            alternativeTranslations: [],
            synonyms: [],
        });
    } catch (error: any) {
        console.error("Erro na tradução:", error);
        res.status(500).json({ error: error?.message || "Falha ao traduzir." });
    }
});
app.post("/api/dictionary/enrich", async (req, res) => {
    try {
        const { term, translation } = req.body;

        if (!term || !translation) {
            return res.status(400).json({ error: "Termo e tradução são obrigatórios." });
        }

        const prompt = `Analise a palavra/expressão em inglês "${term}" (tradução aproximada: "${translation}"). 
            Retorne em JSON:
            1. Fonética IPA e classe gramatical (em português).
            2. 3 exemplos naturais e variados em inglês com suas respectivas traduções em português.
            3. 1 dica prática e objetiva de uso no dia a dia (em português).
            4. Uma comparação com uma palavra similar ou confusão comum (ex: Yet vs Still), explicando brevemente a diferença prática.
            5. 2 a 3 expressões ou combinações comuns (collocations) usando essa palavra.`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        phonetic: { type: Type.STRING },
                        partOfSpeech: { type: Type.STRING },
                        conceptTip: { type: Type.STRING },
                        comparison: {
                            type: Type.OBJECT,
                            properties: {
                                similarWord: { type: Type.STRING },
                                difference: { type: Type.STRING },
                            },
                            required: ["similarWord", "difference"],
                        },
                        examples: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    en: { type: Type.STRING },
                                    pt: { type: Type.STRING },
                                },
                                required: ["en", "pt"],
                            },
                        },
                        collocations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                    },
                    required: ["phonetic", "partOfSpeech", "conceptTip", "comparison", "examples", "collocations"],
                },
            },
        });

        if (!response.text) {
            throw new Error("Resposta da IA vazia");
        }

        res.json(JSON.parse(response.text));
    } catch (error: any) {
        console.error("Erro no enriquecimento do dicionário:", error);
        res.status(500).json({
            error: error?.message || "Falha ao enriquecer palavra com IA.",
        });
    }
});

// Jornada
app.post("/api/journey", async (req, res) => {
    try {
        const profile = req.body;

        if (
            !profile.level ||
            !Array.isArray(profile.motivations) ||
            !Array.isArray(profile.abilities) ||
            !profile.studyPlan?.dailyMinutes
        ) {
            return res.status(400).json({
                error: "Perfil do aluno incompleto.",
            });
        }

        const journey = await generateJourney(profile);
        res.json(journey);
    } catch (error: any) {
        console.error("Erro ao gerar jornada:", error);
        res.status(500).json({
            error: error?.message || "Não foi possível gerar a jornada.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});