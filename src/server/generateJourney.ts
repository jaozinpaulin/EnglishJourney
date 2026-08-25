import { GoogleGenAI, Type } from "@google/genai";
import a1Curriculum from "../curriculum/A1.json";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export interface UserFormProps {
    level?: string;
    lessonId?: string;
    interests?: string[];
    skills?: {
        speaking?: { confidence: string; priority: boolean };
        listening?: { confidence: string; priority: boolean };
    };
}

export function getLessonData(lessonId: string) {
    for (const unit of a1Curriculum.units) {
        const lesson = unit.lessons.find((l: any) => l.id === lessonId);
        if (lesson) {
            return {
                unitId: unit.id,
                unitNumber: unit.unit_number,
                unitTitle: unit.title,
                unitGoal: unit.communicative_goal,
                mainCanDo: unit.main_can_do,
                lesson,
            };
        }
    }

    const defaultUnit = a1Curriculum.units[0];
    return {
        unitId: defaultUnit.id,
        unitNumber: defaultUnit.unit_number,
        unitTitle: defaultUnit.title,
        unitGoal: defaultUnit.communicative_goal,
        mainCanDo: defaultUnit.main_can_do,
        lesson: defaultUnit.lessons[0],
    };
}

export async function generateJourney(
    userProps: UserFormProps,
    targetLessonId = "A1_U01_L01"
) {
    const lessonIdToUse = userProps.lessonId || targetLessonId;
    const { unitId, unitNumber, unitTitle, unitGoal, mainCanDo, lesson } =
        getLessonData(lessonIdToUse);

    const systemInstruction = `
Você é o motor pedagógico oficial do "English Journey".
Sua função é gerar o MASTER PAYLOAD completo para a lição [${lesson.id} - ${lesson.title}] do nível A1.

REGRAS:
1. Use ESTRITAMENTE o vocabulário base (${lesson.core_vocabulary.join(", ")}) e gramática (${lesson.grammar}) da lição canônica.
2. Contextualize exemplos e diálogos para situações cotidianas, trabalho, tecnologia ou viagem.
3. Gere todas as seções exigidas no schema:
   - vocabularyLab: lista de palavras com tradução, fonética e frase de exemplo
   - grammarLab: regra explicada de forma clara e exemplos práticos
   - listeningLab: áudio-script de diálogo + pergunta com opções
   - speakingLab: frase-chave com guia de pronúncia
   - readingLab: texto curto e pergunta de interpretação
   - writingLab: desafio de escrita com resposta modelo
   - dailyJourneySteps: exatamente 5 passos integrados (recall -> input -> practice -> interaction -> review)
4. Retorne EXCLUSIVAMENTE o JSON de acordo com o schema.
`;

    const userPrompt = `
LIÇÃO CANÔNICA DO CURRÍCULO:
Unidade ${unitNumber}: [${unitId}] ${unitTitle}
Meta da Unidade: ${unitGoal}
Can-Do: ${mainCanDo}

Lição ${lesson.lesson_number}: [${lesson.id}] ${lesson.title}
Objetivo: ${lesson.objective}
Vocabulário Permitido: ${lesson.core_vocabulary.join(", ")}
Gramática: ${lesson.grammar}

Gere o Master Payload em JSON agora.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    lessonId: { type: Type.STRING },
                    unitId: { type: Type.STRING },
                    lessonTitle: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    decision: {
                        type: Type.STRING,
                        enum: ["SUPPORT", "DEVELOP", "MASTER"],
                    },
                    decisionReason: { type: Type.STRING },

                    // 1. Vocabulary
                    vocabularyLab: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                word: { type: Type.STRING },
                                translation: { type: Type.STRING },
                                phonetic: { type: Type.STRING },
                                partOfSpeech: { type: Type.STRING },
                                exampleSentence: { type: Type.STRING },
                                exampleTranslation: { type: Type.STRING },
                            },
                            required: [
                                "word",
                                "translation",
                                "phonetic",
                                "exampleSentence",
                                "exampleTranslation",
                            ],
                        },
                    },

                    // 2. Grammar
                    grammarLab: {
                        type: Type.OBJECT,
                        properties: {
                            ruleTitle: { type: Type.STRING },
                            explanation: { type: Type.STRING },
                            patterns: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                            },
                            commonMistakes: { type: Type.STRING },
                            examples: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        correct: { type: Type.STRING },
                                        incorrect: { type: Type.STRING },
                                        note: { type: Type.STRING },
                                    },
                                    required: ["correct", "note"],
                                },
                            },
                        },
                        required: ["ruleTitle", "explanation", "patterns", "examples"],
                    },

                    // 3. Listening
                    listeningLab: {
                        type: Type.OBJECT,
                        properties: {
                            audioScript: { type: Type.STRING },
                            speaker: { type: Type.STRING },
                            questionPrompt: { type: Type.STRING },
                            options: { type: Type.ARRAY, items: { type: Type.STRING } },
                            correctAnswer: { type: Type.STRING },
                            explanation: { type: Type.STRING },
                        },
                        required: [
                            "audioScript",
                            "questionPrompt",
                            "options",
                            "correctAnswer",
                        ],
                    },

                    // 4. Speaking
                    speakingLab: {
                        type: Type.OBJECT,
                        properties: {
                            targetPhrase: { type: Type.STRING },
                            phoneticGuide: { type: Type.STRING },
                            meaning: { type: Type.STRING },
                            expectedKeywords: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                            },
                        },
                        required: [
                            "targetPhrase",
                            "phoneticGuide",
                            "meaning",
                            "expectedKeywords",
                        ],
                    },

                    // 5. Reading
                    readingLab: {
                        type: Type.OBJECT,
                        properties: {
                            textTitle: { type: Type.STRING },
                            passage: { type: Type.STRING },
                            comprehensionQuestions: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        question: { type: Type.STRING },
                                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                        correctAnswer: { type: Type.STRING },
                                    },
                                    required: ["question", "options", "correctAnswer"],
                                },
                            },
                        },
                        required: ["textTitle", "passage", "comprehensionQuestions"],
                    },

                    // 6. Writing
                    writingLab: {
                        type: Type.OBJECT,
                        properties: {
                            prompt: { type: Type.STRING },
                            expectedModelAnswer: { type: Type.STRING },
                            acceptableVariations: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                            },
                        },
                        required: [
                            "prompt",
                            "expectedModelAnswer",
                            "acceptableVariations",
                        ],
                    },

                    // 7. 5 Passos da Lição Diária
                    dailyJourneySteps: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                stepNumber: { type: Type.INTEGER },
                                phase: {
                                    type: Type.STRING,
                                    enum: ["recall", "input", "practice", "interaction", "review"],
                                },
                                skillTarget: { type: Type.STRING },
                                title: { type: Type.STRING },
                                type: {
                                    type: Type.STRING,
                                    enum: [
                                        "multiple_choice",
                                        "fill_in_the_blank",
                                        "speaking_record",
                                        "dialogue_response",
                                    ],
                                },
                                prompt: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                correctAnswer: { type: Type.STRING },
                                acceptableAnswers: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                },
                                hints: { type: Type.ARRAY, items: { type: Type.STRING } },
                            },
                            required: [
                                "stepNumber",
                                "phase",
                                "skillTarget",
                                "title",
                                "type",
                                "prompt",
                                "correctAnswer",
                                "acceptableAnswers",
                            ],
                        },
                    },
                },
                required: [
                    "lessonId",
                    "unitId",
                    "lessonTitle",
                    "objective",
                    "decision",
                    "decisionReason",
                    "vocabularyLab",
                    "grammarLab",
                    "listeningLab",
                    "speakingLab",
                    "readingLab",
                    "writingLab",
                    "dailyJourneySteps",
                ],
            },
        },
    });

    const text = response.text;
    if (!text) throw new Error("O Gemini retornou vazio.");
    return JSON.parse(text);
}