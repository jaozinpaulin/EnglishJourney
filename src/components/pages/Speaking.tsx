interface SpeakingActivity {
    id: string
    title: string
    description: string
    level: "Beginner" | "Intermediate" | "Advanced"
    duration: string
}

const DAILY_SPEAKING_GOAL = 15

const speakingActivities: SpeakingActivity[] = [
    {
        id: "1",
        title: "Introduce Yourself",
        description: "Talk about yourself and introduce who you are.",
        level: "Beginner",
        duration: "30 sec",
    },
    {
        id: "2",
        title: "Daily Routine",
        description: "Talk about what you usually do during your day.",
        level: "Beginner",
        duration: "1 min",
    },
    {
        id: "3",
        title: "My Hobbies",
        description: "Talk about your hobbies and things you enjoy.",
        level: "Beginner",
        duration: "2 min",
    },
    {
        id: "4",
        title: "My Work",
        description: "Talk about your work and your daily responsibilities.",
        level: "Intermediate",
        duration: "2 min",
    },
    {
        id: "5",
        title: "My Future Goals",
        description: "Talk about your plans and goals for the future.",
        level: "Intermediate",
        duration: "5 min",
    },
    {
        id: "6",
        title: "Free Conversation",
        description: "Speak freely about a topic of your choice.",
        level: "Advanced",
        duration: "5 min",
    },
]

function Speaking() {
    return (
        <section className="mx-auto max-w-6xl">

            {/* Page header */}
            <div>
                <h1 className="text-3xl font-bold text-[#E7E5E1]">
                    Speaking
                </h1>

                <p className="mt-2 text-[#999994]">
                    Practice speaking English and build your confidence.
                </p>
            </div>

            {/* Today's speaking */}
            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#E7E5E1]">
                            Today's Speaking
                        </h2>

                        <p className="mt-1 text-sm text-[#999994]">
                            Speak for {DAILY_SPEAKING_GOAL} minutes today.
                        </p>
                    </div>

                    <span className="text-sm font-medium text-[#C96B62]">
                        0 / {DAILY_SPEAKING_GOAL} min
                    </span>
                </div>

                {/* Progress */}
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#2B2B2B]">
                    <div className="h-full w-0 rounded-full bg-[#B85C55]" />
                </div>
            </div>

            {/* Speaking activities */}
            <div className="mt-10">

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-[#E7E5E1]">
                        Speaking Practice
                    </h2>

                    <p className="mt-1 text-sm text-[#999994]">
                        Choose a topic and practice speaking in English.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {speakingActivities.map((activity) => (
                        <article
                            key={activity.id}
                            className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 transition-colors hover:border-[#B85C55]"
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <h3 className="text-lg font-semibold text-[#E7E5E1]">
                                        {activity.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-[#999994]">
                                        {activity.description}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-[#2A2020] px-2.5 py-1 text-xs font-medium text-[#C96B62]">
                                    {activity.level}
                                </span>

                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-[#2B2B2B] pt-4">

                                <span className="text-sm text-[#999994]">
                                    {activity.duration}
                                </span>

                                <button
                                    type="button"
                                    className="rounded-lg bg-[#B85C55] px-4 py-2 text-sm font-medium text-[#F3F1ED] transition-colors hover:bg-[#C96B62]"
                                >
                                    Start
                                </button>

                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Weekly speaking */}
            <div className="mt-10 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div>
                    <h2 className="text-xl font-semibold text-[#E7E5E1]">
                        Weekly Speaking
                    </h2>

                    <p className="mt-1 text-sm text-[#999994]">
                        Build your speaking confidence week by week.
                    </p>
                </div>

                <div className="mt-6 space-y-3">

                    <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <div>
                            <p className="text-sm font-medium text-[#E7E5E1]">
                                Week 1
                            </p>

                            <p className="mt-1 text-sm text-[#999994]">
                                Introduce yourself
                            </p>
                        </div>

                        <span className="text-sm text-[#777770]">
                            Pending
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <div>
                            <p className="text-sm font-medium text-[#E7E5E1]">
                                Week 2
                            </p>

                            <p className="mt-1 text-sm text-[#999994]">
                                Talk about your daily routine
                            </p>
                        </div>

                        <span className="text-sm text-[#777770]">
                            Pending
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <div>
                            <p className="text-sm font-medium text-[#E7E5E1]">
                                Week 3
                            </p>

                            <p className="mt-1 text-sm text-[#999994]">
                                Talk about your work
                            </p>
                        </div>

                        <span className="text-sm text-[#777770]">
                            Pending
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#151515] p-4">
                        <div>
                            <p className="text-sm font-medium text-[#E7E5E1]">
                                Week 4
                            </p>

                            <p className="mt-1 text-sm text-[#999994]">
                                Talk about your hobbies
                            </p>
                        </div>

                        <span className="text-sm text-[#777770]">
                            Pending
                        </span>
                    </div>

                </div>
            </div>

            {/* Speaking progress */}
            <div className="mt-10 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <h2 className="text-xl font-semibold text-[#E7E5E1]">
                    Your Speaking Progress
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-5">
                        <p className="text-sm text-[#999994]">
                            Speaking time
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#E7E5E1]">
                            0 min
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-5">
                        <p className="text-sm text-[#999994]">
                            Sessions
                        </p>

                        <p className="mt-2 text-2xl font-bold text-[#E7E5E1]">
                            0
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B2B] bg-[#151515] p-5">
                        <p className="text-sm text-[#999994]">
                            Weekly recordings
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

export default Speaking


/*
    FUTURE SPEAKING IDEAS
    ----------------------

    PURPOSE:
    - Speaking is the main area for practicing active English production.
    - The goal is to make the user speak regularly and build confidence.
    - Track speaking sessions and long-term speaking evolution.

    CURRENT BASE:
    - Today's Speaking
    - Daily speaking goal
    - Speaking progress
    - Speaking activities
    - Weekly Speaking
    - Speaking statistics

    SPEAKING PROGRESSION:
    - 30 seconds
    - 1 minute
    - 2 minutes
    - 5 minutes
    - Spontaneous conversations

    SPEAKING ACTIVITIES:
    - Introduce Yourself
    - Daily Routine
    - My Hobbies
    - My Work
    - My Future Goals
    - Free Conversation

    FUTURE ACTIVITY TYPES:
    - Guided speaking
    - Free speaking
    - Question and answer
    - Describe an image
    - Tell a story
    - Talk about daily life
    - Talk about work
    - Talk about programming
    - Talk about games
    - Talk about travel
    - Talk about Canada
    - Real-life situations

    WEEKLY SPEAKING:
    - Week 1: Introduce yourself
    - Week 2: Talk about your daily routine
    - Week 3: Talk about your work
    - Week 4: Talk about your hobbies
    - Gradually increase difficulty and speaking time.

    FUTURE SPEAKING SESSION:
    Speaking
        ↓
    Select activity
        ↓
    Speaking Session
        ↓
    Read the topic / instructions
        ↓
    Start recording
        ↓
    Speak
        ↓
    Stop recording
        ↓
    Save session
        ↓
    Transcript
        ↓
    Feedback
        ↓
    Progress

    RECORDING:
    - Start recording
    - Stop recording
    - Pause recording
    - Resume recording
    - Show recording duration
    - Save recording
    - Replay recording
    - Delete recording
    - Keep recording history

    BROWSER AUDIO:
    - Use the browser microphone API.
    - Request microphone permission.
    - Handle permission errors.
    - Record audio in the browser.
    - Store or upload recordings securely.

    SPEAKING SESSION DATA:
    - Duration
    - Date
    - Activity
    - Audio recording
    - Transcript
    - Number of words
    - New vocabulary
    - Grammar mistakes
    - Feedback
    - Speaking score

    TRANSCRIPTION:
    - Convert recorded speech into text.
    - Show the transcript after the session.
    - Compare what was spoken with expected structures when applicable.
    - Use transcription as the base for AI analysis.

    AI FEEDBACK:
    - Analyze the user's transcript.
    - Identify grammar mistakes.
    - Suggest better sentence structures.
    - Identify vocabulary mistakes.
    - Suggest new vocabulary.
    - Explain mistakes.
    - Suggest more natural expressions.
    - Give personalized feedback.

    IMPORTANT:
    - The AI should explain mistakes instead of simply correcting everything.
    - The objective is learning, not just producing a perfect sentence.

    FUTURE SPEAKING METRICS:
    - Speaking time
    - Sessions completed
    - Words spoken
    - Vocabulary variety
    - Grammar accuracy
    - Fluency
    - Pronunciation
    - Confidence
    - Average session duration

    SPEAKING EVOLUTION:
    Example:

    Week 1
    30 seconds
        ↓
    Week 2
    1 minute
        ↓
    Week 3
    2 minutes
        ↓
    Week 4
    5 minutes

    Track the user's speaking evolution over time.

    SPEAKING + GRAMMAR:
    - Detect recurring grammar mistakes.
    - Send difficult grammar topics to Grammar.
    - Recommend grammar exercises based on speaking mistakes.

    Example:
    Speaking
        ↓
    User frequently makes mistakes with past tense
        ↓
    Grammar recommendation
        ↓
    Practice Simple Past

    SPEAKING + VOCABULARY:
    - Detect new words used during speaking.
    - Suggest useful vocabulary.
    - Allow the user to save words to Vocabulary.
    - Track vocabulary learned through speaking.

    SPEAKING + LISTENING:
    - Listen to a sentence.
    - Repeat the sentence.
    - Record the user's voice.
    - Practice pronunciation.
    - Use shadowing exercises.

    CONVERSATION MODE:
    - AI asks a question.
    - User answers.
    - AI continues the conversation.
    - Questions adapt to the user's answers.
    - Gradually reduce Portuguese assistance.
    - Progress from Portuguese → English.
    - Eventually English → English.

    CONVERSATION DIFFICULTY:
    Beginner
        ↓
    Simple questions
        ↓
    Longer answers
        ↓
    Follow-up questions
        ↓
    Spontaneous conversation

    REAL-LIFE SPEAKING:
    - Job interview
    - Ordering food
    - Traveling
    - Meeting someone
    - Talking about hobbies
    - Talking about work
    - Talking about programming
    - Talking about games
    - Talking about future plans
    - Everyday conversations

    DAILY STUDY:
    - Daily speaking goal
    - Track speaking time
    - Track completed sessions
    - Maintain speaking history
    - Connect with the English Journey daily routine.

    USER DATA / FUTURE LOGIN:
    - Save speaking sessions per user.
    - Save recordings.
    - Save transcripts.
    - Save feedback.
    - Save speaking statistics.
    - Save progress.
    - Save weekly speaking history.

    FIREBASE / FIRESTORE:
    - Store speaking session metadata.
    - Store progress.
    - Store transcripts.
    - Store user statistics.
    - Store recording references securely.

    STORAGE:
    - Audio files should not necessarily be stored directly inside Firestore.
    - Use appropriate file storage for recordings.
    - Store the recording reference and metadata in Firestore.

    PROGRESS PAGE:
    - Send speaking statistics to the global Progress page.
    - Total speaking time.
    - Sessions completed.
    - Weekly recordings.
    - Speaking evolution.
    - Average speaking score.
    - Grammar accuracy.
    - Vocabulary growth.

    FUTURE PERSONALIZATION:
    - Recommend activities based on the user's level.
    - Increase speaking duration gradually.
    - Recommend topics based on interests.
    - Detect recurring weaknesses.
    - Create personalized speaking challenges.

    LONG-TERM IDEA:
    - Transform Speaking into a complete speaking practice system.
    - Combine recording, transcription, AI feedback, grammar,
      vocabulary, listening and conversation.

    IMPORTANT ARCHITECTURE:
    - Speaking.tsx
        → Speaking dashboard
        → Activities
        → Daily goal
        → Weekly Speaking
        → Progress summary

    - SpeakingSession.tsx
        → Activity instructions
        → Recording
        → Timer
        → Transcript
        → Feedback
        → Session result

    - Future AI service
        → Transcription
        → Grammar analysis
        → Vocabulary analysis
        → Fluency feedback
        → Personalized recommendations
*/