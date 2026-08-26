import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Regras pedagógicas e guardrails imutáveis
const SYSTEM_PROMPT = `
Você é o motor pedagógico adaptativo do "English Journey".
Sua função é gerar a jornada de estudo diária (Daily Journey) personalizada para o aluno.

REGRAS OBRIGATÓRIAS:
1. NÃO altere o currículo nem invente lições fora da lição solicitada.
2. A jornada DEVE conter exatamente 5 passos sequenciais:
   - Passo 1 (recall): Revisão rápida de vocabulário/estruturas passadas.
   - Passo 2 (input): Reconhecimento e compreensão do tema da lição atual.
   - Passo 3 (practice): Prática controlada (múltipla escolha ou preenchimento).
   - Passo 4 (interaction): Produção ou resposta direta a diálogo contextualizado.
   - Passo 5 (review): Fechamento e consolidação da lição.
3. DECISÃO PEDAGÓGICA (Defina o campo "decision"):
   - Nota < 0.60: "SUPPORT" (forneça mais dicas e simplifique o vocabulário periférico).
   - Nota entre 0.60 e 0.84: "DEVELOP" (mantenha o nível e varie contextos).
   - Nota >= 0.85: "MASTER" (menos dicas, foco em produção fluida).
4. Utilize os interesses do aluno para criar cenários mais engajantes.
5. Retorne EXCLUSIVAMENTE um objeto JSON válido seguindo a estrutura solicitada.
`;

export interface LessonData {
    id: string;
    title: string;
    objective: string;
    coreVocabulary: string[];
    grammar: string;
}

export interface UserJourneyInput {
    userId: string;
    currentLesson: LessonData;
    previousLessonsSummary: string[];
    interests: string[];
    currentMasteryScore: number; // 0.0 a 1.0
    weakAreas: string[];
}

export interface StepActivity {
    stepNumber: number;
    phase: "recall" | "input" | "practice" | "interaction" | "review";
    title: string;
    type: "multiple_choice" | "fill_in_the_blank" | "dialogue_response";
    prompt: string;
    options?: string[]; // Apenas para multiple_choice
    correctAnswer: string;
    acceptableAnswers: string[];
    hints: string[];
}

export interface GeneratedDailyJourney {
    journeyId: string;
    userId: string;
    lessonId: string;
    decision: "MASTER" | "DEVELOP" | "SUPPORT";
    decisionReason: string;
    steps: StepActivity[];
}

/**
 * Gera a jornada diária personalizada usando a OpenAI
 */
export async function createDailyJourney(input: UserJourneyInput): Promise<GeneratedDailyJourney> {
    const userPrompt = `
Contexto do Aluno:
- ID: ${input.userId}
- Nota Atual de Domínio: ${input.currentMasteryScore.toFixed(2)}
- Áreas Fracas: ${input.weakAreas.join(", ") || "Nenhuma registrada"}
- Interesses: ${input.interests.join(", ") || "Geral"}
- Lições Concluídas Anteriores: ${input.previousLessonsSummary.join(", ") || "Primeira lição"}

Lição Alvo Atual:
- ID: ${input.currentLesson.id}
- Título: ${input.currentLesson.title}
- Objetivo: ${input.currentLesson.objective}
- Vocabulário Chave: ${input.currentLesson.coreVocabulary.join(", ")}
- Foco Gramatical: ${input.currentLesson.grammar}

Gere o plano de estudo diário com os 5 passos no seguinte formato JSON:
{
  "decision": "SUPPORT" | "DEVELOP" | "MASTER",
  "decisionReason": "Explicação curta da decisão",
  "steps": [
    {
      "stepNumber": 1,
      "phase": "recall",
      "title": "Título do passo",
      "type": "multiple_choice" | "fill_in_the_blank" | "dialogue_response",
      "prompt": "Enunciado da pergunta",
      "options": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
      "correctAnswer": "Opção correta exata",
      "acceptableAnswers": ["Variação 1", "Variação 2"],
      "hints": ["Dica 1"]
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
        ],
    });

    const parsed = JSON.parse(completion.choices[0].message.content || "{}");

    return {
        journeyId: `DJ_${Date.now()}_${input.userId}`,
        userId: input.userId,
        lessonId: input.currentLesson.id,
        decision: parsed.decision || "DEVELOP",
        decisionReason: parsed.decisionReason || "Progressão padrão",
        steps: parsed.steps || [],
    };
}

/**
 * Atualiza o score do aluno após a conclusão da jornada
 */
export function calculateNextMastery(currentMastery: number, correctStepsCount: number, totalSteps = 5) {
    const sessionScore = correctStepsCount / totalSteps;
    // Média ponderada: 60% peso do histórico anterior + 40% da sessão de hoje
    const updatedMastery = Number((currentMastery * 0.6 + sessionScore * 0.4).toFixed(2));
    const shouldAdvanceLesson = updatedMastery >= 0.70;

    return {
        updatedMastery,
        sessionScore,
        shouldAdvanceLesson,
    };
}