interface ProgressSummary {
    title: string
    value: string
    description: string
}

interface WeeklyActivity {
    day: string
    completed: boolean
}

const progressSummary: ProgressSummary[] = [
    {
        title: "Vocabulary",
        value: "128 words",
        description: "Words learned",
    },
    {
        title: "Grammar",
        value: "82%",
        description: "Accuracy",
    },
    {
        title: "Listening",
        value: "42 min",
        description: "Listening time",
    },
    {
        title: "Speaking",
        value: "18 min",
        description: "Speaking time",
    },
]

const weeklyActivity: WeeklyActivity[] = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: true },
    { day: "Fri", completed: true },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
]

function Progress() {
    return (
        <section className="mx-auto max-w-6xl">

            {/* Page header */}
            <div>
                <h1 className="text-3xl font-bold text-[#E7E5E1]">
                    Progress
                </h1>

                <p className="mt-2 text-[#999994]">
                    Track your English learning progress and see your improvement over time.
                </p>
            </div>

            {/* Main progress summary */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {progressSummary.map((item) => (
                    <article
                        key={item.title}
                        className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5"
                    >
                        <p className="text-sm text-[#999994]">
                            {item.title}
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#E7E5E1]">
                            {item.value}
                        </p>

                        <p className="mt-1 text-xs text-[#777770]">
                            {item.description}
                        </p>
                    </article>
                ))}

            </div>

            {/* Overall progress */}
            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#E7E5E1]">
                            Overall Progress
                        </h2>

                        <p className="mt-1 text-sm text-[#999994]">
                            Your general learning consistency.
                        </p>
                    </div>

                    <span className="text-lg font-semibold text-[#C96B62]">
                        68%
                    </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#2B2B2B]">
                    <div className="h-full w-[68%] rounded-full bg-[#B85C55]" />
                </div>

            </div>

            {/* Weekly activity */}
            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div>
                    <h2 className="text-xl font-semibold text-[#E7E5E1]">
                        This Week
                    </h2>

                    <p className="mt-1 text-sm text-[#999994]">
                        Keep your daily learning routine consistent.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-7 gap-2">

                    {weeklyActivity.map((day) => (
                        <div
                            key={day.day}
                            className="flex flex-col items-center gap-3"
                        >
                            <span className="text-xs text-[#777770]">
                                {day.day}
                            </span>

                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${day.completed
                                    ? "border-[#B85C55] bg-[#2A2020] text-[#C96B62]"
                                    : "border-[#2B2B2B] bg-[#151515] text-[#555550]"
                                    }`}
                            >
                                {day.completed ? "✓" : "—"}
                            </div>
                        </div>
                    ))}

                </div>

            </div>

            {/* Study statistics */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                    <h2 className="text-lg font-semibold text-[#E7E5E1]">
                        Study Time
                    </h2>

                    <p className="mt-4 text-3xl font-bold text-[#E7E5E1]">
                        1h 42min
                    </p>

                    <p className="mt-1 text-sm text-[#999994]">
                        Total study time
                    </p>

                </div>

                <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                    <h2 className="text-lg font-semibold text-[#E7E5E1]">
                        Activities
                    </h2>

                    <p className="mt-4 text-3xl font-bold text-[#E7E5E1]">
                        24
                    </p>

                    <p className="mt-1 text-sm text-[#999994]">
                        Activities completed
                    </p>

                </div>

            </div>

            {/* Speaking evolution */}
            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <h2 className="text-xl font-semibold text-[#E7E5E1]">
                    Speaking Evolution
                </h2>

                <p className="mt-1 text-sm text-[#999994]">
                    Gradually increase your speaking time.
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">

                    {["30 sec", "1 min", "2 min", "5 min"].map(
                        (duration, index) => (
                            <div
                                key={duration}
                                className="flex flex-1 flex-col items-center gap-3"
                            >
                                <div
                                    className={`h-3 w-full rounded-full ${index < 3
                                        ? "bg-[#B85C55]"
                                        : "bg-[#2B2B2B]"
                                        }`}
                                />

                                <span className="text-xs text-[#999994]">
                                    {duration}
                                </span>
                            </div>
                        )
                    )}

                </div>

            </div>

            {/* Achievements */}
            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <h2 className="text-xl font-semibold text-[#E7E5E1]">
                    Achievements
                </h2>

                <p className="mt-1 text-sm text-[#999994]">
                    Milestones from your English journey.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <p className="text-sm font-medium text-[#E7E5E1]">
                            7 Day Streak
                        </p>

                        <p className="mt-1 text-xs text-[#999994]">
                            Completed
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <p className="text-sm font-medium text-[#E7E5E1]">
                            100 Words
                        </p>

                        <p className="mt-1 text-xs text-[#999994]">
                            Completed
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <p className="text-sm font-medium text-[#E7E5E1]">
                            First Speaking
                        </p>

                        <p className="mt-1 text-xs text-[#999994]">
                            Completed
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <p className="text-sm font-medium text-[#777770]">
                            60 Min Listening
                        </p>

                        <p className="mt-1 text-xs text-[#555550]">
                            Locked
                        </p>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Progress


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