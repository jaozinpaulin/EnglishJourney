import { Type } from "@google/genai";
import ai from "./gemini";
import rawA1Curriculum from "../../curriculum/A1.json";

export async function generateJourney(profile: any) {
    const curriculumData = (rawA1Curriculum as any).default || rawA1Curriculum;

    const levelA1 = Array.isArray(curriculumData.levels)
        ? (curriculumData.levels.find((lvl: any) => lvl.id === "A1") || curriculumData.levels[0])
        : curriculumData;

    if (!levelA1 || !Array.isArray(levelA1.units)) {
        throw new Error("Estrutura do curriculum A1.json inválida ou campo 'units' não encontrado.");
    }

    const unit = levelA1.units[0];
    const baseLesson = unit.lessons[0];

    const prioritySkills = Object.entries(profile.skills || {})
        .filter(([_, data]: any) => data.priority)
        .map(([skill]) => skill);

    const dailyMinutes = profile.studyPlan?.dailyMinutes || 20;

    const prompt = `
Você é o motor pedagógico adaptativo da plataforma English Journey.
Sua missão é gerar o plano de estudo do Dia 1, estritamente ancorado na Lição 1 da Unidade 1 do nível A1.

DADOS DA LIÇÃO BASE (NUNCA fuja deste vocabulário e gramática):
- Unidade: ${unit.title} (${unit.communicative_goal})
- Lição: ${baseLesson.title}
- Objetivo Didático: ${baseLesson.objective}
- Vocabulário Core: ${baseLesson.core_vocabulary.join(", ")}
- Gramática: ${baseLesson.grammar}
- Activity Pool Oficial: ${JSON.stringify(baseLesson.activity_pool)}

PERFIL DO ALUNO (ONBOARDING):
- Motivações: ${profile.motivations?.join(", ") || "Geral"}
- Objetivos de Uso: ${profile.abilities?.join(", ") || "Comunicação básica"}
- Limite de tempo diário: ${dailyMinutes} minutos
- Habilidades Prioritárias: [${prioritySkills.join(", ")}]

REGRAS DE DISTRIBUIÇÃO ENTRE AS PÁGINAS DA SIDEBAR:
1. O aluno NÃO deve fazer todas as 7 abas no mesmo dia. Ative entre 2 e 4 módulos no total para não estourar o limite de ${dailyMinutes} minutos.
2. Dê prioridade imediata aos módulos que o aluno marcou como prioritários: ${prioritySkills.join(", ")}.
3. Se um módulo não for trabalhado hoje: defina "active: false", "targetTimeMinutes: 0" e "tasks: []".
4. Nos módulos marcados como "active: true", elabore os exercícios e diálogos adaptando o contexto aos interesses do aluno, mas mantendo estritamente a gramática e o vocabulário base de A1.
5. "activeModulesList" deve conter apenas as chaves dos módulos que foram ativados hoje.
`;

    const moduleSchema = {
        type: Type.OBJECT,
        properties: {
            active: { type: Type.BOOLEAN },
            targetTimeMinutes: { type: Type.INTEGER },
            objective: { type: Type.STRING },
            tasks: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        type: { type: Type.STRING },
                        prompt: { type: Type.STRING },
                        contextSnippet: { type: Type.STRING },
                        options: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                        correctAnswer: { type: Type.STRING },
                        explanation: { type: Type.STRING },
                    },
                    required: ["id", "type", "prompt", "correctAnswer"],
                },
            },
        },
        required: ["active", "targetTimeMinutes", "objective", "tasks"],
    };

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    welcomeMessage: { type: Type.STRING },
                    focusSummary: { type: Type.STRING },
                    activeModulesList: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                    vocabulary: moduleSchema,
                    grammar: moduleSchema,
                    listening: moduleSchema,
                    speaking: moduleSchema,
                    reading: moduleSchema,
                    writing: moduleSchema,
                    review: moduleSchema,
                },
                required: [
                    "welcomeMessage",
                    "focusSummary",
                    "activeModulesList",
                    "vocabulary",
                    "grammar",
                    "listening",
                    "speaking",
                    "reading",
                    "writing",
                    "review",
                ],
            },
        },
    });

    if (!response.text) {
        throw new Error("Erro ao gerar jornada com IA: Resposta vazia.");
    }

    const aiData = JSON.parse(response.text);

    return {
        date: new Date().toISOString().split("T")[0],
        dayNumber: 1,
        unit: {
            id: unit.id,
            number: unit.unit_number,
            title: unit.title,
            communicativeGoal: unit.communicative_goal,
        },
        lesson: {
            id: baseLesson.id,
            number: baseLesson.lesson_number,
            title: baseLesson.title,
            grammarRule: baseLesson.grammar,
            coreVocabulary: baseLesson.core_vocabulary,
        },
        overview: {
            welcomeMessage: aiData.welcomeMessage,
            focusSummary: aiData.focusSummary,
            totalEstimatedMinutes: dailyMinutes,
            activeModules: aiData.activeModulesList,
        },
        modules: {
            vocabulary: aiData.vocabulary,
            grammar: aiData.grammar,
            listening: aiData.listening,
            speaking: aiData.speaking,
            reading: aiData.reading,
            writing: aiData.writing,
            review: aiData.review,
        },
    };
}