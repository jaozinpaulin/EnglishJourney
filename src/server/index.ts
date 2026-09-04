import "dotenv/config";

import cors from "cors";
import express from "express";
import { generateJourney } from "./ai/generateJourney";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
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

        console.log("\n=============================================");
        console.log("[NOVO ONBOARDING] Perfil recebido:");
        console.log(`- Nível: ${profile.level}`);
        console.log(`- Tempo diário: ${profile.studyPlan.dailyMinutes} min`);
        console.log(`- Motivações: ${profile.motivations.join(", ")}`);
        console.log(" Chamando o Gemini para montar o plano por módulos...");

        const startTime = Date.now();
        const journey = await generateJourney(profile);
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        console.log(` [SUCESSO] Jornada gerada em ${duration}s!`);
        console.log(` Módulos Ativos Hoje: ${journey.overview.activeModules.join(", ")}`);
        console.log("\n JSON Estruturado Retornado:");
        console.dir(journey, { depth: null, colors: true });
        console.log("=============================================\n");

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