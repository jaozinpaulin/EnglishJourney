import { useState } from "react"
import { ArrowRight, Award, CheckCircle2, ChevronRight, Compass, Flame, Gauge, Globe2, Lock, Play, ShieldAlert, ShieldCheck, Sparkles, Star, Target, Terminal, Trophy, Zap } from "lucide-react"

interface CEFRLevel {
    id: string
    code: string
    name: string
    tagline: string
    progress: number
    status: "completed" | "current" | "locked"
    hoursInvested: number
    hoursRequired: number
    stats: {
        grammar: number
        vocabulary: number
        phonetics: number
        listening: number
        reading: number
    }
    canDo: string[]
    unlockQuests: { title: string; completed: boolean; current: string }[]
}

const levelsData: CEFRLevel[] = [
    {
        id: "lvl-a1",
        code: "A1",
        name: "Breakthrough",
        tagline: "Basic survival English & simple daily interactions",
        progress: 100,
        status: "completed",
        hoursInvested: 40,
        hoursRequired: 40,
        stats: { grammar: 95, vocabulary: 92, phonetics: 88, listening: 90, reading: 94 },
        canDo: [
            "Introduce yourself and exchange basic personal info",
            "Understand clear, slow speech in simple dialogues",
            "Order food, ask prices, and navigate basic transactions"
        ],
        unlockQuests: [
            { title: "Master 300 Core Vocabulary terms", completed: true, current: "300/300" },
            { title: "Pass Unit 1-4 Checkpoints with 85%+", completed: true, current: "4/4" }
        ]
    },
    {
        id: "lvl-a2",
        code: "A2",
        name: "Waystage",
        tagline: "Routine workplace communication & connected sentences",
        progress: 68,
        status: "current",
        hoursInvested: 41,
        hoursRequired: 60,
        stats: { grammar: 74, vocabulary: 70, phonetics: 62, listening: 68, reading: 78 },
        canDo: [
            "Explain routine tasks, blockers, and bug tickets",
            "Describe past experiences, vacations, and plans",
            "Draft polite workplace requests and follow-up emails"
        ],
        unlockQuests: [
            { title: "Master Past Simple & Continuous rules", completed: true, current: "100%" },
            { title: "Accumulate 500+ active words in SRS", completed: false, current: "380/500" },
            { title: "Complete 8 Technical Roleplays with AI", completed: false, current: "5/8" },
            { title: "Pass A2 Proficiency Diagnostic Exam", completed: false, current: "Pending" }
        ]
    },
    {
        id: "lvl-b1",
        code: "B1",
        name: "Threshold",
        tagline: "Independent discussions, tech standups & abstract ideas",
        progress: 0,
        status: "locked",
        hoursInvested: 0,
        hoursRequired: 90,
        stats: { grammar: 0, vocabulary: 0, phonetics: 0, listening: 0, reading: 0 },
        canDo: [
            "Participate actively in unplanned technical debates",
            "Explain architectural decisions and trade-offs",
            "Consume tech documentation and industry articles"
        ],
        unlockQuests: [
            { title: "Unlock requires completing CEFR A2 Track", completed: false, current: "68% Done" }
        ]
    },
    {
        id: "lvl-b2",
        code: "B2",
        name: "Vantage",
        tagline: "Spontaneous fluency, nuanced arguments & full professional autonomy",
        progress: 0,
        status: "locked",
        hoursInvested: 0,
        hoursRequired: 120,
        stats: { grammar: 0, vocabulary: 0, phonetics: 0, listening: 0, reading: 0 },
        canDo: [
            "Lead team demos and technical presentations",
            "Understand fast native podcasts and accents",
            "Write complex technical specs and proposals"
        ],
        unlockQuests: [
            { title: "Unlock requires completing CEFR B1 Track", completed: false, current: "Locked" }
        ]
    },
    {
        id: "lvl-c1",
        code: "C1",
        name: "Effective Operational",
        tagline: "Complex idiomatic expressions & effortless precision",
        progress: 0,
        status: "locked",
        hoursInvested: 0,
        hoursRequired: 150,
        stats: { grammar: 0, vocabulary: 0, phonetics: 0, listening: 0, reading: 0 },
        canDo: [
            "Express ideas fluently without searching for words",
            "Understand subtle humor, sarcasm, and implicit subtext",
            "Write authoritative research papers and whitepapers"
        ],
        unlockQuests: [
            { title: "Unlock requires completing CEFR B2 Track", completed: false, current: "Locked" }
        ]
    },
    {
        id: "lvl-c2",
        code: "C2",
        name: "Mastery",
        tagline: "Near-native precision across all specialized domains",
        progress: 0,
        status: "locked",
        hoursInvested: 0,
        hoursRequired: 180,
        stats: { grammar: 0, vocabulary: 0, phonetics: 0, listening: 0, reading: 0 },
        canDo: [
            "Synthesize complex information from multiple abstract sources",
            "Express fine shades of meaning with total native-like command"
        ],
        unlockQuests: [
            { title: "Unlock requires completing CEFR C1 Track", completed: false, current: "Locked" }
        ]
    }
]

export default function Levels() {
    const [selectedLevelId, setSelectedLevelId] = useState("lvl-a2")
    const currentLevel = levelsData.find((l) => l.id === selectedLevelId) || levelsData[1]

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">CEFR Proficiency Matrix</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Proficiency Radar</h1>
                    <p className="mt-1 text-sm text-[#999994]">Measure linguistic maturity, CEFR benchmarks and promotion criteria.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <Target size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">CEFR A2</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">current tier</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Gauge size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">68% Score</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">tier readiness</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Trophy size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">19 hrs to B1</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">pace estimate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* trilha interativa cefr horizontal */}
            <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
                    <div className="flex items-center gap-2">
                        <Terminal size={15} className="text-[#C96B62]" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">Progression Pipeline</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#777770]">Select level to inspect criteria</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {levelsData.map((lvl) => {
                        const isSelected = selectedLevelId === lvl.id
                        const isDone = lvl.status === "completed"
                        const isCurrent = lvl.status === "current"
                        const isLocked = lvl.status === "locked"

                        return (
                            <button
                                key={lvl.id}
                                type="button"
                                onClick={() => setSelectedLevelId(lvl.id)}
                                className={`relative flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${isSelected
                                    ? "border-[#C96B62] bg-[#241A1A] shadow-[0_0_15px_rgba(201,107,98,0.15)]"
                                    : isDone
                                        ? "border-[#2B2B2B] bg-[#171717] hover:border-[#3A3A3A]"
                                        : isCurrent
                                            ? "border-[#4D302E] bg-[#1C1717] hover:border-[#6B3A36]"
                                            : "cursor-pointer border-[#222] bg-[#141414] opacity-50 hover:opacity-75"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`font-mono text-lg font-bold ${isDone ? "text-[#62C99B]" : isCurrent || isSelected ? "text-[#C96B62]" : "text-[#777]"
                                        }`}>
                                        {lvl.code}
                                    </span>
                                    {isDone && <CheckCircle2 size={15} className="text-[#62C99B]" />}
                                    {isCurrent && <span className="flex h-2 w-2 rounded-full bg-[#C96B62] animate-pulse" />}
                                    {isLocked && <Lock size={13} className="text-[#555]" />}
                                </div>

                                <div className="mt-3">
                                    <strong className="block text-xs text-white">{lvl.name}</strong>
                                    <span className="font-mono text-[10px] text-[#777770]">{lvl.progress}% Mastered</span>
                                </div>

                                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-[#242424]">
                                    <div
                                        className={`h-full ${isDone ? "bg-[#62C99B]" : "bg-[#C96B62]"}`}
                                        style={{ width: `${lvl.progress}%` }}
                                    />
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
                {/* coluna esquerda */}
                <div className="space-y-5">
                    {/* card do nivel ativo com radar visual */}
                    <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                        <div className="flex flex-col gap-2 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A2020] font-mono text-base font-bold text-[#C96B62]">
                                    {currentLevel.code}
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-white">{currentLevel.name} Standard</h2>
                                    <p className="text-xs text-[#999994]">{currentLevel.tagline}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="rounded bg-[#292929] px-2.5 py-1 font-mono text-xs text-[#A78BC7]">
                                    {currentLevel.hoursInvested} / {currentLevel.hoursRequired} hrs
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-6 p-6 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
                            {/* svg radar chart */}
                            <div className="relative mx-auto flex flex-col items-center">
                                <svg className="h-48 w-48" viewBox="0 0 200 200">
                                    {/* background grid radar */}
                                    <polygon points="100,20 176,62 176,138 100,180 24,138 24,62" fill="none" stroke="#2B2B2B" strokeWidth="1" />
                                    <polygon points="100,50 145,75 145,125 100,150 55,125 55,75" fill="none" stroke="#242424" strokeWidth="1" />
                                    <line x1="100" y1="100" x2="100" y2="20" stroke="#2B2B2B" strokeWidth="1" />
                                    <line x1="100" y1="100" x2="176" y2="62" stroke="#2B2B2B" strokeWidth="1" />
                                    <line x1="100" y1="100" x2="176" y2="138" stroke="#2B2B2B" strokeWidth="1" />
                                    <line x1="100" y1="100" x2="100" y2="180" stroke="#2B2B2B" strokeWidth="1" />
                                    <line x1="100" y1="100" x2="24" y2="138" stroke="#2B2B2B" strokeWidth="1" />
                                    <line x1="100" y1="100" x2="24" y2="62" stroke="#2B2B2B" strokeWidth="1" />

                                    {/* dynamic data polygon */}
                                    {currentLevel.progress > 0 ? (
                                        <polygon
                                            points={`100,${100 - (currentLevel.stats.grammar * 0.8)} ${100 + (currentLevel.stats.vocabulary * 0.76)},${100 - (currentLevel.stats.vocabulary * 0.38)} ${100 + (currentLevel.stats.phonetics * 0.76)},${100 + (currentLevel.stats.phonetics * 0.38)} 100,${100 + (currentLevel.stats.listening * 0.8)} ${100 - (currentLevel.stats.reading * 0.76)},${100 + (currentLevel.stats.reading * 0.38)}`}
                                            fill="rgba(201, 107, 98, 0.25)"
                                            stroke="#C96B62"
                                            strokeWidth="2"
                                        />
                                    ) : (
                                        <circle cx="100" cy="100" r="3" fill="#555" />
                                    )}
                                </svg>

                                <div className="mt-2 flex flex-wrap justify-center gap-3 font-mono text-[10px] text-[#777770]">
                                    <span>Grammar ({currentLevel.stats.grammar}%)</span>
                                    <span>Vocab ({currentLevel.stats.vocabulary}%)</span>
                                    <span>Audio ({currentLevel.stats.listening}%)</span>
                                </div>
                            </div>

                            {/* can do statements list */}
                            <div className="space-y-3">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C96B62]">Validated Competencies (Can-Do)</span>
                                <div className="space-y-2">
                                    {currentLevel.canDo.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-[#262626] bg-[#171717] p-3 text-xs leading-relaxed">
                                            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#62C99B]" />
                                            <span className="text-[#D2D0CB]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* promotion quests */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-3.5">
                            <div>
                                <h2 className="text-base font-bold text-white">Tier Promotion Quests ({currentLevel.code} → B1)</h2>
                                <p className="text-xs text-[#999994]">Mandatory milestones to trigger the Level Advancement Exam.</p>
                            </div>
                            <Award size={18} className="text-[#C96B62]" />
                        </div>

                        <div className="mt-4 space-y-2.5">
                            {currentLevel.unlockQuests.map((quest, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center justify-between rounded-xl border p-3.5 transition-colors ${quest.completed
                                        ? "border-[#1F2B26] bg-[#14211B]"
                                        : "border-[#262626] bg-[#171717]"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-7 w-7 items-center justify-center rounded-lg ${quest.completed ? "bg-[#1C2921] text-[#62C99B]" : "bg-[#252525] text-[#777]"
                                                }`}
                                        >
                                            {quest.completed ? <CheckCircle2 size={16} /> : <Target size={14} />}
                                        </div>
                                        <span className={`text-xs ${quest.completed ? "text-[#B7D8C5] line-through" : "text-white"}`}>
                                            {quest.title}
                                        </span>
                                    </div>

                                    <span className={`font-mono text-xs font-semibold ${quest.completed ? "text-[#62C99B]" : "text-[#C96B62]"
                                        }`}>
                                        {quest.current}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    {/* diagnostic placement launcher */}
                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#241A1A] to-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#C96B62]">
                                <Sparkles size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">AI Skill Re-evaluator</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#777770]">Adaptive 10m</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            Feel like you've outgrown level A2? Run the adaptive AI diagnostic test to assess instant tier upgrade.
                        </p>
                        <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                            <Play size={13} fill="currentColor" /> Take Diagnostic Test
                        </button>
                    </div>

                    {/* study load breakdown */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">CEFR Study Load</h2>
                            <Globe2 size={15} className="text-[#777770]" />
                        </div>

                        <div className="mt-4 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between rounded-lg bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-[#999994]">A1 Elementary</span>
                                <span className="text-[#62C99B]">40h (Done)</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-[#221A1A] p-2.5 border border-[#3D2624]">
                                <span className="text-white">A2 Pre-Int</span>
                                <span className="text-[#C96B62]">41h / 60h</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-[#777]">B1 Intermediate</span>
                                <span className="text-[#777]">90h</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-[#777]">B2 Upper-Int</span>
                                <span className="text-[#777]">120h</span>
                            </div>
                        </div>
                    </div>

                    {/* official badge */}
                    <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#171717] p-3.5">
                        <div className="flex items-center gap-2.5">
                            <Award size={16} className="text-[#62C99B]" />
                            <span className="text-xs text-[#E7E5E1]">A1 Certificate Issued</span>
                        </div>
                        <span className="cursor-pointer font-mono text-xs font-semibold text-[#62C99B] hover:underline">View PDF</span>
                    </div>
                </aside>
            </div>
        </section>
    )
}