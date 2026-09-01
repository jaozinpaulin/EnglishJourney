import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Compass, Sparkles } from "lucide-react";
import { CompassRose } from "./CompassRose";

export function OnboardingHeroBanner() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-[#C96B62]/30 bg-gradient-to-r from-[#241716] via-[#1E1716] to-[#171717] p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C96B62]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-24 w-72 bg-[#C96B62]/5 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C96B62]/40 bg-[#C96B62]/10">
                        <CompassRose className="h-6 w-6 text-[#E07A70]" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#E07A70]">
                            <Sparkles size={13} />
                            Próximo passo da sua jornada
                        </div>

                        <h2 className="mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">
                            Vamos montar seu plano de inglês?
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B5B3AD]">
                            Responda algumas perguntas rápidas para receber lições, metas e
                            vocabulário adaptados ao seu ritmo e aos seus objetivos.
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-[#9C9892]">
                            <CheckCircle2 size={14} className="text-[#E07A70]" />
                            Leva menos de 3 minutos
                        </div>
                    </div>
                </div>

                <Link
                    to="/onboarding"
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#C96B62]/10 transition-all hover:-translate-y-0.5 hover:bg-[#D8786E] hover:shadow-[#C96B62]/20 active:translate-y-0"
                >
                    <Compass size={16} />
                    Criar meu plano
                    <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </section>
    );
}