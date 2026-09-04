import { useState } from 'react';

type JourneyResponse = {
    lesson: {
        id: string;
        title: string;
        objective: string;
    };
    welcomeMessage: string;
    personalizedGoal: string;
};

const testProfile = {
    level: 'A1',
    motivations: ['travel', 'entertainment'],
    abilities: [
        'Travel abroad without anxiety',
        'Ask for and follow directions',
        'Watch videos without subtitles',
    ],
    studyPlan: {
        dailyMinutes: 50,
        daysPerWeek: 5,
    },
};

export default function ChatBase() {
    const [journey, setJourney] = useState<JourneyResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleGenerateJourney = async () => {
        if (loading) return;

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/journey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testProfile),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || 'Não foi possível gerar a jornada.',
                );
            }

            setJourney(data);
        } catch (error) {
            console.error(error);

            const message =
                error instanceof Error
                    ? error.message
                    : 'Algo deu errado ao gerar sua jornada.';

            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
            <section className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h1 className="text-2xl font-bold">English Journey</h1>

                <p className="mt-2 text-sm text-zinc-400">
                    Teste da criação da jornada personalizada.
                </p>

                <button
                    type="button"
                    onClick={handleGenerateJourney}
                    disabled={loading}
                    className="mt-6 rounded-xl bg-[#C96B62] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B85C55] disabled:opacity-50"
                >
                    {loading ? 'Gerando jornada...' : 'Gerar minha jornada'}
                </button>

                {errorMessage && (
                    <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
                )}

                {journey && (
                    <div className="mt-6 space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                        <div>
                            <p className="text-xs text-zinc-500">
                                Sua primeira lição
                            </p>
                            <h2 className="text-lg font-semibold">
                                {journey.lesson.title}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-400">
                                {journey.lesson.objective}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-500">
                                Mensagem da IA
                            </p>
                            <p className="mt-1 text-sm">
                                {journey.welcomeMessage}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-500">
                                Objetivo personalizado
                            </p>
                            <p className="mt-1 text-sm">
                                {journey.personalizedGoal}
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
