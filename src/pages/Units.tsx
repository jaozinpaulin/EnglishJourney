import { useState } from "react"
import { ArrowRight, Award, BookOpen, CheckCircle2, ChevronRight, Compass, Flame, Headphones, Lock, MapPin, Play, Sparkles, SpellCheck, Star, Trophy, Zap } from "lucide-react"

interface UnitLesson {
    id: string
    title: string
    type: "vocabulary" | "grammar" | "listening" | "checkpoint"
    duration: string
    completed: boolean
    score?: number
}

interface Unit {
    id: string
    unitNumber: number
    title: string
    subtitle: string
    level: string
    status: "completed" | "active" | "locked"
    xpReward: number
    lessons: UnitLesson[]
}

const unitsData: Unit[] = [
    {
        id: "u1",
        unitNumber: 1,
        title: "Meeting People & Basic Greetings",
        subtitle: "First impressions, personal introductions and basic pleasantries.",
        level: "A1",
        status: "completed",
        xpReward: 250,
        lessons: [
            { id: "l1", title: "Formal vs. Informal Greetings", type: "vocabulary", duration: "8 min", completed: true, score: 100 },
            { id: "l2", title: "Verb To Be & Subject Pronouns", type: "grammar", duration: "12 min", completed: true, score: 95 },
            { id: "l3", title: "First Day at the Office Dialogue", type: "listening", duration: "10 min", completed: true, score: 90 },
            { id: "l4", title: "Unit 1 Mastery Checkpoint", type: "checkpoint", duration: "15 min", completed: true, score: 96 },
        ],
    },
    {
        id: "u2",
        unitNumber: 2,
        title: "Daily Routines & Tech Workspaces",
        subtitle: "Talking about schedules, habitual actions and dev environment setup.",
        level: "A1",
        status: "active",
        xpReward: 300,
        lessons: [
            { id: "l5", title: "Habitual Verbs & Daily Actions", type: "vocabulary", duration: "10 min", completed: true, score: 92 },
            { id: "l6", title: "Present Simple & Adverbs of Frequency", type: "grammar", duration: "15 min", completed: true, score: 85 },
            { id: "l7", title: "Explaining Your Morning Routine", type: "listening", duration: "12 min", completed: false },
            { id: "l8", title: "Unit 2 Mastery Checkpoint", type: "checkpoint", duration: "15 min", completed: false },
        ],
    },
    {
        id: "u3",
        unitNumber: 3,
        title: "Navigating the City & Commuting",
        subtitle: "Giving and asking for directions, public transit and places in town.",
        level: "A2",
        status: "locked",
        xpReward: 350,
        lessons: [
            { id: "l9", title: "Transit Vocabulary & Prepositions of Place", type: "vocabulary", duration: "10 min", completed: false },
            { id: "l10", title: "Imperatives & Giving Clear Directions", type: "grammar", duration: "12 min", completed: false },
            { id: "l11", title: "Subway & Airport Announcements", type: "listening", duration: "14 min", completed: false },
            { id: "l12", title: "Unit 3 Mastery Checkpoint", type: "checkpoint", duration: "20 min", completed: false },
        ],
    },
    {
        id: "u4",
        unitNumber: 4,
        title: "Shopping & Essential Transactions",
        subtitle: "Prices, payments, returns and casual restaurant ordering.",
        level: "A2",
        status: "locked",
        xpReward: 350,
        lessons: [
            { id: "l13", title: "Money, Quantities & Measurements", type: "vocabulary", duration: "8 min", completed: false },
            { id: "l14", title: "Countable vs. Uncountable Nouns", type: "grammar", duration: "14 min", completed: false },
            { id: "l15", title: "Ordering Food & Special Dietary Requests", type: "listening", duration: "10 min", completed: false },
            { id: "l16", title: "Unit 4 Mastery Checkpoint", type: "checkpoint", duration: "20 min", completed: false },
        ],
    },
]

export default function Units() {
    const [selectedLevel, setSelectedLevel] = useState("A1")
    const [activeUnitId, setActiveUnitId] = useState("u2")

    const activeUnit = unitsData.find((u) => u.id === activeUnitId) || unitsData[1]
    const completedCount = activeUnit.lessons.filter((l) => l.completed).length
    const unitProgress = Math.round((completedCount / activeUnit.lessons.length) * 100)

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Curriculum & Syllabus</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Study Units</h1>
                    <p className="mt-1 text-sm text-[#999994]">Structured learning roadmaps designed to advance your CEFR level step by step.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <Compass size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">Unit 02</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">in progress</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Award size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">6 / 24</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">lessons done</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Zap size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">550 XP</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">earned</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* cefr level switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-3">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#C96B62]" />
                    <span className="text-xs font-semibold text-white">Select Path:</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    {["A1", "A2", "B1", "B2", "C1", "C2"].map((lvl) => {
                        const isSelected = selectedLevel === lvl
                        const isUnlocked = lvl === "A1" || lvl === "A2"
                        return (
                            <button
                                key={lvl}
                                type="button"
                                onClick={() => isUnlocked && setSelectedLevel(lvl)}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${isSelected
                                    ? "bg-[#C96B62] text-white"
                                    : isUnlocked
                                        ? "bg-[#171717] text-[#B7B7B2] hover:bg-[#252525] hover:text-white"
                                        : "cursor-not-allowed bg-[#171717] text-[#555]"
                                    }`}
                            >
                                {!isUnlocked && <Lock size={11} />}
                                {lvl}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                {/* lista de unidades (roadmap) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Level {selectedLevel} Units Roadmap</h2>
                        <span className="font-mono text-xs text-[#777770]">4 Total Modules</span>
                    </div>

                    <div className="space-y-3.5">
                        {unitsData.map((unit) => {
                            const isSelected = activeUnitId === unit.id
                            const isCompleted = unit.status === "completed"
                            const isLocked = unit.status === "locked"

                            return (
                                <div
                                    key={unit.id}
                                    onClick={() => !isLocked && setActiveUnitId(unit.id)}
                                    className={`relative cursor-pointer rounded-2xl border p-5 transition-all ${isSelected
                                        ? "border-[#C96B62] bg-[#211B1B]"
                                        : isCompleted
                                            ? "border-[#2B2B2B] bg-[#1D1D1D] hover:border-[#3A3A3A]"
                                            : isLocked
                                                ? "cursor-not-allowed border-[#222] bg-[#161616] opacity-60"
                                                : "border-[#2B2B2B] bg-[#1D1D1D] hover:border-[#3A3A3A]"
                                        }`}
                                >
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <div className="flex items-start gap-4">
                                            {/* badge unit number */}
                                            <div
                                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${isCompleted
                                                    ? "bg-[#1C2921] text-[#62C99B]"
                                                    : isSelected
                                                        ? "bg-[#C96B62] text-white"
                                                        : isLocked
                                                            ? "bg-[#222] text-[#555]"
                                                            : "bg-[#2A2020] text-[#C96B62]"
                                                    }`}
                                            >
                                                {isCompleted ? <CheckCircle2 size={20} /> : isLocked ? <Lock size={18} /> : `U${unit.unitNumber}`}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">{unit.level}</span>
                                                    <span className="font-mono text-[11px] text-[#777770]">+{unit.xpReward} XP</span>
                                                </div>
                                                <h3 className="mt-1 text-base font-bold text-white">{unit.title}</h3>
                                                <p className="mt-0.5 text-xs text-[#999994]">{unit.subtitle}</p>
                                            </div>
                                        </div>

                                        {/* info lateral / status */}
                                        <div className="flex items-center justify-between gap-4 border-t border-[#242424] pt-3 sm:border-0 sm:pt-0">
                                            <div className="text-left sm:text-right">
                                                <span className="block font-mono text-xs text-white">{unit.lessons.length} Lessons</span>
                                                <span className="text-[10px] text-[#777770]">
                                                    {isCompleted ? "Completed" : isLocked ? "Locked" : "Active Unit"}
                                                </span>
                                            </div>

                                            <ChevronRight size={18} className={isSelected ? "text-[#C96B62]" : "text-[#555]"} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* detalhe da unidade selecionada */}
                <aside className="space-y-5">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-4">
                            <div>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C96B62]">Selected Unit</span>
                                <h3 className="text-base font-bold text-white">Unit {activeUnit.unitNumber} Curriculum</h3>
                            </div>
                            <span className="rounded-md bg-[#292929] px-2 py-1 font-mono text-xs text-[#A78BC7]">{activeUnit.level}</span>
                        </div>

                        {/* progresso da unidade */}
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[#999994]">Unit Completion</span>
                                <strong className="font-mono text-[#C96B62]">{unitProgress}%</strong>
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                <div className="h-full rounded-full bg-[#C96B62] transition-all" style={{ width: `${unitProgress}%` }} />
                            </div>
                        </div>

                        {/* lista de aulas internas */}
                        <div className="mt-5 space-y-2.5">
                            {activeUnit.lessons.map((lesson, idx) => {
                                const Icon =
                                    lesson.type === "vocabulary"
                                        ? BookOpen
                                        : lesson.type === "grammar"
                                            ? SpellCheck
                                            : lesson.type === "listening"
                                                ? Headphones
                                                : Star

                                return (
                                    <div
                                        key={lesson.id}
                                        className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${lesson.completed
                                            ? "border-[#282828] bg-[#171717]"
                                            : "border-[#2B2B2B] bg-[#191919] hover:border-[#3A3A3A]"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center rounded-lg ${lesson.completed
                                                    ? "bg-[#1C2921] text-[#62C99B]"
                                                    : "bg-[#2A2020] text-[#C96B62]"
                                                    }`}
                                            >
                                                {lesson.completed ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold text-white">{lesson.title}</p>
                                                <span className="font-mono text-[10px] text-[#777770]">
                                                    {lesson.duration} • <span className="capitalize">{lesson.type}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${lesson.completed
                                                ? "bg-[#222] text-[#999994] hover:text-white"
                                                : "bg-[#C96B62] text-white hover:bg-[#B85C55]"
                                                }`}
                                        >
                                            {lesson.completed ? "Review" : "Start"}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        {/* acao principal */}
                        <button
                            type="button"
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                        >
                            <Play size={13} fill="currentColor" /> Continue Unit {activeUnit.unitNumber}
                        </button>
                    </div>

                    {/* level certification status */}
                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#C96B62]">
                                <Trophy size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Level {selectedLevel} Exam</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#777770]">Locked (Requires 4/4 Units)</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            Complete all unit mastery checkpoints in this tier to unlock the official <strong>CEFR {selectedLevel} Proficiency Assessment</strong>.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    )
}