import { useState } from "react"
import { ArrowRight, Bookmark, BookOpen, CheckCircle2, ChevronRight, Clock3, Eye, FileText, Sparkles, Type, Zap } from "lucide-react"

interface Article {
    id: string
    title: string
    category: string
    level: string
    readTime: string
    wordsCount: number
    progress: number
    completed: boolean
}

const articles: Article[] = [
    { id: "r1", title: "How Modern Browsers Render Web Pages", category: "Tech & Dev", level: "B1", readTime: "4 min", wordsCount: 420, progress: 100, completed: true },
    { id: "r2", title: "The History of Coffee Culture", category: "Lifestyle", level: "A2", readTime: "3 min", wordsCount: 280, progress: 45, completed: false },
    { id: "r3", title: "Remote Work and Global Teams", category: "Workplace", level: "B1", readTime: "5 min", wordsCount: 510, progress: 0, completed: false },
    { id: "r4", title: "Understanding Clean Code Principles", category: "Software", level: "B2", readTime: "6 min", wordsCount: 650, progress: 0, completed: false },
]

export default function Reading() {
    const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base")
    const [selectedWord, setSelectedWord] = useState<{ word: string; translation: string; definition: string } | null>({
        word: "asynchronous",
        translation: "assíncrono",
        definition: "Not occurring at the same time; executing tasks in background without blocking.",
    })

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Comprehension & Speed</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Reading Lab</h1>
                    <p className="mt-1 text-sm text-[#999994]">Build reading endurance, absorb sentence structures and unlock vocabulary in context.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <BookOpen size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">12,450</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">words read</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Zap size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">195 WPM</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">reading speed</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <CheckCircle2 size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">91%</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">comprehension</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* leitor interativo */}
            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-2 w-2 rounded-full bg-[#C96B62]" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">Active Article • B1 Intermediate</span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">Tech & Dev</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 rounded-lg border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs text-[#777770]">
                            <Type size={13} className="ml-1 text-[#999994]" />
                            <button
                                type="button"
                                onClick={() => setFontSize("sm")}
                                className={`rounded px-2 py-0.5 ${fontSize === "sm" ? "bg-[#292929] text-white" : "hover:text-white"}`}
                            >
                                A-
                            </button>
                            <button
                                type="button"
                                onClick={() => setFontSize("base")}
                                className={`rounded px-2 py-0.5 ${fontSize === "base" ? "bg-[#292929] text-white" : "hover:text-white"}`}
                            >
                                A
                            </button>
                            <button
                                type="button"
                                onClick={() => setFontSize("lg")}
                                className={`rounded px-2 py-0.5 ${fontSize === "lg" ? "bg-[#292929] text-white" : "hover:text-white"}`}
                            >
                                A+
                            </button>
                        </div>
                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#171717] text-[#999994] transition-colors hover:text-white">
                            <Bookmark size={14} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#777770]">
                            <span className="flex items-center gap-1"><Clock3 size={13} /> 4 min read</span>
                            <span>•</span>
                            <span>420 words</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">How Modern Browsers Render Web Pages</h2>
                    </div>

                    {/* texto com palavras clicaveis */}
                    <article className={`mt-6 space-y-4 leading-relaxed text-[#D2D0CB] ${fontSize === "sm" ? "text-xs" : fontSize === "lg" ? "text-base" : "text-sm"
                        }`}>
                        <p>
                            When you type a URL into the navigation bar, the browser initiates a complex series of steps to turn raw HTML, CSS, and JavaScript into a visual, interactive application. First, the browser parses the HTML markup to construct the Document Object Model (DOM).
                        </p>
                        <p>
                            Simultaneously, the CSS engine processes stylesheet rules to generate the CSSOM. These two tree structures combine into the <em>Render Tree</em>, which contains only the nodes required to paint the screen. Modern JavaScript engines handle{" "}
                            <button
                                type="button"
                                onClick={() => setSelectedWord({
                                    word: "asynchronous",
                                    translation: "assíncrono",
                                    definition: "Not occurring at the same time; executing tasks in background without blocking.",
                                })}
                                className="rounded border-b border-dotted border-[#C96B62] bg-[#2A2020] px-1 font-medium text-[#C96B62] transition-colors hover:bg-[#C96B62] hover:text-white"
                            >
                                asynchronous
                            </button>{" "}
                            operations via the event loop, ensuring animations remain smooth and non-blocking.
                        </p>
                    </article>

                    {/* tooltip/box de traducao inline */}
                    {selectedWord && (
                        <div className="mt-6 flex flex-col justify-between gap-3 rounded-xl border border-[#3D2624] bg-[#211717] p-4 sm:flex-row sm:items-center">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm font-bold text-white">{selectedWord.word}</span>
                                    <span className="font-mono text-xs text-[#C96B62]">({selectedWord.translation})</span>
                                </div>
                                <p className="text-xs text-[#999994]">{selectedWord.definition}</p>
                            </div>
                            <button type="button" className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#C96B62] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                                + Add to Flashcards
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                {/* biblioteca de textos */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Articles & Stories</h2>
                        <span className="font-mono text-xs text-[#777770]">Curated for B1 Level</span>
                    </div>

                    <div className="space-y-3">
                        {articles.map((art) => (
                            <div
                                key={art.id}
                                className={`rounded-2xl border p-4.5 transition-all hover:border-[#3A3A3A] ${art.completed ? "border-[#2B2B2B] bg-[#1D1D1D]" : "border-[#262626] bg-[#1A1A1A]"
                                    }`}
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62]">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-[#292929] px-1.5 py-0.2 font-mono text-[9px] text-[#A78BC7]">{art.level}</span>
                                                <span className="rounded bg-[#242424] px-1.5 py-0.2 font-mono text-[9px] text-[#777770]">{art.category}</span>
                                                <span className="text-[11px] text-[#777770]">{art.wordsCount} words</span>
                                            </div>
                                            <h3 className="mt-1 text-sm font-semibold text-white">{art.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 border-t border-[#242424] pt-2 sm:border-0 sm:pt-0">
                                        <div className="text-left sm:text-right">
                                            <span className="block font-mono text-xs text-[#999994]">{art.readTime}</span>
                                            {art.completed ? (
                                                <span className="font-mono text-[10px] text-[#62C99B]">Completed</span>
                                            ) : art.progress > 0 ? (
                                                <span className="font-mono text-[10px] text-[#C96B62]">{art.progress}% Read</span>
                                            ) : (
                                                <span className="font-mono text-[10px] text-[#777770]">Unread</span>
                                            )}
                                        </div>
                                        <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                                            {art.completed ? "Re-read" : art.progress > 0 ? "Continue" : "Read"} <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    {/* teste de compreensao */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Comprehension Quiz</p>
                            <Eye size={16} className="text-[#C96B62]" />
                        </div>
                        <p className="mt-1 text-xs text-[#999994]">Question based on active article:</p>

                        <div className="mt-3 rounded-xl border border-[#262626] bg-[#171717] p-3.5">
                            <p className="text-xs text-white">What structures combine to create the Render Tree?</p>
                            <div className="mt-3 space-y-1.5 font-mono text-[11px]">
                                <button type="button" className="w-full rounded-lg border border-[#2B2B2B] bg-[#1F1F1F] p-2 text-left text-[#B7B7B2] hover:border-[#C96B62] hover:text-white">
                                    A) HTML and JavaScript
                                </button>
                                <button type="button" className="w-full rounded-lg border border-[#3A2222] bg-[#241A1A] p-2 text-left text-[#C96B62]">
                                    B) DOM and CSSOM
                                </button>
                                <button type="button" className="w-full rounded-lg border border-[#2B2B2B] bg-[#1F1F1F] p-2 text-left text-[#B7B7B2] hover:border-[#C96B62] hover:text-white">
                                    C) Event Loop and CSS
                                </button>
                            </div>
                        </div>

                        <button type="button" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#C96B62] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                            Submit Answer <ArrowRight size={13} />
                        </button>
                    </div>

                    {/* meta de leitura diaria */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">Daily Reading Goal</h2>
                            <BookOpen size={15} className="text-[#777770]" />
                        </div>

                        <div className="mt-4 text-center">
                            <span className="font-mono text-3xl font-bold text-white">420 / 600</span>
                            <p className="mt-1 text-xs text-[#999994]">Words target for today</p>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "70%" }} />
                            </div>
                        </div>
                    </div>

                    {/* dica de leitura com ia */}
                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Sparkles size={16} />
                            <span className="text-xs font-semibold">Skimming & Scanning</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            Don't stop at every unfamiliar word. Try to deduce meaning from surrounding sentences first to maintain reading rhythm and speed.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    )
}