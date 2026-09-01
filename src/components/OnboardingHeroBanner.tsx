import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Compass, AlertCircle } from "lucide-react";

export function OnboardingHeroBanner() {
    return (
        <section className="relative rounded-2xl border border-amber-500/40 p-5 sm:p-7">
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-amber-500/30 px-3 py-1 text-[11px] font-semibold text-amber-400">
                <AlertCircle size={13} className="animate-pulse" />
                <span>Pendente</span>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">

                    <div>
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">
                            Ação necessária
                        </div>

                        <h2 className="mt-1.5 text-lg font-bold tracking-tight text-white sm:text-xl">
                            Vamos montar seu plano de inglês?
                        </h2>

                        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-300">
                            Responda algumas perguntas rápidas para receber lições, metas e
                            vocabulário adaptados ao seu ritmo e aos seus objetivos.
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                            <CheckCircle2 size={14} className="text-amber-400" />
                            <span>Leva menos de 3 minutos</span>
                        </div>
                    </div>
                </div>

                <Link
                    to="/onboarding"
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400"
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