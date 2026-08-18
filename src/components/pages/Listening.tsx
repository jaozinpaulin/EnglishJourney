interface ListeningLesson {
    id: string
    title: string
    description: string
    level: "Beginner" | "Intermediate" | "Advanced"
    duration: string
}

const DAILY_LISTENING_GOAL = 15

const listeningLessons: ListeningLesson[] = [
    {
        id: "1",
        title: "Daily Conversation",
        description: "A short conversation about everyday life.",
        level: "Beginner",
        duration: "05:32",
    },
    {
        id: "2",
        title: "A Morning Routine",
        description: "Listen to a simple story about a daily routine.",
        level: "Beginner",
        duration: "04:18",
    },
    {
        id: "3",
        title: "Talking About Hobbies",
        description: "A conversation about hobbies and free time.",
        level: "Intermediate",
        duration: "08:45",
    },
    {
        id: "4",
        title: "Travel Conversation",
        description: "Useful English for everyday travel situations.",
        level: "Intermediate",
        duration: "07:20",
    },
    {
        id: "5",
        title: "English Podcast",
        description: "A longer conversation about learning English.",
        level: "Advanced",
        duration: "12:45",
    },
    {
        id: "6",
        title: "Short Story",
        description: "Improve your listening with a short English story.",
        level: "Beginner",
        duration: "06:10",
    },
]

function Listening() {
    return (
        <section className="mx-auto max-w-6xl">

            {/* Page header */}
            <div>
                <h1 className="text-3xl font-bold text-[#E7E5E1]">
                    Listening
                </h1>

                <p className="mt-2 text-[#999994]">
                    Improve your listening skills with English content.
                </p>
            </div>

            {/* Today's listening */}
            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#E7E5E1]">
                            Today's Listening
                        </h2>

                        <p className="mt-1 text-sm text-[#999994]">
                            {DAILY_LISTENING_GOAL} minutes of listening practice today.
                        </p>
                    </div>

                    <span className="text-sm font-medium text-[#C96B62]">
                        0 / {DAILY_LISTENING_GOAL} min
                    </span>
                </div>

                {/* Progress */}
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#2B2B2B]">
                    <div className="h-full w-0 rounded-full bg-[#B85C55]" />
                </div>
            </div>

            {/* Listening practice */}
            <div className="mt-10">

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-[#E7E5E1]">
                        Listening Practice
                    </h2>

                    <p className="mt-1 text-sm text-[#999994]">
                        Choose something to listen to and practice your English.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {listeningLessons.map((lesson) => (
                        <article
                            key={lesson.id}
                            className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 transition-colors hover:border-[#B85C55]"
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <h3 className="text-lg font-semibold text-[#E7E5E1]">
                                        {lesson.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-[#999994]">
                                        {lesson.description}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-[#2A2020] px-2.5 py-1 text-xs font-medium text-[#C96B62]">
                                    {lesson.level}
                                </span>

                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-[#2B2B2B] pt-4">

                                <span className="text-sm text-[#999994]">
                                    {lesson.duration}
                                </span>

                                <button
                                    type="button"
                                    className="rounded-lg bg-[#B85C55] px-4 py-2 text-sm font-medium text-[#F3F1ED] transition-colors hover:bg-[#C96B62]"
                                >
                                    Listen
                                </button>

                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Listening progress */}
            <div className="mt-10 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <h2 className="text-xl font-semibold text-[#E7E5E1]">
                    Your Listening Progress
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-5">
                        <p className="text-sm text-[#999994]">
                            Minutes listened
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#E7E5E1]">
                            42
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-5">
                        <p className="text-sm text-[#999994]">
                            Sessions completed
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#E7E5E1]">
                            8
                        </p>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Listening


/*
    FUTURE LISTENING IDEAS
    -----------------------

    PURPOSE:
    - Listening is the main area for developing English listening comprehension.
    - The goal is not only to listen, but to understand, practice and interact
      with the content.

    CURRENT BASE:
    - Today's Listening
    - Daily listening goal
    - Listening progress
    - Listening lessons
    - Difficulty levels
    - Lesson duration
    - Listening statistics

    LISTENING CONTENT:
    - Daily conversations
    - Short stories
    - Dialogues
    - Podcasts
    - Music
    - Videos
    - Real-life situations
    - Content related to the user's interests

    CONTENT LEVELS:
    - Beginner
    - Intermediate
    - Advanced

    FUTURE LISTENING LESSON:
    Listening
        ↓
    Select lesson
        ↓
    Listening Lesson page
        ↓
    Audio / Video
        ↓
    Questions
        ↓
    Transcript
        ↓
    Vocabulary
        ↓
    Results
        ↓
    Progress

    LISTENING PLAYER:
    - Play / Pause
    - Progress bar
    - Current time
    - Total duration
    - Volume control
    - Skip backward
    - Skip forward
    - Playback speed
    - Replay section
    - Audio support
    - Video support

    COPYRIGHT / CONTENT:
    - Prefer original content.
    - Use content with appropriate licenses.
    - Use public domain content when possible.
    - Use external platforms only when embedding/use is permitted.
    - Avoid downloading or redistributing copyrighted content without permission.

    LISTENING METHOD:
    1. Listen to the content.
    2. Try to understand without help.
    3. Answer comprehension questions.
    4. Check the transcript.
    5. Listen again.
    6. Repeat important sentences.
    7. Review new vocabulary.

    QUESTIONS:
    - Multiple choice
    - True / False
    - Fill in the blanks
    - Complete the sentence
    - Listening comprehension
    - Detail questions
    - Vocabulary questions
    - Short written answers

    QUESTION DIFFICULTY:
    - Start with simple comprehension questions.
    - Gradually increase difficulty.
    - Adapt questions according to the user's level.

    TRANSCRIPT:
    - Show transcript after the first listening attempt.
    - Allow the user to compare what they heard with the actual sentence.
    - Highlight useful expressions.
    - Highlight difficult vocabulary.
    - Allow selected words to be added to Vocabulary.

    VOCABULARY INTEGRATION:
    Listening
        ↓
    New word
        ↓
    Word explanation
        ↓
    Example
        ↓
    Add to Vocabulary

    Example:
    "I usually commute to work."

    User selects "commute"
        ↓
    Definition
        ↓
    Pronunciation
        ↓
    Example sentence
        ↓
    Add to vocabulary

    SPEAKING INTEGRATION:
    - Repeat sentences from the listening.
    - Practice pronunciation.
    - Shadowing exercises.
    - Record the user's voice.
    - Compare pronunciation in future versions.

    AI FUTURE:
    - Generate comprehension questions from the lesson.
    - Adapt questions to the user's level.
    - Explain difficult expressions.
    - Identify important vocabulary.
    - Generate additional exercises.
    - Evaluate written answers.
    - Give personalized feedback.
    - Recommend lessons based on performance.

    FUTURE AI FLOW:
    Listening content
        ↓
    Transcript
        ↓
    AI analysis
        ↓
    Questions
        ↓
    User answers
        ↓
    AI evaluation
        ↓
    Feedback
        ↓
    Personalized progress

    PROGRESS:
    - Minutes listened
    - Sessions completed
    - Lessons completed
    - Questions answered
    - Listening accuracy
    - Comprehension score
    - Vocabulary learned through listening
    - Listening history

    DAILY STUDY:
    - Daily listening goal
    - Track minutes listened today
    - Track completed sessions
    - Maintain listening history
    - Connect with the daily study routine

    FUTURE SMART RECOMMENDATIONS:
    - Recommend easier content when comprehension is low.
    - Recommend harder content when performance improves.
    - Recommend content based on interests.
    - Recommend lessons based on mistakes.
    - Recommend vocabulary review from previous listening sessions.

    PAGE STRUCTURE:
    - Listening.tsx
        → Listening library
        → Available lessons
        → Daily goal
        → Listening statistics

    - ListeningLesson.tsx
        → Audio / Video player
        → Questions
        → Transcript
        → Vocabulary
        → Results

    IMPORTANT ARCHITECTURE:
    - Listening.tsx should focus on selecting and organizing lessons.
    - ListeningLesson.tsx should focus on the actual learning experience.

    FUTURE DATA / USER LOGIN:
    - Save listening history per user.
    - Save completed lessons.
    - Save answers.
    - Save comprehension scores.
    - Save listening time.
    - Save vocabulary discovered through listening.
    - Save progress in Firestore.

    PROGRESS PAGE:
    - Send listening statistics to the global Progress page.
    - Total listening time.
    - Sessions completed.
    - Lessons completed.
    - Average comprehension.
    - Listening evolution over time.

    LONG-TERM IDEA:
    - Transform Listening from a simple content library into an
      interactive listening training system.
*/