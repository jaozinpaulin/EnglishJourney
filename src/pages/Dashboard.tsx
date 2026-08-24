import { ArrowRight, BookOpen, Check, Clock3, Flame, Headphones, Mic, MessageCircle, MoreVertical, SpellCheck, Target, TrendingUp } from "lucide-react"

interface Stat {
    label: string
    value: string
    description: string
}

interface StudyActivity {
    id: string
    title: string
    subtitle: string
    duration: string
    icon: typeof BookOpen
    progress: number
    completed: boolean
}

const stats: Stat[] = [
    { label: "Current Level", value: "A1", description: "Elementary" },
    { label: "Day Streak", value: "7", description: "Keep it going!" },
    { label: "Study Time", value: "42 min", description: "Today" },
]

const activities: StudyActivity[] = [
    { id: "vocabulary", title: "Vocabulary", subtitle: "Greetings & introductions", duration: "10 min", icon: BookOpen, progress: 60, completed: false },
    { id: "grammar", title: "Grammar", subtitle: "Verb to be", duration: "12 min", icon: SpellCheck, progress: 30, completed: false },
    { id: "listening", title: "Listening", subtitle: "Simple conversations", duration: "15 min", icon: Headphones, progress: 0, completed: false },
    { id: "speaking", title: "Speaking", subtitle: "Introduce yourself", duration: "10 min", icon: Mic, progress: 0, completed: false },
]

const skills = [
    { label: "Vocabulary", value: 72 },
    { label: "Grammar", value: 64 },
    { label: "Listening", value: 58 },
    { label: "Speaking", value: 42 },
]

export default function Dashboard() {
    const completedActivities = 1
    const totalActivities = activities.length
    const dailyProgress = (completedActivities / totalActivities) * 100

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">English Journey</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Good morning, João!</h1>
                    <p className="mt-1 text-sm text-[#999994]">Ready to continue your English journey?</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <Flame size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">7</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">day streak</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#A8A8A3]">
                            <Clock3 size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">42 min</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">study time</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <BookOpen size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">0</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">lessons done</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-5">
                    <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                        <div className="border-b border-[#2B2B2B] px-6 py-3.5">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Current Journey</p>
                        </div>
                        <div className="grid gap-6 p-6 md:grid-cols-[160px_minmax(0,1fr)_200px] md:items-center">
                            <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-[#49302E] bg-gradient-to-br from-[#6D3833] via-[#2A2020] to-[#181818] md:mx-0">
                                <div className="absolute inset-3.5 rounded-full border border-[#C96B62]/20" />
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase tracking-widest text-[#999994]">Level</span>
                                    <strong className="block font-mono text-3xl font-bold text-white">A1</strong>
                                    <span className="text-[11px] text-[#777770]">Elementary</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xs text-[#999994]">
                                    <span>A1</span> <ArrowRight size={12} /> <span>Unit 1</span>
                                </div>
                                <h2 className="mt-1 text-xl font-bold text-white">Meeting People</h2>
                                <div className="mt-4 border-t border-[#2B2B2B] pt-4">
                                    <p className="text-xs font-semibold text-[#C96B62]">Lesson 1</p>
                                    <h3 className="mt-0.5 text-base font-semibold text-white">Greetings</h3>
                                    <p className="mt-1 max-w-lg text-xs leading-relaxed text-[#999994]">Learn simple greetings and ways to start a basic conversation in English.</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[#999994]">Lesson progress</span>
                                    <strong className="font-mono text-[#C96B62]">60%</strong>
                                </div>
                                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "60%" }} />
                                </div>
                                <p className="mt-2 text-[11px] text-[#777770]">2 of 4 activities completed</p>
                                <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                                    Continue lesson <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* cards metricas */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs text-[#999994]">{stat.label}</p>
                                        <strong className="mt-1 block font-mono text-xl font-semibold text-white">{stat.value}</strong>
                                        <span className="mt-0.5 block text-[11px] text-[#777770]">{stat.description}</span>
                                    </div>
                                    {stat.label === "Day Streak" && <Flame size={18} className="text-[#C96B62]" strokeWidth={1.8} />}
                                    {stat.label === "Study Time" && <Clock3 size={18} className="text-[#8BA9AD]" strokeWidth={1.8} />}
                                    {stat.label === "Current Level" && <Target size={18} className="text-[#A78BC7]" strokeWidth={1.8} />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* atividades */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                        <div className="flex flex-col gap-2 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Today's Journey</h2>
                                <p className="text-xs text-[#999994]">Your daily English learning activities.</p>
                            </div>
                            <span className="text-xs text-[#999994]">
                                <strong className="font-mono text-[#E7E5E1]">{completedActivities}</strong> of {totalActivities} completed
                            </span>
                        </div>

                        <div className="px-6 pt-4">
                            <div className="h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                <div className="h-full rounded-full bg-[#C96B62] transition-all duration-300" style={{ width: `${dailyProgress}%` }} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5 p-6 md:grid-cols-2">
                            {activities.map((activity) => {
                                const Icon = activity.icon
                                return (
                                    <article key={activity.id} className={`rounded-xl border p-4 transition-colors ${activity.progress > 0 ? "border-[#59403D] bg-[#211C1C]" : "border-[#2B2B2B] bg-[#191919] hover:border-[#3A3A3A]"}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                                                    <Icon size={18} strokeWidth={1.8} />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">{activity.title}</h3>
                                                    <p className="text-[11px] text-[#777770]">{activity.subtitle}</p>
                                                </div>
                                            </div>
                                            <button type="button" className="text-[#777770] transition-colors hover:text-white">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-[#777770]">Progress</span>
                                                <span className="font-mono text-[#999994]">{activity.progress}%</span>
                                            </div>
                                            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                                <div className="h-full rounded-full bg-[#C96B62]" style={{ width: `${activity.progress}%` }} />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-[11px] text-[#777770]">
                                                <Clock3 size={13} /> {activity.duration}
                                            </div>
                                            <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                                                {activity.progress > 0 ? "Continue" : "Start"} <ArrowRight size={13} />
                                            </button>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Today's Focus</p>
                            <MoreVertical size={16} className="text-[#777770]" />
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62]">
                                <MessageCircle size={19} strokeWidth={1.8} />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-white">Greetings</h2>
                                <p className="mt-0.5 text-xs leading-relaxed text-[#999994]">Learn how to greet people and start simple conversations.</p>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-[#2B2B2B] pt-4">
                            <p className="text-[11px] font-semibold text-[#999994]">Key vocabulary</p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {["Hello", "Hi", "Good morning", "Goodbye", "Bye", "See you"].map((word) => (
                                    <span key={word} className="rounded-full bg-[#292929] px-2.5 py-1 font-mono text-[11px] text-[#B7B7B2]">{word}</span>
                                ))}
                            </div>
                        </div>

                        <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#6B3935] px-4 py-2.5 text-xs font-semibold text-[#C96B62] transition-colors hover:bg-[#2A2020]">
                            Start practicing <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* progresso geral */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">Journey Progress</h2>
                            <TrendingUp size={16} className="text-[#C96B62]" />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            {["A1", "A2", "B1", "B2", "C1", "C2"].map((level, index) => (
                                <div key={level} className="flex items-center">
                                    <div className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${index === 0 ? "bg-[#C96B62] text-white" : "bg-[#292929] text-[#777770]"}`}>
                                        {level}
                                    </div>
                                    {index < 5 && <ArrowRight size={10} className="mx-0.5 text-[#4A4A4A]" />}
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <p className="text-xs text-[#999994]">Overall progress</p>
                            <div className="mt-1 flex items-baseline justify-between">
                                <strong className="font-mono text-2xl font-bold text-white">24%</strong>
                                <span className="text-[11px] text-[#777770]">A1 level</span>
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "24%" }} />
                            </div>
                        </div>

                        <div className="mt-5 space-y-3 border-t border-[#2B2B2B] pt-4">
                            {skills.map((skill) => (
                                <div key={skill.label}>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-[#999994]">{skill.label}</span>
                                        <span className="font-mono text-white">{skill.value}%</span>
                                    </div>
                                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                        <div className="h-full rounded-full bg-[#C96B62]" style={{ width: `${skill.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                            View detailed progress <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* revisao */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#242126] text-[#A78BC7]">
                                <Check size={18} strokeWidth={1.8} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-white">Quick Review</p>
                                <p className="text-[11px] text-[#777770]">6 items ready to review</p>
                            </div>
                        </div>
                        <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#242424] px-4 py-2 text-xs font-semibold text-[#E7E5E1] transition-colors hover:bg-[#2B2B2B]">
                            Review now <ArrowRight size={13} />
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    )
}
/*
    FUTURE DASHBOARD IDEAS
    ----------------------

    PURPOSE:
    - Dashboard is the user's starting point.
    - It should show what the user needs to do today.
    - It should provide a quick overview of the current learning state.
    - It should not contain all the details of the other learning pages.

    IMPORTANT:
    - Dashboard should be simple and actionable.
    - Detailed learning content belongs to the specific pages.
    - Progress belongs to the Progress page.
    - Dashboard should focus mainly on TODAY.


    DAILY STUDY STRUCTURE:

    Vocabulary
        ↓
    15 minutes

    Grammar
        ↓
    15 minutes

    Listening
        ↓
    15 minutes

    Speaking
        ↓
    15 minutes

    Total
        ↓
    ~1 hour per day


    TODAY'S GOAL:
    - Show the daily study goal.
    - Show how many activities were completed.
    - Show the percentage of daily completion.
    - Update automatically when activities are completed.

    Example:

    3 of 4 activities completed
    ███████████████░░░░ 75%


    DAILY ACTIVITIES:
    - Vocabulary
    - Grammar
    - Listening
    - Speaking

    Each activity should eventually:
    - Have a real completion state.
    - Have a start action.
    - Link to its respective page.
    - Update the daily progress when completed.

    FUTURE ACTIVITY STATES:

    Not started
        ↓
    In progress
        ↓
    Completed


    Example:

    Vocabulary
    [ Start ]

    Vocabulary
    [ Continue ]

    Vocabulary
    ✓ Completed


    DASHBOARD NAVIGATION:
    - Dashboard should not duplicate the navigation menu.
    - Each activity can provide a direct shortcut to its page.

    Example:

    Vocabulary → /vocabulary
    Grammar → /grammar
    Listening → /listening
    Speaking → /speaking


    DAILY STATISTICS:
    - Current streak
    - Study time today
    - Words learned
    - Activities completed

    Future statistics:
    - Listening minutes
    - Speaking minutes
    - Grammar exercises
    - Vocabulary reviews


    STREAK:
    - Show the current study streak.
    - Update based on daily activity.
    - Do not make the system unnecessarily rigid.
    - Consider flexible streak rules in the future.

    Example:

    Current streak
    7 days


    STUDY TIME:
    - Track the amount of time studied today.
    - Combine time from:
        → Vocabulary
        → Grammar
        → Listening
        → Speaking

    Example:

    Vocabulary     15 min
    Grammar        10 min
    Listening      15 min
    Speaking        5 min
    ---------------------
    Total          45 min


    WORDS LEARNED:
    - Show vocabulary learned recently.
    - This number should eventually come from Vocabulary.
    - Avoid manually storing the value in Dashboard.

    Example:

    Words learned
    128


    FUTURE DAILY RECOMMENDATION:
    - Show a small recommendation based on the user's progress.
    - Recommendation can come from Progress or AI.

    Example:

    "You haven't practiced speaking today."

    [ Practice Speaking ]


    FUTURE AI INTEGRATION:
    - AI can analyze the user's recent activity.
    - AI can recommend what to study today.
    - AI can identify weak areas.
    - AI can adapt the daily activities.

    Example:

    User has strong vocabulary
    but weak speaking.

        ↓

    AI recommendation:

    "Focus on speaking today."

        ↓

    Dashboard highlights Speaking.


    PERSONALIZED DAILY PLAN:
    - The default routine is:
        → Vocabulary 15 min
        → Grammar 15 min
        → Listening 15 min
        → Speaking 15 min

    - Future versions can adapt these times.

    Example:

    Vocabulary     10 min
    Grammar        10 min
    Listening      20 min
    Speaking       20 min

    Total           1 hour


    DAILY COMPLETION:
    - Completing an activity should update Dashboard.
    - Dashboard should reflect real progress.

    Example:

    Before:

    0 / 4
    0%

    After Vocabulary:

    1 / 4
    25%

    After Grammar:

    2 / 4
    50%

    After Listening:

    3 / 4
    75%

    After Speaking:

    4 / 4
    100%


    FUTURE DAILY HISTORY:
    - Store completed activities by date.
    - Allow Progress to use this information.
    - Track daily consistency.

    Example:

    2026-08-17
        Vocabulary ✓
        Grammar ✓
        Listening ✓
        Speaking ○


    USER LOGIN:
    - Dashboard should display data belonging to the logged-in user.
    - Each user should have an independent daily routine.
    - Load user statistics after authentication.

    FUTURE USER DATA:

    users
        └── userId
            ├── dailyActivity
            ├── streak
            ├── studyTime
            ├── vocabulary
            ├── grammar
            ├── listening
            └── speaking


    FIREBASE:
    - Store daily activity.
    - Store completed activities.
    - Store study time.
    - Store streak information.
    - Store vocabulary statistics.
    - Store listening statistics.
    - Store speaking statistics.
    - Store grammar statistics.


    FUTURE HOOKS:
    - useDailyStudy()
    - useStreak()
    - useStudyTime()
    - useProgress()

    The Dashboard should eventually consume these hooks
    instead of keeping hardcoded values.


    FUTURE COMPONENTS:
    - DailyStats
    - DailyGoal
    - StudyActivityCard
    - StudyRecommendation
    - StreakCard

    This can help keep Dashboard.tsx small as the application grows.


    ARCHITECTURE:

    Dashboard
        │
        ├── DailyStats
        │
        ├── DailyGoal
        │
        ├── Today's Study
        │       │
        │       ├── Vocabulary
        │       ├── Grammar
        │       ├── Listening
        │       └── Speaking
        │
        └── Recommendation


    DATA FLOW:

    User
        ↓
    Authentication
        ↓
    User ID
        ↓
    Daily Study Data
        ↓
    Dashboard


    CONNECTION WITH OTHER PAGES:

    Dashboard
        │
        ├──→ Vocabulary
        ├──→ Grammar
        ├──→ Listening
        ├──→ Speaking
        └──→ Progress


    LONG-TERM VISION:

    Dashboard should become the user's daily command center.

    When the user opens the application, they should immediately know:

        "What should I study today?"

        "How much have I already studied?"

        "What have I completed?"

        "What should I do next?"

    The Dashboard should make the daily routine simple,
    clear and motivating without overwhelming the user.
*/