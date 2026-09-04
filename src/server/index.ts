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

        const journey = await generateJourney(profile);

        res.json(journey);
    } catch (error) {
        console.error("Erro ao gerar jornada:", error);

        res.status(500).json({
            error: "Não foi possível gerar a jornada.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});