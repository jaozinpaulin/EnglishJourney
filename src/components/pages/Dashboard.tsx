import {
    BookOpen,
    SpellCheck,
    Headphones,
    Mic,
} from "lucide-react"


interface Stat {
    label: string
    value: string
}

interface StudyActivity {
    id: string
    title: string
    duration: string
    description: string
    icon: typeof BookOpen
}

const stats: Stat[] = [
    {
        label: "Streak",
        value: "7 days",
    },
    {
        label: "Study Time",
        value: "42 min",
    },
    {
        label: "Words Learned",
        value: "128",
    },
]

const activities: StudyActivity[] = [
    {
        id: "vocabulary",
        title: "Vocabulary",
        duration: "15 min",
        description: "Learn new words inside sentences.",
        icon: BookOpen,
    },
    {
        id: "grammar",
        title: "Grammar",
        duration: "15 min",
        description: "Study today's grammar topic.",
        icon: SpellCheck,
    },
    {
        id: "listening",
        title: "Listening",
        duration: "15 min",
        description: "Listen, understand, check and repeat.",
        icon: Headphones,
    },
    {
        id: "speaking",
        title: "Speaking",
        duration: "15 min",
        description: "Practice speaking English.",
        icon: Mic,
    },
]

export default function Dashboard() {

    const completedActivities = 0
    const totalActivities = activities.length

    const progress =
        (completedActivities / totalActivities) * 100

    return (
        <main className="min-h-screen bg-[#151515] text-[#E7E5E1]">

            <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">

                {/* Welcome */}
                <header>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Good morning, João!
                    </h1>

                    <p className="mt-2 text-[#999994]">
                        Ready for today's English?
                    </p>
                </header>


                {/* Daily statistics */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5"
                        >
                            <p className="text-sm text-[#999994]">
                                {stat.label}
                            </p>

                            <strong className="mt-1 block text-2xl font-semibold">
                                {stat.value}
                            </strong>
                        </div>
                    ))}

                </section>


                {/* Today's Goal */}
                <section>

                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Today's Goal
                            </h2>

                            <p className="mt-1 text-sm text-[#999994]">
                                Complete your daily English activities.
                            </p>
                        </div>

                        <span className="text-sm font-semibold text-[#C96B62]">
                            {progress}%
                        </span>
                    </div>


                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                        <div className="h-2 overflow-hidden rounded-full bg-[#2B2B2B]">

                            <div
                                className="h-full rounded-full bg-[#B85C55] transition-all duration-300"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>


                        <div className="mt-3 flex justify-between text-sm">

                            <span className="text-[#999994]">
                                {completedActivities} of {totalActivities} activities completed
                            </span>

                            <span className="text-[#999994]">
                                Daily goal
                            </span>

                        </div>

                    </div>

                </section>


                {/* Today's Study */}
                <section>

                    <div className="mb-5">
                        <h2 className="text-xl font-semibold">
                            Today's Study
                        </h2>

                        <p className="mt-1 text-sm text-[#999994]">
                            Your four daily English practices.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {activities.map((activity) => {

                            const Icon = activity.icon

                            return (
                                <div
                                    key={activity.id}
                                    className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6 transition-colors hover:border-[#B85C55]"
                                >

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2A2020]">
                                            <Icon
                                                size={20}
                                                strokeWidth={1.8}
                                                className="text-[#C96B62]"
                                            />
                                        </div>

                                        <span className="text-sm text-[#999994]">
                                            {activity.duration}
                                        </span>

                                    </div>


                                    <h3 className="mt-5 font-semibold">
                                        {activity.title}
                                    </h3>


                                    <p className="mt-1 text-sm leading-relaxed text-[#999994]">
                                        {activity.description}
                                    </p>


                                    <div className="mt-5 flex items-center justify-between">

                                        <span className="text-xs text-[#777770]">
                                            Daily practice
                                        </span>

                                        <span className="text-sm font-medium text-[#C96B62]">
                                            Start
                                        </span>

                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </section>

            </section>

        </main>
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