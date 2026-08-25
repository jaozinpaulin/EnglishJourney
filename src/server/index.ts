import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateJourney } from "./generateJourney";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/journey", async (req, res) => {
    try {
        const userPayload = req.body || {};
        console.log("Recebendo requisição para gerar jornada...");

        const journey = await generateJourney(userPayload, userPayload.lessonId || "A1_U01_L01");
        console.log("Jornada gerada com sucesso!");

        return res.json(journey);
    } catch (error: any) {
        console.error("Erro ao gerar jornada:", error);
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});