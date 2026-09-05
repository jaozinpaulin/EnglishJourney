import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("ERRO: VITE_GEMINI_API_KEY está indefinida! Verifique o arquivo .env na raiz do projeto.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export default ai;

if (!apiKey) {
    console.error("ERRO: VITE_GEMINI_API_KEY está indefinida! Verifique o arquivo .env na raiz do projeto.");
}