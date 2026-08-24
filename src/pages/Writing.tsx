import { useState } from "react"
import { ArrowRight, CheckCircle2, ChevronRight, Copy, Edit3, FileCode, MessageSquare, PenTool, RotateCcw, Send, Sparkles, Wand2, Zap } from "lucide-react"

interface WritingPrompt {
    id: string
    title: string
    category: string
    level: string
    targetWords: number
    accuracy: number
    completed: boolean
}

const writingPrompts: WritingPrompt[] = [
    { id: "w1", title: "Write a Polite Email Requesting a Code Review", category: "Workplace", level: "B1", targetWords: 80, accuracy: 92, completed: true },
    { id: "w2", title: "Describe a Bug and Steps to Reproduce It", category: "Tech & QA", level: "A2", targetWords: 60, accuracy: 75, completed: false },
    { id: "w3", title: "Expressing Agreement and Disagreement in a Forum", category: "Discussion", level: "B1", targetWords: 100, accuracy: 0, completed: false },
    { id: "w4", title: "Drafting a Project Proposal Summary", category: "Business", level: "B2", targetWords: 150, accuracy: 0, completed: false },
]

export default function Writing() {
    const [selectedTone, setSelectedTone] = useState<"formal" | "neutral" | "casual">("formal")
    const [text, setText] = useState(
        "Hi John, I have pushed the new feature branch yesterday. Could you please take a look on the pull request when you have time?"
    )

    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
    const charCount = text.length

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Composition & Syntax</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Writing Lab</h1>
                    <p className="mt-1 text-sm text-[#999994]">Draft professional texts, refine tone and receive instant AI grammar feedback.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <PenTool size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">3,850</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">words written</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Sparkles size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">88%</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">clarity score</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <CheckCircle2 size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">14 Drafts</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">reviewed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* editor inteligente com ai */}
            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-2 w-2 rounded-full bg-[#C96B62]" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">AI Writing Assistant • Active Draft</span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">Email Request</span>
                    </div>

                    {/* tone switcher */}
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#777770]">Tone:</span>
                        <div className="flex rounded-lg border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs">
                            {(["formal", "neutral", "casual"] as const).map((tone) => (
                                <button
                                    key={tone}
                                    type="button"
                                    onClick={() => setSelectedTone(tone)}
                                    className={`rounded-md px-2.5 py-0.5 text-[10px] capitalize transition-all ${selectedTone === tone ? "bg-[#C96B62] text-white" : "text-[#777770] hover:text-white"
                                        }`}
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold text-[#C96B62]">Draft Prompt</span>
                        <h2 className="text-lg font-bold text-white">Write a Polite Email Requesting a Code Review</h2>
                        <p className="text-xs text-[#999994]">Include the branch name, main changes, and a courteous deadline inquiry.</p>
                    </div>

                    {/* text area */}
                    <div className="mt-4 rounded-xl border border-[#2B2B2B] bg-[#151515] p-4 transition-focus-within focus-within:border-[#C96B62]">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={4}
                            className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#E7E5E1] placeholder-[#555] outline-none"
                            placeholder="Start drafting your response here..."
                        />
                        <div className="mt-3 flex items-center justify-between border-t border-[#242424] pt-2.5 font-mono text-[11px] text-[#777770]">
                            <div className="flex items-center gap-4">
                                <span>{wordCount} words</span>
                                <span>{charCount} characters</span>
                            </div>
                            <span className="text-[#C96B62]">Target: ~80 words</span>
                        </div>
                    </div>

                    {/* ai feedback / correcao instantanea */}
                    <div className="mt-4 rounded-xl border border-[#3D2624] bg-[#211717] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#C96B62]">
                                <Wand2 size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">AI Suggestions Detected (2)</span>
                            </div>
                            <span className="font-mono text-[11px] text-[#777770]">Instant Grammar & Preposition Fix</span>
                        </div>

                        <div className="mt-3 space-y-2 text-xs">
                            <div className="flex flex-col justify-between gap-2 rounded-lg border border-[#332020] bg-[#191111] p-2.5 sm:flex-row sm:items-center">
                                <div className="space-y-0.5">
                                    <p className="text-[#E7E5E1]">
                                        <span className="line-through text-[#C96B62]">I have pushed</span> → <strong className="text-[#62C99B]">I pushed</strong>
                                    </p>
                                    <p className="text-[10px] text-[#888]">Use Past Simple instead of Present Perfect when specifying a past time marker ("yesterday").</p>
                                </div>
                                <button type="button" className="shrink-0 rounded bg-[#2A2020] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#C96B62] hover:bg-[#C96B62] hover:text-white">
                                    Apply
                                </button>
                            </div>

                            <div className="flex flex-col justify-between gap-2 rounded-lg border border-[#332020] bg-[#191111] p-2.5 sm:flex-row sm:items-center">
                                <div className="space-y-0.5">
                                    <p className="text-[#E7E5E1]">
                                        <span className="line-through text-[#C96B62]">take a look on</span> → <strong className="text-[#62C99B]">take a look at</strong>
                                    </p>
                                    <p className="text-[10px] text-[#888]">The preposition used with "look" in this context is "at", not "on".</p>
                                </div>
                                <button type="button" className="shrink-0 rounded bg-[#2A2020] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#C96B62] hover:bg-[#C96B62] hover:text-white">
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#332020] pt-3">
                            <button type="button" className="flex items-center gap-1.5 text-xs text-[#999994] hover:text-white">
                                <RotateCcw size={13} /> Reset Draft
                            </button>
                            <button type="button" className="flex items-center gap-2 rounded-xl bg-[#C96B62] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                                <Send size={13} /> Analyze & Score Composition
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                {/* lista de prompts e desafios */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Writing Challenges</h2>
                        <span className="font-mono text-xs text-[#777770]">4 Tasks Available</span>
                    </div>

                    <div className="space-y-3">
                        {writingPrompts.map((prompt) => (
                            <div
                                key={prompt.id}
                                className={`rounded-2xl border p-4.5 transition-all hover:border-[#3A3A3A] ${prompt.completed ? "border-[#2B2B2B] bg-[#1D1D1D]" : "border-[#262626] bg-[#1A1A1A]"
                                    }`}
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62]">
                                            <Edit3 size={18} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-[#292929] px-1.5 py-0.2 font-mono text-[9px] text-[#A78BC7]">{prompt.level}</span>
                                                <span className="rounded bg-[#242424] px-1.5 py-0.2 font-mono text-[9px] text-[#777770]">{prompt.category}</span>
                                                <span className="text-[11px] text-[#777770]">Target: {prompt.targetWords}w</span>
                                            </div>
                                            <h3 className="mt-1 text-sm font-semibold text-white">{prompt.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 border-t border-[#242424] pt-2 sm:border-0 sm:pt-0">
                                        <div className="text-left sm:text-right">
                                            {prompt.completed ? (
                                                <span className="font-mono text-[10px] text-[#62C99B]">{prompt.accuracy}% Score</span>
                                            ) : (
                                                <span className="font-mono text-[10px] text-[#777770]">Not Started</span>
                                            )}
                                        </div>
                                        <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                                            {prompt.completed ? "Rewrite" : "Draft"} <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    {/* vocabulary booster */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Style Booster</p>
                            <Sparkles size={16} className="text-[#C96B62]" />
                        </div>
                        <p className="mt-1 text-xs text-[#999994]">Upgrade simple words to professional equivalents:</p>

                        <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between rounded-lg border border-[#262626] bg-[#171717] p-2 text-xs">
                                <span className="text-[#777770]">"Good"</span>
                                <span className="font-mono font-semibold text-[#62C99B]">Effective / Robust</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-[#262626] bg-[#171717] p-2 text-xs">
                                <span className="text-[#777770]">"Fix"</span>
                                <span className="font-mono font-semibold text-[#62C99B]">Resolve / Refactor</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-[#262626] bg-[#171717] p-2 text-xs">
                                <span className="text-[#777770]">"Need"</span>
                                <span className="font-mono font-semibold text-[#62C99B]">Require</span>
                            </div>
                        </div>
                    </div>

                    {/* metricas de composicao */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">Writing Analytics</h2>
                            <Zap size={15} className="text-[#777770]" />
                        </div>

                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Grammar Precision</span>
                                    <span className="font-mono text-[#62C99B]">92%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#62C99B]" style={{ width: "92%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Sentence Variety</span>
                                    <span className="font-mono text-[#C96B62]">68%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "68%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Vocabulary Sophistication</span>
                                    <span className="font-mono text-[#A78BC7]">74%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#A78BC7]" style={{ width: "74%" }} />
                                </div>
                            </div>
                        </div>

                        <button type="button" className="mt-5 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                            View Detailed Feedback <ArrowRight size={13} />
                        </button>
                    </div>

                    {/* templates de email rapidos */}
                    <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#171717] p-3.5">
                        <div className="flex items-center gap-2.5">
                            <FileCode size={16} className="text-[#777770]" />
                            <span className="text-xs text-[#B7B7B2]">Professional Email Snippets</span>
                        </div>
                        <button type="button" className="text-[#999994] transition-colors hover:text-white">
                            <Copy size={14} />
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    )
}