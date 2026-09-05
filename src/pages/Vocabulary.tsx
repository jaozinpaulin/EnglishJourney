import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowLeftRight, Copy, Check, ChevronDown, Flame, Loader2, Volume2, X, Sparkles, } from "lucide-react"
import WordInsightsCard from "../components/WordInsightsCard"
import { quickTranslate } from "../services/dictionaryAi"
import type { QuickTranslationResult } from "../services/dictionaryAi"

type SupportedLanguage = "en" | "pt" | "es"

interface LanguageOption {
    code: SupportedLanguage
    label: string
    voiceLang: string
}

const languages: LanguageOption[] = [
    { code: "en", label: "Inglês", voiceLang: "en-US" },
    { code: "pt", label: "Português", voiceLang: "pt-BR" },
    { code: "es", label: "Espanhol", voiceLang: "es-ES" },
]

export default function Vocabulary() {
    const [sourceLang, setSourceLang] = useState<SupportedLanguage>("en")
    const [targetLang, setTargetLang] = useState<SupportedLanguage>("pt")
    const [inputText, setInputText] = useState("")
    const [translatedText, setTranslatedText] = useState("")
    const [quickResult, setQuickResult] = useState<QuickTranslationResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [speakingLang, setSpeakingLang] = useState<"source" | "target" | null>(null)

    const [openSourceMenu, setOpenSourceMenu] = useState(false)
    const [openTargetMenu, setOpenTargetMenu] = useState(false)

    const sourceRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sourceRef.current && !sourceRef.current.contains(event.target as Node)) {
                setOpenSourceMenu(false)
            }
            if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
                setOpenTargetMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleTranslate = useCallback(async (text: string, src: string, tgt: string) => {
        if (!text.trim()) {
            setQuickResult(null)
            setTranslatedText("")
            setLoading(false)
            return
        }

        setLoading(true)
        try {
            const result = await quickTranslate(text, src, tgt)
            setQuickResult(result)
            setTranslatedText(result.translation)
        } catch (error) {
            console.error("Falha ao traduzir:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            handleTranslate(inputText, sourceLang, targetLang)
        }, 400)

        return () => clearTimeout(timer)
    }, [inputText, sourceLang, targetLang, handleTranslate])

    const handleSwapLanguages = () => {
        const prevSource = sourceLang
        const prevTarget = targetLang
        const prevInput = inputText
        const prevTranslated = translatedText

        setSourceLang(prevTarget)
        setTargetLang(prevSource)
        setInputText(prevTranslated)
        setTranslatedText(prevInput)
    }

    const selectSourceLang = (code: SupportedLanguage) => {
        if (code === targetLang) setTargetLang(sourceLang)
        setSourceLang(code)
        setOpenSourceMenu(false)
    }

    const selectTargetLang = (code: SupportedLanguage) => {
        if (code === sourceLang) setSourceLang(targetLang)
        setTargetLang(code)
        setOpenTargetMenu(false)
    }

    const speak = (text: string, langCode: string, side: "source" | "target") => {
        if (!("speechSynthesis" in window) || !text.trim()) return
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = langCode
        utterance.rate = 0.9

        utterance.onstart = () => setSpeakingLang(side)
        utterance.onend = () => setSpeakingLang(null)
        utterance.onerror = () => setSpeakingLang(null)

        window.speechSynthesis.speak(utterance)
    }

    const handleCopy = () => {
        if (!translatedText) return
        navigator.clipboard.writeText(translatedText)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const currentSource = languages.find((l) => l.code === sourceLang) || languages[0]
    const currentTarget = languages.find((l) => l.code === targetLang) || languages[1]

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            <div className="flex flex-col justify-between gap-4 border-b border-[#262626] pb-5 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Vocabulário & Tradutor</h1>
                    <p className="mt-0.5 text-xs text-[#8A8A85]">
                        Tradução instantânea de palavras e frases com suporte a pronúncia fluida.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#242424] bg-[#161616] px-3.5 py-2 text-xs text-[#C96B62]">
                    <Flame size={16} />
                    <span className="font-mono font-semibold">6 dias de prática</span>
                </div>
            </div>

            <div className="w-full rounded-2xl border border-[#242424] bg-[#161616] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#222222] bg-[#131313] rounded-t-2xl px-5 py-3 sm:px-7">
                    <div className="relative min-w-[140px]" ref={sourceRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setOpenSourceMenu(!openSourceMenu)
                                setOpenTargetMenu(false)
                            }}
                            className="group flex w-full items-center justify-between gap-3 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-[#C96B62] focus:border-[#C96B62]"
                        >
                            <span className="truncate">{currentSource.label}</span>
                            <ChevronDown
                                size={15}
                                className={`shrink-0 text-[#7A7A75] transition-transform duration-200 group-hover:text-white ${openSourceMenu ? "rotate-180 text-[#C96B62]" : ""
                                    }`}
                            />
                        </button>

                        {openSourceMenu && (
                            <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-1.5 shadow-2xl backdrop-blur-md">
                                {languages.map((l) => (
                                    <button
                                        key={`src-${l.code}`}
                                        type="button"
                                        onClick={() => selectSourceLang(l.code)}
                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${l.code === sourceLang
                                            ? "bg-[#251A19] font-semibold text-[#C96B62]"
                                            : "text-[#B0B0AA] hover:bg-[#222222] hover:text-white"
                                            }`}
                                    >
                                        <span>{l.label}</span>
                                        <span className="font-mono text-[10px] text-[#666]">{l.code.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleSwapLanguages}
                        title="Inverter idiomas"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#242424] bg-[#1A1A1A] text-[#8A8A85] transition-all hover:border-[#C96B62] hover:bg-[#251A19] hover:text-[#C96B62] active:scale-90"
                    >
                        <ArrowLeftRight size={16} />
                    </button>

                    <div className="relative min-w-[140px]" ref={targetRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setOpenTargetMenu(!openTargetMenu)
                                setOpenSourceMenu(false)
                            }}
                            className="group flex w-full items-center justify-between gap-3 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-[#C96B62] focus:border-[#C96B62]"
                        >
                            <span className="truncate">{currentTarget.label}</span>
                            <ChevronDown
                                size={15}
                                className={`shrink-0 text-[#7A7A75] transition-transform duration-200 group-hover:text-white ${openTargetMenu ? "rotate-180 text-[#C96B62]" : ""
                                    }`}
                            />
                        </button>

                        {openTargetMenu && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-1.5 shadow-2xl backdrop-blur-md">
                                {languages.map((l) => (
                                    <button
                                        key={`tgt-${l.code}`}
                                        type="button"
                                        onClick={() => selectTargetLang(l.code)}
                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${l.code === targetLang
                                            ? "bg-[#251A19] font-semibold text-[#C96B62]"
                                            : "text-[#B0B0AA] hover:bg-[#222222] hover:text-white"
                                            }`}
                                    >
                                        <span>{l.label}</span>
                                        <span className="font-mono text-[10px] text-[#666]">{l.code.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 divide-y divide-[#222222] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                    <div className="flex min-h-[300px] w-full min-w-0 flex-col justify-between p-6 sm:p-7">
                        <div className="relative w-full">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Digite palavras, expressões ou termos técnicos para traduzir..."
                                rows={6}
                                className="w-full resize-none bg-transparent text-lg font-medium leading-relaxed text-white placeholder-[#4F4F4F] outline-none transition-colors duration-150 sm:text-xl"
                            />
                            {inputText && (
                                <button
                                    type="button"
                                    onClick={() => setInputText("")}
                                    title="Limpar texto"
                                    className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-[#222222] hover:text-white active:scale-95"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#1F1F1F] pt-3">
                            <button
                                type="button"
                                onClick={() => speak(inputText, currentSource.voiceLang, "source")}
                                disabled={!inputText.trim()}
                                title="Ouvir pronúncia original"
                                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 ${speakingLang === "source"
                                    ? "bg-[#C96B62] text-white shadow-lg shadow-[#C96B62]/20"
                                    : "bg-[#202020] text-[#8A8A85] hover:bg-[#C96B62] hover:text-white"
                                    }`}
                            >
                                <Volume2 size={18} />
                            </button>

                            <span className="font-mono text-[11px] text-[#555]">
                                {inputText.length} caracteres
                            </span>
                        </div>
                    </div>

                    <div className="flex min-h-[300px] w-full min-w-0 flex-col justify-between bg-[#131313]/60 p-6 sm:p-7">
                        <div className="w-full">
                            {loading ? (
                                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#C96B62]">
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Traduzindo...</span>
                                </div>
                            ) : translatedText ? (
                                <p className="whitespace-pre-wrap text-lg font-medium leading-relaxed text-white sm:text-xl">
                                    {translatedText}
                                </p>
                            ) : (
                                <p className="select-none text-lg text-[#444] sm:text-xl">
                                    A tradução aparecerá aqui...
                                </p>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#1F1F1F] pt-3">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => speak(translatedText, currentTarget.voiceLang, "target")}
                                    disabled={!translatedText.trim()}
                                    title="Ouvir pronúncia traduzida"
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 ${speakingLang === "target"
                                        ? "bg-[#C96B62] text-white shadow-lg shadow-[#C96B62]/20"
                                        : "bg-[#202020] text-[#8A8A85] hover:bg-[#C96B62] hover:text-white"
                                        }`}
                                >
                                    <Volume2 size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    disabled={!translatedText.trim()}
                                    title="Copiar resultado"
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#202020] text-[#8A8A85] transition-all duration-150 hover:bg-[#C96B62] hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    {copied ? <Check size={16} className="text-[#55BA82]" /> : <Copy size={16} />}
                                </button>
                            </div>

                            {translatedText && (
                                <span className="flex items-center gap-1.5 rounded-lg bg-[#251A19] px-3 py-1 font-mono text-[10px] text-[#C96B62] transition-all">
                                    <Sparkles size={13} />
                                    <span>Análise em tempo real</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <WordInsightsCard
                quickData={quickResult}
                onSelectWord={(word) => setInputText(word)}
            />
        </section>
    )
}