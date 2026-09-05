import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("ERRO: GEMINI_API_KEY não foi encontrada no arquivo .env");
}

const ai = new GoogleGenAI({ apiKey });

export default ai;