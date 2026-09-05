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