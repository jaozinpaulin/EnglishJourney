import { useState } from "react"
import { ArrowRight, CheckCircle2, ChevronRight, Compass, Cpu, HelpCircle, Lock, Play, RotateCcw, Sparkles, SpellCheck, Terminal, XCircle } from "lucide-react"

interface GrammarTopic {
    id: string
    title: string
    category: string
    level: string
    ruleFormula: string
    status: "completed" | "in_progress" | "locked"
    accuracy: number
    examplesCount: number
}

const grammarTopics: GrammarTopic[] = [
    {
        id: "t1",
        title: "Present Simple vs Continuous",
        category: "Verb Tenses",
        level: "A1-A2",
        ruleFormula: "S + V(s) vs S + am/is/are + V-ing",
        status: "completed",
        accuracy: 94,
        examplesCount: 18
    },
    {
        id: "t2",
        title: "Past Simple (Regular & Irregular)",
        category: "Verb Tenses",
        level: "A2",
        ruleFormula: "S + V-ed / irregular past form",
        status: "in_progress",
        accuracy: 68,
        examplesCount: 24
    },
    {
        id: "t3",
        title: "Present Perfect Basics",
        category: "Aspects & Tenses",
        level: "B1",
        ruleFormula: "S + have/has + Past Participle (V3)",
        status: "in_progress",
        accuracy: 45,
        examplesCount: 15
    },
    {
        id: "t4",
        title: "Modal Verbs: Should / Must / Have to",
        category: "Modals",
        level: "B1",
        ruleFormula: "S + modal + base verb (infinitive)",
        status: "locked",
        accuracy: 0,
        examplesCount: 20
    }
]

export default function Grammar() {
    const [selectedFormula, setSelectedFormula] = useState("positive")

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Structure & Syntax</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Grammar Lab</h1>
                    <p className="mt-1 text-sm text-[#999994]">Master language mechanics, sentence formulas and tense structures.</p>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <SpellCheck size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">24/48</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">rules learned</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Cpu size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">82%</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">avg accuracy</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Compass size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">B1 Path</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">current goal</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* rule breakdown interativo */}
            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-[#C96B62]" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E7E5E1]">Rule Matrix • Present Perfect</span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">B1</span>
                    </div>

                    <div className="flex rounded-lg border border-[#2B2B2B] bg-[#171717] p-1">
                        {(["positive", "negative", "question"] as const).map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setSelectedFormula(type)}
                                className={`rounded-md px-3 py-1 font-mono text-[11px] capitalize transition-all ${selectedFormula === type ? "bg-[#292929] text-white" : "text-[#777770] hover:text-[#B7B7B2]"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#262626] bg-[#151515] p-4">
                        <div className="rounded-lg border border-[#3A2222] bg-[#241A1A] px-3.5 py-2 text-center">
                            <span className="block font-mono text-xs font-bold text-[#C96B62]">
                                {selectedFormula === "question" ? "Have / Has" : "Subject"}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-[#777770]">
                                {selectedFormula === "question" ? "auxiliary" : "I, you, he, she..."}
                            </span>
                        </div>

                        <span className="font-mono text-sm text-[#555]">+</span>

                        <div className="rounded-lg border border-[#2B2B2B] bg-[#1E1E1E] px-3.5 py-2 text-center">
                            <span className="block font-mono text-xs font-bold text-white">
                                {selectedFormula === "positive" && "have / has"}
                                {selectedFormula === "negative" && "haven't / hasn't"}
                                {selectedFormula === "question" && "Subject"}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-[#777770]">
                                {selectedFormula === "question" ? "pronoun / noun" : "auxiliary verb"}
                            </span>
                        </div>

                        <span className="font-mono text-sm text-[#555]">+</span>

                        <div className="rounded-lg border border-[#26312B] bg-[#17241E] px-3.5 py-2 text-center">
                            <span className="block font-mono text-xs font-bold text-[#62C99B]">Past Participle (V3)</span>
                            <span className="text-[9px] uppercase tracking-wider text-[#777770]">done, seen, worked</span>
                        </div>

                        <span className="font-mono text-sm text-[#555]">+</span>

                        <div className="rounded-lg border border-[#28252F] bg-[#1C1824] px-3.5 py-2 text-center">
                            <span className="block font-mono text-xs font-bold text-[#A78BC7]">Complement</span>
                            <span className="text-[9px] uppercase tracking-wider text-[#777770]">already, yet, since...</span>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-4 sm:flex-row sm:items-center">
                        <div className="space-y-0.5">
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">Live Example</span>
                            <p className="font-mono text-xs text-[#E7E5E1]">
                                {selectedFormula === "positive" && "I have already finished the deployment pipeline."}
                                {selectedFormula === "negative" && "They haven't updated the repository yet."}
                                {selectedFormula === "question" && "Have you tested the API endpoints today?"}
                            </p>
                        </div>
                        <button type="button" className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#C96B62] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                            <Play size={13} fill="currentColor" /> Practice this Rule
                        </button>
                    </div>
                </div>
            </div>

            {/* layout principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Grammar Curriculum</h2>
                        <span className="font-mono text-xs text-[#777770]">4 Active Modules</span>
                    </div>

                    <div className="space-y-3">
                        {grammarTopics.map((topic, index) => {
                            const isLocked = topic.status === "locked"
                            const isDone = topic.status === "completed"

                            return (
                                <div
                                    key={topic.id}
                                    className={`relative rounded-2xl border p-5 transition-all ${isDone
                                        ? "border-[#2B2B2B] bg-[#1A1A1A]"
                                        : isLocked
                                            ? "border-[#222] bg-[#171717] opacity-60"
                                            : "border-[#4A2D2A] bg-[#1E1919]"
                                        }`}
                                >
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <div className="flex items-start gap-4">
                                            {/* status indicador */}
                                            <div
                                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${isDone
                                                    ? "bg-[#1C2921] text-[#62C99B]"
                                                    : isLocked
                                                        ? "bg-[#222] text-[#555]"
                                                        : "bg-[#2E1E1D] text-[#C96B62]"
                                                    }`}
                                            >
                                                {isDone ? <CheckCircle2 size={18} /> : isLocked ? <Lock size={16} /> : `0${index + 1}`}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[10px] text-[#A78BC7]">{topic.category}</span>
                                                    <span className="rounded bg-[#292929] px-1.5 py-0.2 font-mono text-[9px] text-[#777770]">{topic.level}</span>
                                                </div>

                                                <h3 className="mt-1 text-sm font-semibold text-white sm:text-base">{topic.title}</h3>
                                                <p className="mt-1 font-mono text-[11px] text-[#888]">{topic.ruleFormula}</p>
                                            </div>
                                        </div>

                                        {/* acao / progresso */}
                                        <div className="flex items-center justify-between gap-4 border-t border-[#2B2B2B] pt-3 sm:border-0 sm:pt-0">
                                            {!isLocked ? (
                                                <div className="text-left sm:text-right">
                                                    <span className="block font-mono text-xs font-semibold text-white">{topic.accuracy}%</span>
                                                    <span className="text-[10px] text-[#777770]">{topic.examplesCount} exercises</span>
                                                </div>
                                            ) : (
                                                <span className="text-[11px] text-[#555]">Prerequisite needed</span>
                                            )}

                                            <button
                                                type="button"
                                                disabled={isLocked}
                                                className={`flex h-9 items-center gap-1.5 rounded-xl px-4 text-xs font-semibold transition-colors ${isLocked
                                                    ? "cursor-not-allowed bg-[#222] text-[#555]"
                                                    : isDone
                                                        ? "border border-[#2B2B2B] bg-[#222] text-white hover:bg-[#2A2A2A]"
                                                        : "bg-[#C96B62] text-white hover:bg-[#B85C55]"
                                                    }`}
                                            >
                                                {isDone ? "Review" : isLocked ? "Locked" : "Continue"}
                                                {!isLocked && <ChevronRight size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Mistake Hunter</p>
                            <Sparkles size={16} className="text-[#C96B62]" />
                        </div>
                        <p className="mt-1 text-xs text-[#999994]">Find the flaw in this sentence:</p>

                        <div className="mt-3 rounded-xl border border-[#3A2222] bg-[#211717] p-3.5">
                            <div className="flex items-start gap-2">
                                <XCircle size={15} className="mt-0.5 shrink-0 text-[#C96B62]" />
                                <p className="font-mono text-xs text-[#E7E5E1]">"She don't likes working on weekends."</p>
                            </div>
                            <div className="mt-3 border-t border-[#332020] pt-2 text-[11px] text-[#A88]">
                                <span className="font-semibold text-white">Rule:</span> Third-person uses <code>doesn't + base verb</code>.
                            </div>
                        </div>

                        <button type="button" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#242424] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2B2B2B]">
                            <RotateCcw size={13} /> Try Another Example
                        </button>
                    </div>

                    {/* verb tense matrix */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">Tense Mastery</h2>
                            <Terminal size={15} className="text-[#777770]" />
                        </div>

                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Present Tenses (4)</span>
                                    <span className="font-mono text-[#62C99B]">90%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#62C99B]" style={{ width: "90%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Past Tenses (4)</span>
                                    <span className="font-mono text-[#C96B62]">55%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "55%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Future & Conditionals</span>
                                    <span className="font-mono text-[#A78BC7]">25%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#A78BC7]" style={{ width: "25%" }} />
                                </div>
                            </div>
                        </div>

                        <button type="button" className="mt-5 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                            Open Full Grammar Tree <ArrowRight size={13} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#171717] p-3.5">
                        <div className="flex items-center gap-2.5">
                            <HelpCircle size={16} className="text-[#777770]" />
                            <span className="text-xs text-[#B7B7B2]">Irregular Verbs CheatSheet</span>
                        </div>
                        <span className="cursor-pointer font-mono text-xs font-semibold text-[#C96B62] hover:underline">PDF</span>
                    </div>
                </aside>
            </div>
        </section>
    )
}
/*
    FUTURE GRAMMAR IDEAS
    ---------------------

    PURPOSE:
    - Grammar is the main area for learning and practicing English structures.
    - Organize grammar topics according to the English Journey study plan.
    - Track daily grammar activities and long-term progress.

    CURRENT BASE:
    - Today's Grammar
    - Daily exercise goal
    - Daily progress
    - Grammar topics
    - Topic level
    - Topic progress
    - General grammar statistics

    GRAMMAR TOPICS:
    Phase 1 - Fundamentals:
    - Verb to be
    - Pronouns
    - Articles
    - Possessives
    - Plural
    - Main verbs
    - Affirmative sentences
    - Negative sentences
    - Simple questions

    Phase 2 - Sentence Construction:
    - I am...
    - I have...
    - I like...
    - I want to...
    - I need to...
    - I can...
    - I don't...
    - Do you...?

    FUTURE TOPIC STRUCTURE:
    Grammar
        ↓
    Topic
        ↓
    Lesson
        ↓
    Explanation
        ↓
    Examples
        ↓
    Exercises
        ↓
    Results
        ↓
    Progress

    LESSON CONTENT:
    - Grammar explanation
    - Rules
    - Examples
    - Common mistakes
    - Real-life examples
    - Vocabulary related to the topic
    - Practice sentences

    EXERCISES:
    - Multiple choice
    - Fill in the blanks
    - Complete the sentence
    - Choose the correct option
    - Sentence correction
    - Sentence construction
    - Translate simple sentences
    - Build sentences from words

    EXERCISE RESULTS:
    - Correct / incorrect answer
    - Number of attempts
    - Accuracy
    - Exercises completed
    - Topics completed
    - Mistakes history

    TOPIC PROGRESS:
    - Exercises completed
    - Accuracy percentage
    - Topic mastery
    - Last studied
    - Review status

    IMPORTANT:
    - Exercise completion and grammar mastery should be treated as different metrics.
    - Example:
        Exercises: 8 / 10
        Accuracy: 80%
    - Completing exercises does not necessarily mean mastering the topic.

    FUTURE SMART REVIEW:
    - Detect topics with low accuracy.
    - Recommend topics that need review.
    - Identify recurring mistakes.
    - Suggest additional exercises.
    - Create personalized grammar practice.

    DAILY STUDY:
    - Daily grammar goal
    - Track exercises completed today
    - Track study time
    - Maintain daily study history
    - Connect with the English Journey daily routine

    PROGRESS PAGE:
    - Send grammar statistics to the global Progress page.
    - Topics studied
    - Exercises completed
    - Average accuracy
    - Grammar level
    - Strongest topics
    - Topics that need improvement

    USER DATA / FUTURE LOGIN:
    - Save grammar progress per user.
    - Save completed exercises.
    - Save answers and mistakes.
    - Save topic progress.
    - Save study history.
    - Save review history.

    FUTURE FIREBASE / FIRESTORE:
    - Store grammar topics.
    - Store user progress.
    - Store exercise results.
    - Store grammar history.
    - Connect grammar data with the Progress page.

    FUTURE PERSONALIZATION:
    - Recommend exercises based on user performance.
    - Adjust difficulty according to accuracy.
    - Recommend reviews based on mistakes.
    - Create a personalized grammar path.

    LONG-TERM IDEA:
    - Transform Grammar from a static list of topics into a complete
      interactive learning system.

    IMPORTANT ARCHITECTURE:
    - Dashboard = daily summary.
    - Grammar = detailed grammar study.
    - Progress = global progress overview.
*/