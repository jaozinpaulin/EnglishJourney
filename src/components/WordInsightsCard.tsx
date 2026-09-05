import { useState, useEffect } from "react"
import { Volume2, Sparkles, Check, Plus, Loader2 } from "lucide-react"
import { enrichWordWithAI, speakWord } from "../services/dictionaryAi"
import type { AIEnrichment, QuickTranslationResult } from "../services/dictionaryAi"

interface WordInsightsCardProps {
    quickData: QuickTranslationResult | null
    onSelectWord?: (word: string) => void
}

export default function WordInsightsCard({ quickData, onSelectWord }: WordInsightsCardProps) {
    const [aiData, setAiData] = useState<AIEnrichment | null>(null)
    const [loadingAi, setLoadingAi] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (!quickData || !quickData.word.trim()) {
            setAiData(null);
            return;
        }

        const word = quickData?.word?.trim()
        if (!word || word.split(/\s+/).length > 3) {
            setAiData(null)
            return
        }

        let active = true
        setLoadingAi(true)

        enrichWordWithAI(word, quickData.translation)
            .then((res) => {
                if (active) setAiData(res)
            })
            .catch((err) => {
                console.error("Erro no Gemini:", err)
                if (active) setAiData(null)
            })
            .finally(() => {
                if (active) setLoadingAi(false)
            })

        return () => {
            active = false
        }
    }, [quickData?.word, quickData?.translation])

    if (!quickData?.word) return null

    return (
        <div className="rounded-2xl border border-[#242424] bg-[#161616] p-6 shadow-2xl transition-all sm:p-7">
            <div className="flex flex-col justify-between gap-4 border-b border-[#222222] pb-5 sm:flex-row sm:items-start">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold tracking-tight text-white capitalize md:text-4xl">
                            {quickData.word}
                        </h2>
                        <button
                            type="button"
                            onClick={() => speakWord(quickData.word)}
                            title="Ouvir pronúncia"
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#202020] text-[#8A8A85] transition-all hover:bg-[#C96B62] hover:text-white active:scale-90"
                        >
                            <Volume2 size={18} />
                        </button>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2.5">
                        {aiData ? (
                            <>
                                <span className="font-mono text-sm font-semibold text-[#C96B62]">{aiData.phonetic}</span>
                                <span className="rounded-md bg-[#202020] px-2 py-0.5 text-xs text-[#8A8A85]">
                                    {aiData.partOfSpeech}
                                </span>
                            </>
                        ) : loadingAi ? (
                            <div className="flex items-center gap-2 font-mono text-xs text-[#777]">
                                <Loader2 size={13} className="animate-spin text-[#C96B62]" />
                                <span>Consultando IA...</span>
                            </div>
                        ) : null}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setSaved(!saved)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all active:scale-95 ${saved
                        ? "border border-[#1F3D2C] bg-[#14261B] text-[#55BA82]"
                        : "border border-[#2B2B2B] bg-[#202020] text-white hover:border-[#3D3D3D]"
                        }`}
                >
                    {saved ? <><Check size={15} /> Salvo no Deck</> : <><Plus size={15} /> Salvar Palavra</>}
                </button>
            </div>

            <div className="mt-6 space-y-5">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">
                        Tradução
                    </span>
                    <p className="mt-1 text-2xl font-bold text-white capitalize">{quickData.translation}</p>

                    {quickData.alternativeTranslations.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] text-[#7A7A75]">Outros significados:</span>
                            {quickData.alternativeTranslations.map((alt, idx) => (
                                <span
                                    key={`${alt}-${idx}`}
                                    className="rounded-md border border-[#242424] bg-[#1B1B1D] px-2.5 py-0.5 text-xs text-[#A0A09B]"
                                >
                                    {alt}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {quickData.synonyms.length > 0 && (
                    <div className="rounded-xl border border-[#222222] bg-[#121212] p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">
                            Palavras Parecidas & Sinônimos
                        </span>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {quickData.synonyms.map((syn, idx) => (
                                <button
                                    key={`${syn}-${idx}`}
                                    type="button"
                                    onClick={() => onSelectWord?.(syn)}
                                    className="rounded-lg border border-[#262626] bg-[#1A1A1A] px-2.5 py-1 text-xs text-[#B0B0AA] transition-all hover:border-[#C96B62] hover:text-white"
                                >
                                    {syn}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {aiData?.example && (
                    <div className="rounded-xl border border-[#222222] bg-[#111111] p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">
                            Exemplo de Uso
                        </span>
                        <p className="mt-1 text-sm italic text-[#E5E5E0]">"{aiData.example}"</p>
                    </div>
                )}

                {aiData?.conceptTip && (
                    <div className="rounded-xl border border-[#331C1A] bg-[#1A1414] p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#C96B62]">
                            <Sparkles size={15} />
                            <span>Dica de Uso Real</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#B8AAA8]">{aiData.conceptTip}</p>
                    </div>
                )}
            </div>
        </div>
    )
}