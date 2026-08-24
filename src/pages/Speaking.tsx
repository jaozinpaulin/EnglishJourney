import { useState } from "react"
import { ArrowRight, Bot, CheckCircle2, ChevronRight, Flame, Mic, Play, RefreshCw, Sparkles, Square, Volume2, Waves, Zap } from "lucide-react"

interface Scenario {
    id: string
    title: string
    role: string
    level: string
    duration: string
    accuracy: number
    completed: boolean
}

const scenarios: Scenario[] = [
    { id: "s1", title: "Job Interview: Tell Me About Yourself", role: "Candidate", level: "B1", duration: "3 min", accuracy: 88, completed: true },
    { id: "s2", title: "Reporting a Bug in Daily Standup", role: "Frontend Dev", level: "A2", duration: "2 min", accuracy: 74, completed: false },
    { id: "s3", title: "Negotiating Deadlines with PM", role: "Team Lead", level: "B2", duration: "4 min", accuracy: 0, completed: false },
    { id: "s4", title: "Ordering Food & Special Dietary Requests", role: "Customer", level: "A1", duration: "2 min", accuracy: 0, completed: false },
]

export default function Speaking() {
    const [isRecording, setIsRecording] = useState(false)
    const [recorded, setRecorded] = useState(true)

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Fluency & Pronunciation</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Speaking Lab</h1>
                    <p className="mt-1 text-sm text-[#999994]">Sharpen your accent, train phonetic muscle memory and practice live dialogues.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <Mic size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">42 min</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">talk time</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Zap size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">118 WPM</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">speech pace</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Flame size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">86%</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">pronunciation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* gravador e analisador fonetico */}
            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className={`flex h-2 w-2 rounded-full ${isRecording ? "animate-pulse bg-red-500" : "bg-[#62C99B]"}`} />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                            {isRecording ? "Recording Live..." : "AI Pronunciation Coach"}
                        </span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">B1 Target</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button type="button" className="flex items-center gap-1.5 rounded-lg border border-[#2B2B2B] bg-[#171717] px-3 py-1 font-mono text-[11px] text-[#999994] transition-colors hover:text-white">
                            <Volume2 size={13} /> Hear Native Speaker
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-[#C96B62]">Sentence Practice</span>
                        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                            "I'm responsible for optimizing frontend performance and bundle size."
                        </h2>
                        <p className="font-mono text-xs text-[#777770]">/aɪm rɪˈspɑːn.sə.bəl fɔːr ˈɑːp.tə.maɪ.zɪŋ ˈfrʌnt.end pɚˈfɔːr.məns/</p>
                    </div>

                    {/* feedback fonetico palavra por palavra */}
                    {recorded && (
                        <div className="mt-5 rounded-xl border border-[#262626] bg-[#151515] p-4">
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">Speech Accuracy Breakdown</span>
                            <div className="mt-2.5 flex flex-wrap gap-2 text-sm font-medium">
                                <span className="rounded-md border border-[#1F2B26] bg-[#14211B] px-2 py-1 font-mono text-[#62C99B]">I'm (98%)</span>
                                <span className="rounded-md border border-[#1F2B26] bg-[#14211B] px-2 py-1 font-mono text-[#62C99B]">responsible (92%)</span>
                                <span className="rounded-md border border-[#1F2B26] bg-[#14211B] px-2 py-1 font-mono text-[#62C99B]">for (95%)</span>
                                <span className="rounded-md border border-[#3A2222] bg-[#221717] px-2 py-1 font-mono text-[#C96B62]">optimizing (64%)</span>
                                <span className="rounded-md border border-[#1F2B26] bg-[#14211B] px-2 py-1 font-mono text-[#62C99B]">frontend (90%)</span>
                                <span className="rounded-md border border-[#1F2B26] bg-[#14211B] px-2 py-1 font-mono text-[#62C99B]">performance (88%)</span>
                            </div>
                            <p className="mt-3 text-xs text-[#999994]">
                                💡 <strong className="text-white">Tip:</strong> Stress the first syllable on <span className="font-mono text-[#C96B62]">OP-ti-mi-zing</span> rather than the third.
                            </p>
                        </div>
                    )}

                    {/* microfone / controles de gravacao */}
                    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-4 sm:flex-row">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsRecording(!isRecording)}
                                className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform active:scale-95 ${isRecording ? "bg-red-600 text-white animate-pulse" : "bg-[#C96B62] text-white hover:bg-[#B85C55]"
                                    }`}
                            >
                                {isRecording ? <Square size={18} fill="currentColor" /> : <Mic size={20} />}
                            </button>
                            <div>
                                <span className="block text-xs font-semibold text-white">
                                    {isRecording ? "Listening... Speak naturally" : "Click to start recording"}
                                </span>
                                <span className="font-mono text-[11px] text-[#777770]">AI provides instant tone & phonetic feedback</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button type="button" className="flex items-center gap-1.5 rounded-lg border border-[#2B2B2B] bg-[#222] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2A2A2A]">
                                <Play size={13} fill="currentColor" /> Play Your Voice
                            </button>
                            <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#222] text-[#999994] transition-colors hover:text-white">
                                <RefreshCw size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                {/* roleplay scenarios */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Conversation Roleplays</h2>
                        <span className="font-mono text-xs text-[#777770]">AI Interactive Partner</span>
                    </div>

                    <div className="space-y-3">
                        {scenarios.map((sc) => (
                            <div
                                key={sc.id}
                                className={`rounded-2xl border p-4.5 transition-all hover:border-[#3A3A3A] ${sc.completed ? "border-[#2B2B2B] bg-[#1D1D1D]" : "border-[#262626] bg-[#1A1A1A]"
                                    }`}
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62]">
                                            <Bot size={18} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-[#292929] px-1.5 py-0.2 font-mono text-[9px] text-[#A78BC7]">{sc.level}</span>
                                                <span className="text-[11px] text-[#777770]">Role: {sc.role}</span>
                                            </div>
                                            <h3 className="mt-1 text-sm font-semibold text-white">{sc.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 border-t border-[#242424] pt-2 sm:border-0 sm:pt-0">
                                        <div className="text-left sm:text-right">
                                            <span className="block font-mono text-xs text-[#999994]">{sc.duration}</span>
                                            {sc.completed && (
                                                <span className="font-mono text-[10px] text-[#62C99B]">{sc.accuracy}% Fluency</span>
                                            )}
                                        </div>
                                        <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                                            {sc.completed ? "Retry" : "Start"} <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    {/* tongue twister do dia */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Vocal Warmup</p>
                            <Waves size={16} className="text-[#C96B62]" />
                        </div>
                        <p className="mt-1 text-xs text-[#999994]">Daily tongue twister for speech clarity:</p>

                        <div className="mt-3 rounded-xl border border-[#262626] bg-[#171717] p-3.5">
                            <p className="text-xs italic text-[#E7E5E1]">
                                "Red leather, yellow leather, red leather, yellow leather."
                            </p>
                            <span className="mt-2 block font-mono text-[10px] text-[#777770]">Target sound: /l/ & /r/ distinction</span>
                        </div>

                        <button type="button" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#C96B62] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                            <Mic size={13} /> Record Warmup
                        </button>
                    </div>

                    {/* metricas de fala */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">Fluency Radar</h2>
                            <Sparkles size={15} className="text-[#777770]" />
                        </div>

                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Phonetic Accuracy</span>
                                    <span className="font-mono text-[#62C99B]">88%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#62C99B]" style={{ width: "88%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Speech Rhythm & Pace</span>
                                    <span className="font-mono text-[#C96B62]">70%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "70%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Sentence Stress</span>
                                    <span className="font-mono text-[#A78BC7]">62%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#A78BC7]" style={{ width: "62%" }} />
                                </div>
                            </div>
                        </div>

                        <button type="button" className="mt-5 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                            View Accent Report <ArrowRight size={13} />
                        </button>
                    </div>

                    {/* dica de pronuncia com ia */}
                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Sparkles size={16} />
                            <span className="text-xs font-semibold">Mouth Positioning</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            For the <code className="font-mono text-white">/θ/</code> sound in <em>"Think"</em>, place the tip of your tongue gently between your front teeth and blow air without voicing.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    )
}

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