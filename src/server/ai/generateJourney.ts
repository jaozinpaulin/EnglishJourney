import { Type } from "@google/genai";
import ai from "./gemini";
import a1Curriculum from "../../curriculum/A1.json";

export async function generateJourney(profile: any) {
    const firstLesson = a1Curriculum.units[0].lessons[0];

    const prompt = `
    Aluno:
    - Nível: ${profile.level}
    - Motivações: ${profile.motivations.join(", ")}
    - Objetivos: ${profile.abilities.join(", ")}
    - Tempo diário: ${profile.studyPlan.dailyMinutes} minutos
    
    Primeira lição:
    - Título: ${firstLesson.title}
    - Objetivo: ${firstLesson.objective}
    - Vocabulário: ${firstLesson.core_vocabulary.join(", ")}
    
    Crie uma mensagem curta de boas-vindas e um objetivo personalizado
    para esta primeira lição. Não altere o conteúdo da lição.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    welcomeMessage: { type: Type.STRING },
                    personalizedGoal: { type: Type.STRING },
                },
                required: ["welcomeMessage", "personalizedGoal"],
            },
        },
    });

    if (!response.text) {
        throw new Error("Gemini retornou uma resposta vazia.");
    }

    const aiContent = JSON.parse(response.text);

    return {
        lesson: firstLesson,
        welcomeMessage: aiContent.welcomeMessage,
        personalizedGoal: aiContent.personalizedGoal,
    };
}