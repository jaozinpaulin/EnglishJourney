import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, Clock, X } from "lucide-react";
import { CompassRose } from "./CompassRose";

interface OnboardingModalPromptProps {
    isOpen: boolean;
    onClose: () => void;
    userName?: string;
}

export function OnboardingModalPrompt({ isOpen, onClose, userName = "viajante" }: OnboardingModalPromptProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div onClick={onClose}
                className="fixed inset-0 bg-black/75 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-[#2B2B2B] bg-[#121212] p-6 text-[#E7E5E1] shadow-xl sm:p-10">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#777770] transition-colors hover:bg-[#1E1E1E] hover:text-white">
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center ">
                        <CompassRose className="h-7 w-7" />
                    </div>
                    <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C96B62]">
                            English Journey
                        </span>
                        <p className="text-xs text-[#777770]">Diagnóstico de Aprendizado</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        Bem-vindo(a), {userName}! <br />
                        <span className="text-[#C96B62]">Vamos montar o seu plano de estudos.</span>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#999994]">
                        Para personalizar suas lições diárias, metas de tempo e vocabulário ideal, precisamos conhecer seu nível atual e seus objetivos com o inglês.
                    </p>
                </div>

                <div className="mt-7 space-y-3.5 rounded-2xl border border-[#1F1F1F] bg-[#161616] p-5">
                    <div className="flex items-center gap-3.5 text-xs text-[#E7E5E1] sm:text-sm">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#251A18] text-[#C96B62]">
                            <Target size={15} />
                        </div>
                        <span>Trilha personalizada conforme seu objetivo (viagens, carreira ou estudos)</span>
                    </div>

                    <div className="flex items-center gap-3.5 text-xs text-[#E7E5E1] sm:text-sm">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#251A18] text-[#C96B62]">
                            <Clock size={15} />
                        </div>
                        <span>Rotina flexível adaptada ao tempo real que você tem no dia</span>
                    </div>

                    <div className="flex items-center gap-3.5 text-xs text-[#E7E5E1] sm:text-sm">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#251A18] text-[#C96B62]">
                            <Sparkles size={15} />
                        </div>
                        <span>Diagnóstico rápido em apenas <strong>7 passos simples</strong></span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3.5 sm:flex-row sm:items-center sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-xl px-5 py-3 text-xs font-semibold text-[#8E8E88] transition-colors hover:text-white sm:text-sm"
                    >
                        Fazer mais tarde
                    </button>

                    <Link
                        to="/onboarding"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-7 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55] active:scale-[0.99] sm:text-sm"
                    >
                        <span>Iniciar Minha Jornada</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>

                <p className="mt-5 text-center font-mono text-[10px] text-[#555550]">
                    Leva menos de 2 minutos • Você pode atualizar seu perfil a qualquer momento
                </p>
            </div>
        </div>
    );
}