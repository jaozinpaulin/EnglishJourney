import { ArrowRight, BookOpen, Compass, Trophy, Zap } from "lucide-react"

export function LandingPage({ onGetStarted, onLogin }: { onGetStarted: () => void; onLogin: () => void }) {
    return (
        <section className="mx-auto flex min-h-[92vh] w-full max-w-[1500px] flex-col justify-between p-4 sm:p-8 lg:p-12 text-[#E7E5E1]">
            {/* Header / Nav */}
            <header className="flex items-center justify-between border-b border-[#2B2B2B] pb-6">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62]">
                        <Compass size={20} strokeWidth={2} />
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C96B62]">English Journey</span>
                </div>

                <button
                    type="button"
                    onClick={onLogin}
                    className="rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] px-5 py-2 font-mono text-xs font-semibold text-white transition-colors hover:border-[#3A3A3A]"
                >
                    Log In
                </button>
            </header>

            {/* Hero Section */}
            <div className="my-auto max-w-3xl py-12">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C96B62]">Your path to fluency</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Learn. Practice. <br />
                    <span className="text-[#C96B62]">Improve with focus.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#999994] sm:text-lg">
                    A structured English learning system designed around your real level, career focus, and daily 20-minute momentum.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button
                        type="button"
                        onClick={onGetStarted}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-8 py-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                    >
                        Start your journey <ArrowRight size={15} />
                    </button>
                    <button
                        type="button"
                        onClick={onLogin}
                        className="font-mono text-xs text-[#777770] hover:text-[#C96B62]"
                    >
                        Already have an account? <span className="underline text-white">Log in</span>
                    </button>
                </div>
            </div>

            {/* 3 Pilares com Cards Maiores */}
            <div className="grid grid-cols-1 gap-5 border-t border-[#2B2B2B] pt-8 lg:grid-cols-3">
                <div className="flex flex-col justify-between rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6 sm:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62]">
                        <BookOpen size={20} strokeWidth={1.8} />
                    </div>
                    <div className="mt-6">
                        <h2 className="text-base font-bold text-white">Structured Learning</h2>
                        <p className="mt-2 text-xs leading-relaxed text-[#999994]">
                            Linear CEFR units from A1 to C2 covering Vocabulary, Grammar, Listening, Speaking, Reading and Writing.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6 sm:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#202326] text-[#8BA9AD]">
                        <Zap size={20} strokeWidth={1.8} />
                    </div>
                    <div className="mt-6">
                        <h2 className="text-base font-bold text-white">Active Daily Practice</h2>
                        <p className="mt-2 text-xs leading-relaxed text-[#999994]">
                            Bite-sized daily challenges, interactive smart flashcards, and simulated workplace dialogues.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6 sm:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#242126] text-[#A78BC7]">
                        <Trophy size={20} strokeWidth={1.8} />
                    </div>
                    <div className="mt-6">
                        <h2 className="text-base font-bold text-white">Measurable Progress</h2>
                        <p className="mt-2 text-xs leading-relaxed text-[#999994]">
                            Visual telemetry, activity heatmaps, streak retention, and automated AI skill assessments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}