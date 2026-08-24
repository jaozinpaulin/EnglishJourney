import { useState } from "react"
import { ArrowRight, CheckCircle2, ChevronRight, Eye, EyeOff, FastForward, Headphones, Mic2, Pause, Play, Radio, RotateCcw, SlidersHorizontal, Sparkles, Volume2, Waves } from "lucide-react"

interface AudioEpisode {
    id: string
    title: string
    duration: string
    level: string
    accent: string
    category: string
    accuracy: number
    completed: boolean
}

const audioEpisodes: AudioEpisode[] = [
    { id: "a1", title: "Standup Meeting & Sprint Goals", duration: "3:40 min", level: "B1", accent: "US", category: "Tech & Work", accuracy: 92, completed: true },
    { id: "a2", title: "Ordering Coffee in London", duration: "2:15 min", level: "A2", accent: "UK", category: "Daily Life", accuracy: 78, completed: false },
    { id: "a3", title: "Booking an Airbnb in Sydney", duration: "4:10 min", level: "B1", accent: "AUS", category: "Travel", accuracy: 0, completed: false },
    { id: "a4", title: "Debating AI in Frontend Tools", duration: "5:30 min", level: "B2", accent: "US", category: "Podcast", accuracy: 0, completed: false },
]

export default function Listening() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState("1.0x")
    const [hideTranscript, setHideTranscript] = useState(false)
    const [selectedAccent, setSelectedAccent] = useState("US")

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Audio & Comprehension</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Listening Lab</h1>
                    <p className="mt-1 text-sm text-[#999994]">Train your ear to natural cadences, native accents and live dialogues.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <Headphones size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">1h 45m</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">total listened</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Waves size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">88%</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">ear accuracy</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Radio size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">3 Accents</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">practiced</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* audio player principal */}
            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                {/* barra superior do player */}
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-2 w-2 rounded-full bg-[#62C99B]" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">Now Playing • Episode #08</span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">B1 Intermediate</span>
                    </div>

                    {/* controles de velocidade e sotaque */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex rounded-lg border border-[#2B2B2B] bg-[#171717] p-1">
                            {["US", "UK", "AUS"].map((acc) => (
                                <button
                                    key={acc}
                                    type="button"
                                    onClick={() => setSelectedAccent(acc)}
                                    className={`rounded-md px-2.5 py-0.5 font-mono text-[10px] transition-all ${selectedAccent === acc ? "bg-[#292929] text-white" : "text-[#777770] hover:text-white"
                                        }`}
                                >
                                    {acc}
                                </button>
                            ))}
                        </div>

                        <div className="flex rounded-lg border border-[#2B2B2B] bg-[#171717] p-1">
                            {["0.75x", "1.0x", "1.25x"].map((speed) => (
                                <button
                                    key={speed}
                                    type="button"
                                    onClick={() => setPlaybackSpeed(speed)}
                                    className={`rounded-md px-2.5 py-0.5 font-mono text-[10px] transition-all ${playbackSpeed === speed ? "bg-[#C96B62] text-white" : "text-[#777770] hover:text-white"
                                        }`}
                                >
                                    {speed}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        {/* info do audio */}
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-[#C96B62]">Tech & Workplace Dialogue</span>
                            <h2 className="text-2xl font-bold tracking-tight text-white">Standup Meeting & Sprint Goals</h2>
                            <p className="text-xs text-[#999994]">Listen to a team discussing task blockers and API integrations.</p>
                        </div>

                        {/* player controls */}
                        <div className="flex items-center gap-3">
                            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] text-[#999994] transition-colors hover:text-white">
                                <RotateCcw size={15} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C96B62] text-white shadow-lg transition-transform active:scale-95 hover:bg-[#B85C55]"
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
                            </button>
                            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] text-[#999994] transition-colors hover:text-white">
                                <FastForward size={15} />
                            </button>
                        </div>
                    </div>

                    {/* waveform simulada */}
                    <div className="mt-6 rounded-xl border border-[#262626] bg-[#151515] p-4">
                        <div className="flex h-12 items-center justify-between gap-1">
                            {Array.from({ length: 48 }).map((_, i) => {
                                const height = Math.sin(i * 0.4) * 20 + 24
                                const isPassed = i < 20
                                return (
                                    <div
                                        key={i}
                                        style={{ height: `${height}px` }}
                                        className={`w-full rounded-full transition-colors ${isPassed ? "bg-[#C96B62]" : "bg-[#292929] hover:bg-[#3A3A3A]"
                                            }`}
                                    />
                                )
                            })}
                        </div>

                        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#777770]">
                            <span>01:14</span>
                            <span className="flex items-center gap-1"><Volume2 size={13} /> Natural Tempo ({playbackSpeed})</span>
                            <span>03:40</span>
                        </div>
                    </div>

                    {/* interactive transcript */}
                    <div className="mt-5 rounded-xl border border-[#2B2B2B] bg-[#191919] p-4">
                        <div className="flex items-center justify-between border-b border-[#242424] pb-2.5">
                            <span className="text-[11px] font-semibold text-[#999994]">Real-time Transcript Sync</span>
                            <button
                                type="button"
                                onClick={() => setHideTranscript(!hideTranscript)}
                                className="flex items-center gap-1.5 text-[11px] text-[#777770] hover:text-white"
                            >
                                {hideTranscript ? <Eye size={13} /> : <EyeOff size={13} />}
                                {hideTranscript ? "Reveal Text" : "Dictation Mode (Hide)"}
                            </button>
                        </div>

                        <div className="mt-3 leading-relaxed">
                            {hideTranscript ? (
                                <p className="font-mono text-xs italic text-[#555]">[Transcript blurred for comprehension challenge. Listen carefully!]</p>
                            ) : (
                                <p className="text-sm text-[#B7B7B2]">
                                    <span className="text-white">"Good morning everyone. Let's start our daily standup. </span>
                                    <span className="rounded bg-[#C96B62]/20 px-1 text-[#C96B62] font-medium">Are there any blockers on the checkout pipeline</span>
                                    <span className="text-[#888]"> before we trigger the deployment this afternoon?"</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Audio Library</h2>
                        <div className="flex items-center gap-2">
                            <span className="rounded-lg border border-[#2B2B2B] bg-[#171717] px-2.5 py-1 font-mono text-[11px] text-[#999994]">All Categories</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {audioEpisodes.map((ep) => (
                            <div
                                key={ep.id}
                                className={`rounded-2xl border p-4.5 transition-all hover:border-[#3A3A3A] ${ep.completed ? "border-[#2B2B2B] bg-[#1D1D1D]" : "border-[#282828] bg-[#1A1A1A]"
                                    }`}
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-3.5">
                                        <button
                                            type="button"
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62] transition-colors hover:bg-[#C96B62] hover:text-white"
                                        >
                                            <Play size={16} fill="currentColor" className="ml-0.5" />
                                        </button>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-[#292929] px-1.5 py-0.2 font-mono text-[9px] text-[#A78BC7]">{ep.accent}</span>
                                                <span className="rounded bg-[#242424] px-1.5 py-0.2 font-mono text-[9px] text-[#777770]">{ep.level}</span>
                                                <span className="text-[11px] text-[#777770]">{ep.category}</span>
                                            </div>
                                            <h3 className="mt-1 text-sm font-semibold text-white">{ep.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 border-t border-[#242424] pt-2 sm:border-0 sm:pt-0">
                                        <div className="text-left sm:text-right">
                                            <span className="block font-mono text-xs text-[#999994]">{ep.duration}</span>
                                            {ep.completed && (
                                                <span className="font-mono text-[10px] text-[#62C99B]">{ep.accuracy}% Accuracy</span>
                                            )}
                                        </div>
                                        <ChevronRight size={16} className="text-[#555]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Ear Warmup</p>
                            <Mic2 size={16} className="text-[#C96B62]" />
                        </div>
                        <p className="mt-1 text-xs text-[#999994]">2-minute minimal pairs auditory test.</p>

                        <div className="mt-4 rounded-xl border border-[#242424] bg-[#171717] p-3 text-center">
                            <span className="text-xs text-[#777770]">Which word did you hear?</span>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <button type="button" className="rounded-lg border border-[#2B2B2B] bg-[#1F1F1F] py-2 font-mono text-xs text-white transition-colors hover:border-[#C96B62]">
                                    Ship
                                </button>
                                <button type="button" className="rounded-lg border border-[#2B2B2B] bg-[#1F1F1F] py-2 font-mono text-xs text-white transition-colors hover:border-[#C96B62]">
                                    Sheep
                                </button>
                            </div>
                        </div>

                        <button type="button" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#C96B62] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                            <Play size={13} fill="currentColor" /> Play Audio Sample
                        </button>
                    </div>

                    {/* accent radar */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">Accent Recognition</h2>
                            <SlidersHorizontal size={15} className="text-[#777770]" />
                        </div>

                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">American (General US)</span>
                                    <span className="font-mono text-[#62C99B]">94%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#62C99B]" style={{ width: "94%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">British (RP / Estuary)</span>
                                    <span className="font-mono text-[#C96B62]">72%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "72%" }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#999994]">Australian</span>
                                    <span className="font-mono text-[#A78BC7]">50%</span>
                                </div>
                                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                    <div className="h-full rounded-full bg-[#A78BC7]" style={{ width: "50%" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* dica de audicao com ia */}
                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Sparkles size={16} />
                            <span className="text-xs font-semibold">Connected Speech Tip</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            Native speakers often blend words: <code className="font-mono text-white">"Want to"</code> sounds like <code className="font-mono text-white">"Wanna"</code> and <code className="font-mono text-white">"Going to"</code> becomes <code className="font-mono text-white">"Gonna"</code>.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    )
}
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