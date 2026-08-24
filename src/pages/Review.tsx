import { useState } from "react"
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Flame, Layers, Play, RefreshCw, RotateCcw, ShieldAlert, Sparkles, Timer, Zap } from "lucide-react"

interface ReviewQueueItem {
    id: string
    title: string
    type: "vocabulary" | "grammar" | "listening" | "speaking"
    category: string
    difficulty: "high" | "medium" | "low"
    lastReviewed: string
    errorRate: number
}

const queueItems: ReviewQueueItem[] = [
    { id: "q1", title: "Irregular Past Participles (V3)", type: "grammar", category: "Syntax", difficulty: "high", lastReviewed: "3 days ago", errorRate: 42 },
    { id: "q2", title: "Borrow vs. Lend distinction", type: "vocabulary", category: "Confusable Words", difficulty: "high", lastReviewed: "5 days ago", errorRate: 38 },
    { id: "q3", title: "Connected Speech in Fast Standups", type: "listening", category: "Accents & Speed", difficulty: "medium", lastReviewed: "Yesterday", errorRate: 25 },
    { id: "q4", title: "Phonetic Stress on 3-Syllable Words", type: "speaking", category: "Pronunciation", difficulty: "medium", lastReviewed: "4 days ago", errorRate: 20 },
]

export default function Review() {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Memory Consolidation</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Review & SRS Lab</h1>
                    <p className="mt-1 text-sm text-[#999994]">Strengthen neural pathways, patch knowledge gaps and lock concepts into long-term memory.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <RotateCcw size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">28 Items</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">due today</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <ShieldAlert size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">4 Critical</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">weak spots</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Flame size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">94%</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">retention rate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* arena de revisao ativa */}
            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-2 w-2 rounded-full bg-[#C96B62]" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">Active SRS Session • Smart Review</span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">Grammar + Context</span>
                    </div>
                    <span className="font-mono text-xs text-[#777770]">Item 3 of 28</span>
                </div>

                <div className="p-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="rounded bg-[#2A2020] px-2 py-0.5 font-mono text-[10px] text-[#C96B62]">High Priority Gap</span>
                            <span className="text-xs text-[#777770]">Prepositions with Time Markers</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                            "We will release the critical hotfix _____ Friday afternoon."
                        </h2>
                        <p className="text-xs text-[#999994]">Select the correct preposition to complete the schedule context.</p>
                    </div>

                    {/* opcoes interativas */}
                    <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 font-mono text-xs">
                        {[
                            { key: "A", val: "in", correct: false },
                            { key: "B", val: "on", correct: true },
                            { key: "C", val: "at", correct: false },
                            { key: "D", val: "by the", correct: false },
                        ].map((opt) => {
                            const isSelected = selectedAnswer === opt.key
                            return (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setSelectedAnswer(opt.key)}
                                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${isSelected
                                        ? "border-[#C96B62] bg-[#2A2020] text-white"
                                        : "border-[#2B2B2B] bg-[#171717] text-[#B7B7B2] hover:border-[#3A3A3A] hover:text-white"
                                        }`}
                                >
                                    <span className="flex items-center gap-2.5">
                                        <span className="text-[10px] text-[#777770]">{opt.key})</span>
                                        <span className="font-semibold text-sm">{opt.val}</span>
                                    </span>
                                    {isSelected && <span className="text-[10px] text-[#C96B62]">Selected</span>}
                                </button>
                            )
                        })}
                    </div>

                    {/* feedback e continuacao */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#262626] pt-4">
                        <div className="flex items-center gap-2 text-xs text-[#777770]">
                            <Sparkles size={14} className="text-[#C96B62]" />
                            <span>Rule hint: Specific days and day parts always take <strong>"on"</strong>.</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsSubmitted(true)}
                            className="flex items-center gap-2 rounded-xl bg-[#C96B62] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                        >
                            Verify & Next <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                {/* fila de pontos fracos e srs */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Vulnerabilities & Weak Spots</h2>
                        <span className="font-mono text-xs text-[#777770]">High Error Rate Items</span>
                    </div>

                    <div className="space-y-3">
                        {queueItems.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-4.5 transition-all hover:border-[#3A3A3A]"
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-3.5">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${item.difficulty === "high" ? "bg-[#2E1E1D] text-[#C96B62]" : "bg-[#242126] text-[#A78BC7]"
                                            }`}>
                                            <AlertCircle size={18} />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-[#292929] px-1.5 py-0.2 font-mono text-[9px] uppercase text-[#A78BC7]">{item.type}</span>
                                                <span className="text-[11px] text-[#777770]">{item.category}</span>
                                                <span className="text-[11px] text-[#777770]">• Last seen: {item.lastReviewed}</span>
                                            </div>
                                            <h3 className="mt-1 text-sm font-semibold text-white">{item.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 border-t border-[#242424] pt-2 sm:border-0 sm:pt-0">
                                        <div className="text-left sm:text-right">
                                            <span className="block font-mono text-xs font-semibold text-[#C96B62]">{item.errorRate}% Error Rate</span>
                                            <span className="text-[10px] text-[#777770]">Target: &lt;10%</span>
                                        </div>
                                        <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                                            Drill Item <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    {/* blitz mode (contra relogio) */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Speed Blitz</p>
                            <Timer size={16} className="text-[#C96B62]" />
                        </div>
                        <p className="mt-1 text-xs text-[#999994]">60-second rapid fire review challenge.</p>

                        <div className="mt-4 rounded-xl border border-[#262626] bg-[#171717] p-3.5 text-center">
                            <span className="font-mono text-2xl font-bold text-white">15 Questions</span>
                            <p className="mt-0.5 text-[11px] text-[#777770]">Instant recall without overthinking</p>
                        </div>

                        <button type="button" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#C96B62] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                            <Play size={13} fill="currentColor" /> Start Blitz (1 Min)
                        </button>
                    </div>

                    {/* srs schedule forecast */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">Retention Curve</h2>
                            <Layers size={15} className="text-[#777770]" />
                        </div>

                        <div className="mt-4 space-y-2.5">
                            <div className="flex items-center justify-between rounded-xl border border-[#242424] bg-[#171717] p-2.5">
                                <span className="text-xs text-[#E7E5E1]">Due Today</span>
                                <strong className="font-mono text-xs text-[#C96B62]">28 items</strong>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-[#242424] bg-[#171717] p-2.5">
                                <span className="text-xs text-[#E7E5E1]">Due Tomorrow</span>
                                <strong className="font-mono text-xs text-[#999994]">19 items</strong>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-[#242424] bg-[#171717] p-2.5">
                                <span className="text-xs text-[#E7E5E1]">Consolidated (30d+)</span>
                                <strong className="font-mono text-xs text-[#62C99B]">142 items</strong>
                            </div>
                        </div>
                    </div>

                    {/* ai spaced repetition tip */}
                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Sparkles size={16} />
                            <span className="text-xs font-semibold">Active Recall Tip</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            Testing yourself before looking at answers creates stronger synaptic connections than passively re-reading old notes.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    )
}