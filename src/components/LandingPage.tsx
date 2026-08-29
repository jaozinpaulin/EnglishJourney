import { ArrowRight, BookOpen, Compass, Trophy, Zap, Sparkles, LogIn, UserPlus } from "lucide-react";
import { CompassRose } from "../components/CompassRose";
import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <div className="min-h-screen w-full bg-[#0C0C0E] text-[#E7E5E1] antialiased selection:bg-[#C96B62]/30 selection:text-white">
            <section className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-between p-6 sm:p-10 lg:p-12">

                {/* Header */}
                <header className="flex items-center justify-between border-b border-[#202024] pb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#49302E] bg-gradient-to-br from-[#2D1B1A] to-[#171313] text-[#C96B62]">
                            <Compass size={22} strokeWidth={2} />
                        </div>

                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C96B62]">
                                English Journey
                            </span>
                            <p className="hidden text-[10px] text-zinc-500 sm:block">
                                Sua jornada para aprender inglês
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                        <Link
                            to="/authPage" state={{ mode: "login" }}
                            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-medium text-zinc-400 transition-colors hover:text-white"
                        >
                            <LogIn size={14} />
                            <span>Entrar</span>
                        </Link>

                        <Link
                            to="/authPage" state={{ mode: "signup" }}
                            className="flex items-center gap-1.5 rounded-xl border border-[#B85C55]/30 bg-[#C96B62] px-4 py-2 font-semibold text-white transition-all hover:bg-[#B85C55]"
                        >
                            <UserPlus size={14} />
                            <span>Criar conta</span>
                        </Link>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="my-auto grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2 lg:py-16">

                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-zinc-300">
                            <Sparkles size={13} className="text-[#C96B62]" />
                            <span>Aprenda no seu ritmo, com propósito</span>
                        </div>

                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Aprenda. Pratique. <br />
                            <span className="text-[#C96B62]">Evolua com confiança.</span>
                        </h1>

                        <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                            Uma jornada estruturada para você aprender inglês passo a passo,
                            praticar o que realmente importa e acompanhar sua evolução ao longo do caminho.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                to="/authPage" state={{ mode: "signup" }}
                                className="group flex items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-7 py-3.5 font-mono text-xs font-semibold text-white transition-all hover:bg-[#B85C55]"
                            >
                                Começar minha jornada
                                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>

                            <p className="font-mono text-xs text-zinc-400">
                                Já possui uma conta?{" "}
                                <Link
                                    to="/authPage" state={{ mode: "login" }}
                                    className="text-[#C96B62] underline underline-offset-4 transition-colors hover:text-[#B85C55]"
                                >
                                    Entrar
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <CompassRose className="h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
                    </div>
                </div>

                {/* Grid Inferior */}
                <div className="grid grid-cols-1 gap-5 border-t border-[#202024] pt-8 lg:grid-cols-3">

                    <div className="group rounded-2xl border border-[#222226] bg-[#121214] p-6 transition-all duration-300 hover:border-[#333338] hover:bg-[#161619]">
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#49302E]/60 bg-[#2A1D1C] text-[#C96B62]">
                                <BookOpen size={20} strokeWidth={1.8} />
                            </div>

                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                A1 → C2
                            </span>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-base font-bold text-white transition-colors group-hover:text-[#C96B62]">
                                Aprendizado Estruturado
                            </h2>

                            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                                Um caminho organizado por níveis e etapas, conectando
                                vocabulário, gramática, compreensão e comunicação.
                            </p>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-[#222226] bg-[#121214] p-6 transition-all duration-300 hover:border-[#333338] hover:bg-[#161619]">
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#243538] bg-[#182325] text-[#8BA9AD]">
                                <Zap size={20} strokeWidth={1.8} />
                            </div>

                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                Prática
                            </span>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-base font-bold text-white transition-colors group-hover:text-[#8BA9AD]">
                                Prática que Reforça
                            </h2>

                            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                                Exercícios, revisões e desafios que ajudam você a transformar
                                o conteúdo aprendido em conhecimento realmente utilizável.
                            </p>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-[#222226] bg-[#121214] p-6 transition-all duration-300 hover:border-[#333338] hover:bg-[#161619]">
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#392842] bg-[#231A29] text-[#A78BC7]">
                                <Trophy size={20} strokeWidth={1.8} />
                            </div>

                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                Evolução
                            </span>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-base font-bold text-white transition-colors group-hover:text-[#A78BC7]">
                                Acompanhe seu Progresso
                            </h2>

                            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                                Veja o que você já domina, identifique o que precisa
                                de atenção e continue avançando na sua jornada.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}