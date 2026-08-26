import { ArrowRight, BookOpen, Compass, Trophy, Zap } from "lucide-react";
import { CompassRose } from "../components/CompassRose";
import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <div className="min-h-screen w-full bg-[#0F0F0F] text-[#E7E5E1]">

            <section className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-between p-6 sm:p-10 lg:p-12">
                <header className="flex items-center justify-between border-b border-[#242424] pb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A1D1C] text-[#C96B62]">
                            <Compass size={20} strokeWidth={2} />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C96B62]">
                            English Journey
                        </span>
                    </div>

                    <Link
                        to="/authPage"
                        className="rounded-xl border border-[#2E2E2E] bg-[#171717] px-5 py-2 font-mono text-xs font-semibold text-[#D4D4D0] transition-colors hover:border-[#404040] hover:text-white"
                    >
                        Log In
                    </Link>
                </header>

                <div className="my-auto grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2 lg:py-16">
                    <div className="max-w-xl">
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C96B62]">
                            Your path to fluency
                        </p>
                        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                            Learn. Practice. <br />
                            <span className="text-[#C96B62]">Improve with focus.</span>
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-[#999994] sm:text-lg">
                            A structured English learning system designed around your real level, career focus, and daily 20-minute momentum.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                to="/authPage"
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-8 py-3.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                            >
                                Start your journey <ArrowRight size={15} />
                            </Link>
                            <Link
                                to="/authPage"
                                className="font-mono text-xs text-[#777770] hover:text-[#C96B62]"
                            >
                                Already have an account?{" "}
                                <span className="text-white underline underline-offset-4">Log in</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <CompassRose className="h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 border-t border-[#242424] pt-8 lg:grid-cols-3">
                    <div className="flex flex-col justify-between rounded-2xl border border-[#242424] bg-[#161616] p-6 sm:p-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A1D1C] text-[#C96B62]">
                            <BookOpen size={20} strokeWidth={1.8} />
                        </div>
                        <div className="mt-6">
                            <h2 className="text-base font-bold text-white">Structured Learning</h2>
                            <p className="mt-2 text-xs leading-relaxed text-[#999994]">
                                Linear CEFR units from A1 to C2 covering Vocabulary, Grammar, Listening, Speaking, Reading and Writing.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-2xl border border-[#242424] bg-[#161616] p-6 sm:p-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C2426] text-[#8BA9AD]">
                            <Zap size={20} strokeWidth={1.8} />
                        </div>
                        <div className="mt-6">
                            <h2 className="text-base font-bold text-white">Active Daily Practice</h2>
                            <p className="mt-2 text-xs leading-relaxed text-[#999994]">
                                Bite-sized daily challenges, interactive smart flashcards, and simulated workplace dialogues.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-2xl border border-[#242424] bg-[#161616] p-6 sm:p-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#231E2A] text-[#A78BC7]">
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
        </div>
    );
}