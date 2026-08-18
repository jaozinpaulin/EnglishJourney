interface GrammarTopic {
    id: string
    title: string
    description: string
    level: "Beginner" | "Intermediate" | "Advanced"
    progress: number
}

const DAILY_GRAMMAR_GOAL = 10

const grammarTopics: GrammarTopic[] = [
    {
        id: "1",
        title: "Verb to be",
        description: 'Practice "am", "is" and "are".',
        level: "Beginner",
        progress: 0,
    },
    {
        id: "2",
        title: "Pronouns",
        description: "Learn subject and object pronouns.",
        level: "Beginner",
        progress: 0,
    },
    {
        id: "3",
        title: "Articles",
        description: 'Practice "a", "an" and "the".',
        level: "Beginner",
        progress: 0,
    },
    {
        id: "4",
        title: "Possessives",
        description: "Learn how to express possession.",
        level: "Beginner",
        progress: 0,
    },
    {
        id: "5",
        title: "Plural",
        description: "Learn how to form plural nouns.",
        level: "Beginner",
        progress: 0,
    },
    {
        id: "6",
        title: "Simple Questions",
        description: "Practice basic questions in English.",
        level: "Beginner",
        progress: 0,
    },
]


export default function Grammar() {
    return (
        <section className="mx-auto max-w-6xl">

            <div>
                <h1 className="text-3xl font-bold text-[#E7E5E1]">
                    Grammar
                </h1>

                <p className="mt-2 text-[#999994]">
                    Learn English grammar step by step.
                </p>
            </div>

            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#E7E5E1]">
                            Today's Grammar
                        </h2>

                        <p className="mt-1 text-sm text-[#999994]">
                            Practice {DAILY_GRAMMAR_GOAL} exercises today.
                        </p>
                    </div>

                    <span className="text-sm font-medium text-[#C96B62]">
                        0 / {DAILY_GRAMMAR_GOAL} completed
                    </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#2B2B2B]">
                    <div className="h-full w-0 rounded-full bg-[#B85C55]" />
                </div>
            </div>

            <div className="mt-10">

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-[#E7E5E1]">
                        Grammar Topics
                    </h2>

                    <p className="mt-1 text-sm text-[#999994]">
                        Build your grammar foundation step by step.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {grammarTopics.map((topic) => (
                        <article
                            key={topic.id}
                            className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 transition-colors hover:border-[#B85C55]"
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <h3 className="text-lg font-semibold text-[#E7E5E1]">
                                        {topic.title}
                                    </h3>

                                    <p className="mt-1 text-sm leading-relaxed text-[#999994]">
                                        {topic.description}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-[#2A2020] px-2.5 py-1 text-xs font-medium text-[#C96B62]">
                                    {topic.level}
                                </span>

                            </div>

                            <div className="mt-5">

                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="text-[#777770]">
                                        Progress
                                    </span>

                                    <span className="text-[#999994]">
                                        {topic.progress}%
                                    </span>
                                </div>

                                <div className="h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div
                                        className="h-full rounded-full bg-[#B85C55]"
                                        style={{ width: `${topic.progress}%` }}
                                    />
                                </div>

                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="mt-10 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <h2 className="text-xl font-semibold text-[#E7E5E1]">
                    Your Grammar Progress
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-5">
                        <p className="text-sm text-[#999994]">
                            Topics studied
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#E7E5E1]">
                            0
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-5">
                        <p className="text-sm text-[#999994]">
                            Exercises completed
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#E7E5E1]">
                            0
                        </p>
                    </div>

                </div>
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