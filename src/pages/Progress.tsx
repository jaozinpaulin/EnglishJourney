import { useState } from "react"
import { ArrowRight, Award, Calendar, CheckCircle2, ChevronRight, Clock3, Flame, Gauge, Layers, LineChart, Sparkles, Star, Target, TrendingUp, Trophy, Zap } from "lucide-react"

interface SkillMetric {
    label: string
    percentage: number
    timeSpent: string
    status: string
    color: string
}

interface Milestone {
    id: string
    title: string
    date: string
    xpEarned: number
    type: "streak" | "tier" | "volume"
}

const skillsData: SkillMetric[] = [
    { label: "Vocabulary Mastery", percentage: 78, timeSpent: "14h 20m", status: "Strong", color: "#C96B62" },
    { label: "Grammar Precision", percentage: 72, timeSpent: "18h 40m", status: "Steady", color: "#8BA9AD" },
    { label: "Listening & Accents", percentage: 84, timeSpent: "22h 10m", status: "Advanced", color: "#A78BC7" },
    { label: "Speaking Fluency", percentage: 65, timeSpent: "09h 50m", status: "Focus Area", color: "#C96B62" },
    { label: "Reading Comprehension", percentage: 88, timeSpent: "16h 15m", status: "Dominant", color: "#62C99B" },
    { label: "Writing & Composition", percentage: 69, timeSpent: "07h 30m", status: "Growing", color: "#D19A66" },
]

const weeklyActivity = [
    { day: "Mon", minutes: 45, targetMet: true },
    { day: "Tue", minutes: 60, targetMet: true },
    { day: "Wed", minutes: 30, targetMet: false },
    { day: "Thu", minutes: 55, targetMet: true },
    { day: "Fri", minutes: 40, targetMet: true },
    { day: "Sat", minutes: 75, targetMet: true },
    { day: "Sun", minutes: 42, targetMet: true },
]

const milestones: Milestone[] = [
    { id: "m1", title: "7-Day Consecutive Streak Unlocked", date: "Today", xpEarned: 150, type: "streak" },
    { id: "m2", title: "Passed A1 Comprehensive Assessment", date: "3 days ago", xpEarned: 300, type: "tier" },
    { id: "m3", title: "300 SRS Vocabulary Terms Mastered", date: "Last week", xpEarned: 200, type: "volume" },
]

export default function Progress() {
    const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week")

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Performance & Telemetry</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">My Progress</h1>
                    <p className="mt-1 text-sm text-[#999994]">Deep analytical insights into your retention, consistency and skill velocity.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <Flame size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">7 Days</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">streak</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Clock3 size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">88h 45m</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">total study</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Zap size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">3,420 XP</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">total xp</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* grafico de consistencia semanal & heatmap */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
                {/* volume semanal */}
                <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 sm:p-6">
                    <div className="flex flex-col gap-2 border-b border-[#2B2B2B] pb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-[#C96B62]" />
                                <h2 className="text-base font-bold text-white">Weekly Study Rhythm</h2>
                            </div>
                            <p className="text-xs text-[#999994]">Daily focus time against your 40-minute goal.</p>
                        </div>

                        {/* timeframe switcher */}
                        <div className="flex rounded-lg border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs">
                            {(["week", "month", "all"] as const).map((tf) => (
                                <button
                                    key={tf}
                                    type="button"
                                    onClick={() => setTimeframe(tf)}
                                    className={`rounded-md px-2.5 py-0.5 text-[10px] uppercase tracking-wider transition-all ${timeframe === tf ? "bg-[#C96B62] text-white" : "text-[#777770] hover:text-white"
                                        }`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* barras da semana */}
                    <div className="mt-6 flex h-44 items-end justify-between gap-2 sm:gap-6 px-2">
                        {weeklyActivity.map((item) => {
                            const heightPercent = Math.min((item.minutes / 80) * 100, 100)
                            return (
                                <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                                    <span className="font-mono text-[10px] text-[#999994]">{item.minutes}m</span>
                                    <div className="w-full max-w-[40px] rounded-lg bg-[#262626] p-0.5 flex flex-col justify-end h-32">
                                        <div
                                            style={{ height: `${heightPercent}%` }}
                                            className={`w-full rounded-md transition-all duration-500 ${item.targetMet
                                                ? "bg-gradient-to-t from-[#8E3B33] to-[#C96B62] shadow-[0_0_8px_rgba(201,107,98,0.2)]"
                                                : "bg-[#444]"
                                                }`}
                                        />
                                    </div>
                                    <span className="font-mono text-[11px] text-[#777770]">{item.day}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* consistencia heatmap */}
                <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 sm:p-6">
                    <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
                        <div className="flex items-center gap-2">
                            <Calendar size={15} className="text-[#C96B62]" />
                            <h3 className="text-sm font-bold text-white">Activity Matrix</h3>
                        </div>
                        <span className="font-mono text-[10px] text-[#62C99B]">94% Consistency</span>
                    </div>

                    <p className="mt-3 text-xs text-[#999994]">Active study sessions across the last 60 days.</p>

                    {/* grade de heatmap em miniatura */}
                    <div className="mt-4 grid grid-cols-10 gap-1.5">
                        {Array.from({ length: 60 }).map((_, i) => {
                            const intensity = i % 7 === 0 ? 0 : i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1
                            return (
                                <div
                                    key={i}
                                    className={`h-4 w-full rounded-[3px] transition-colors ${intensity === 3
                                        ? "bg-[#C96B62]"
                                        : intensity === 2
                                            ? "bg-[#8E3B33]"
                                            : intensity === 1
                                                ? "bg-[#3D2220]"
                                                : "bg-[#242424]"
                                        }`}
                                />
                            )
                        })}
                    </div>

                    <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[#777770]">
                        <span>Less active</span>
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-sm bg-[#242424]" />
                            <span className="h-2 w-2 rounded-sm bg-[#3D2220]" />
                            <span className="h-2 w-2 rounded-sm bg-[#8E3B33]" />
                            <span className="h-2 w-2 rounded-sm bg-[#C96B62]" />
                        </div>
                        <span>High focus</span>
                    </div>
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
                {/* detalhe por pilar de habilidade */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Skill Matrix Breakdown</h2>
                        <span className="font-mono text-xs text-[#777770]">6 Core Pillars</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        {skillsData.map((skill) => (
                            <div key={skill.label} className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-4.5 transition-colors hover:border-[#3A3A3A]">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">{skill.label}</h3>
                                        <span className="font-mono text-[11px] text-[#777770]">Invested: {skill.timeSpent}</span>
                                    </div>
                                    <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">
                                        {skill.status}
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#777770]">Mastery Score</span>
                                        <strong className="font-mono text-white">{skill.percentage}%</strong>
                                    </div>
                                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{ width: `${skill.percentage}%`, backgroundColor: skill.color }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    {/* conquistas recentes */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
                            <h3 className="text-sm font-bold text-white">Recent Milestones</h3>
                            <Trophy size={16} className="text-[#C96B62]" />
                        </div>

                        <div className="mt-4 space-y-3">
                            {milestones.map((m) => (
                                <div key={m.id} className="flex items-center justify-between rounded-xl border border-[#242424] bg-[#171717] p-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                                            <Award size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">{m.title}</p>
                                            <span className="font-mono text-[10px] text-[#777770]">{m.date}</span>
                                        </div>
                                    </div>
                                    <span className="font-mono text-xs font-bold text-[#62C99B]">+{m.xpEarned} XP</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* projecao de fluencia com ia */}
                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#241A1A] to-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#C96B62]">
                                <Sparkles size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Fluency Forecast</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#777770]">AI Prediction</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            At your current learning pace of <strong>45 min/day</strong>, you are projected to complete <strong className="text-white">CEFR B1</strong> in approximately <strong>6 weeks</strong>.
                        </p>
                        <div className="mt-4 border-t border-[#332020] pt-3 text-xs font-semibold text-[#C96B62]">
                            Consistency Score: 9.4 / 10
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
}
/*
    FUTURE PROGRESS IDEAS
    ---------------------

    PURPOSE:
    - Progress is the central overview of the user's English journey.
    - It should show how the user is improving over time.
    - It should not be the main place for studying.
    - It should collect and present information from the other learning areas.

    MAIN AREAS:
    - Vocabulary
    - Grammar
    - Listening
    - Speaking
    - Daily activities
    - Study consistency

    IMPORTANT:
    - Progress should consume data from the other areas.
    - It should not manually own the main learning data.
    - The values currently displayed are mock data.
    - Later, these values should come from the user's stored data.

    FUTURE DATA FLOW:

    Vocabulary
        ↓
    Grammar
        ↓
    Listening
        ↓
    Speaking
        ↓
    Daily Study
        ↓
    Progress


    PROGRESS SUMMARY:
    - Words learned
    - Grammar accuracy
    - Listening time
    - Speaking time
    - Total study time
    - Activities completed
    - Lessons completed
    - Sessions completed

    OVERALL PROGRESS:
    - Avoid using an arbitrary percentage such as "68% of English".
    - A general percentage can be misleading.
    - Prefer real measurable indicators.
    - Possible indicators:
        → Study consistency
        → Weekly completion
        → Learning activity
        → Vocabulary growth
        → Grammar accuracy
        → Listening time
        → Speaking time

    WEEKLY ACTIVITY:
    - Show the user's activity during the week.
    - Display completed study days.
    - Display missed days.
    - Show the current streak.
    - Allow the user to visualize consistency.

    EXAMPLE:

    Monday     ✓
    Tuesday    ✓
    Wednesday  ✓
    Thursday   ✓
    Friday     ✓
    Saturday   ○
    Sunday     ○

    STREAK SYSTEM:
    - Track consecutive study days.
    - Increase streak when the daily goal is completed.
    - Avoid making the system excessively rigid.
    - Consider flexible rules for missed days.
    - Possible future features:
        → Streak protection
        → Rest days
        → Flexible weekly goals
        → Recovery system

    STUDY STATISTICS:
    - Total study time
    - Study time this week
    - Study time this month
    - Activities completed
    - Lessons completed
    - Average daily study time
    - Most active study day
    - Most practiced category

    VOCABULARY PROGRESS:
    - Total words learned
    - Words learned this week
    - Words reviewed
    - Vocabulary growth over time
    - Most frequently reviewed words
    - Words learned through Listening
    - Words learned through Speaking

    GRAMMAR PROGRESS:
    - Grammar topics completed
    - Exercise accuracy
    - Common mistakes
    - Weak grammar topics
    - Strong grammar topics
    - Grammar improvement over time

    LISTENING PROGRESS:
    - Total listening time
    - Lessons completed
    - Sessions completed
    - Listening accuracy
    - Comprehension score
    - Vocabulary learned through listening
    - Listening improvement over time

    SPEAKING PROGRESS:
    - Total speaking time
    - Number of speaking sessions
    - Number of recordings
    - Speaking duration evolution
    - Words spoken
    - Grammar accuracy
    - Vocabulary variety
    - Fluency
    - Pronunciation
    - Confidence

    SPEAKING EVOLUTION:

    30 sec
       ↓
    1 min
       ↓
    2 min
       ↓
    5 min
       ↓
    Spontaneous conversation

    WEEKLY SPEAKING:
    - Track weekly speaking challenges.
    - Store completed recordings.
    - Show the user's evolution.
    - Compare current week with previous weeks.

    ACHIEVEMENTS:
    - First vocabulary lesson
    - 100 words learned
    - 500 words learned
    - First grammar lesson
    - First listening session
    - First speaking session
    - 7 day streak
    - 30 day streak
    - 60 minutes listening
    - 60 minutes speaking
    - First spontaneous conversation

    FUTURE ACHIEVEMENTS:
    - Create achievement levels.
    - Unlock achievements automatically.
    - Show locked and completed achievements.
    - Avoid making achievements purely cosmetic.
    - Connect achievements to real learning milestones.

    PROGRESS OVER TIME:
    - Weekly progress
    - Monthly progress
    - Long-term progress
    - Compare previous periods.
    - Show growth through charts.

    FUTURE CHARTS:
    - Study time per day
    - Vocabulary growth
    - Grammar accuracy
    - Listening time
    - Speaking time
    - Weekly consistency
    - Learning activity distribution

    EXAMPLE:

    Week 1
    Vocabulary   20 words
    Listening    30 min
    Speaking     5 min

    Week 2
    Vocabulary   35 words
    Listening    42 min
    Speaking     12 min

    Week 3
    Vocabulary   48 words
    Listening    55 min
    Speaking     18 min


    AI ANALYSIS:
    - Use AI to analyze the user's learning data.
    - Identify strengths.
    - Identify weaknesses.
    - Detect learning patterns.
    - Recommend what to study next.

    EXAMPLE:

    User data:
        Vocabulary → strong
        Grammar → medium
        Listening → strong
        Speaking → weak

    AI recommendation:
        "You are progressing well in vocabulary and listening.
         Try increasing your speaking practice this week."

    PERSONALIZED RECOMMENDATIONS:
    - Recommend Grammar topics based on speaking mistakes.
    - Recommend Vocabulary based on Listening.
    - Recommend Listening based on vocabulary level.
    - Recommend Speaking activities based on current confidence.
    - Adjust difficulty according to performance.

    FUTURE SMART STUDY PLAN:

    Progress
        ↓
    Analyze user data
        ↓
    Identify weaknesses
        ↓
    Generate recommendation
        ↓
    Daily Study
        ↓
    User completes activity
        ↓
    Progress updates


    USER LOGIN / PERSONAL DATA:
    - Every user should have their own progress.
    - Store learning data by user ID.
    - Keep progress independent between users.
    - Load progress when the user logs in.
    - Update progress after completing activities.

    FIREBASE / FIRESTORE:
    - Store user statistics.
    - Store daily activity.
    - Store streak information.
    - Store completed lessons.
    - Store vocabulary progress.
    - Store grammar progress.
    - Store listening progress.
    - Store speaking progress.
    - Store achievements.

    POSSIBLE DATA STRUCTURE:

    users
        └── userId
            ├── profile
            ├── vocabulary
            ├── grammar
            ├── listening
            ├── speaking
            ├── dailyActivity
            ├── achievements
            └── progress

    IMPORTANT ARCHITECTURE:
    - Progress.tsx should mainly display aggregated information.
    - Learning pages should be responsible for their own learning data.
    - Services/hooks can later collect and transform the data.
    - Avoid putting all business logic directly inside Progress.tsx.

    FUTURE HOOKS:
    - useProgress()
    - useStudyStats()
    - useStreak()
    - useAchievements()

    FUTURE SERVICES:
    - progressService
    - studyStatsService
    - streakService
    - achievementService

    LONG-TERM GOAL:

    Progress should eventually become the user's personal
    English learning dashboard.

    It should answer:

        "Where am I?"
        "What have I learned?"
        "What am I good at?"
        "What do I need to improve?"
        "Am I being consistent?"
        "What should I study next?"

    FINAL VISION:

    Vocabulary
          │
    Grammar
          │
    Listening
          │
    Speaking
          │
    Daily Study
          │
          ▼
       Progress
          │
          ▼
          AI Analysis
          │
          ▼
    Personalized Study Plan
*/