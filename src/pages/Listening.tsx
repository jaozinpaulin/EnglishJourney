import { useState, useRef, useEffect } from "react"
import {
    ChevronRight, Eye, EyeOff, FastForward, Mic2, Pause, Play,
    RotateCcw, SlidersHorizontal, Sparkles, Volume2
} from "lucide-react"

interface AudioEpisode {
    id: string
    title: string
    subtitle: string
    durationEstimate: string
    level: "A1" | "A2" | "B1" | "B2"
    accent: "US" | "UK" | "AUS"
    category: string
    accuracy: number
    completed: boolean
    transcript: string
}

// Histórias com textos reais para o Edge TTS sintetizar
const audioEpisodes: AudioEpisode[] = [
    {
        id: "a1",
        title: "Standup Meeting & Sprint Goals",
        subtitle: "Listen to a team discussing task blockers and API integrations.",
        durationEstimate: "0:20 min",
        level: "B1",
        accent: "US",
        category: "Tech & Work",
        accuracy: 92,
        completed: true,
        transcript:
            "Good morning team. Let's begin our daily standup. Are there any critical blockers on the API pipeline before we proceed with the staging deployment today?"
    },
    {
        id: "a2",
        title: "Ordering Coffee in London",
        subtitle: "A quick interaction ordering a flat white with oat milk.",
        durationEstimate: "0:15 min",
        level: "A2",
        accent: "UK",
        category: "Daily Life",
        accuracy: 78,
        completed: false,
        transcript:
            "Good afternoon! Could I please get a flat white with oat milk, and one warm croissant to take away?"
    },
    {
        id: "a3",
        title: "Rainy Coding Routine",
        subtitle: "A software developer talks about their morning habits.",
        durationEstimate: "0:18 min",
        level: "A2",
        accent: "US",
        category: "Routine",
        accuracy: 0,
        completed: false,
        transcript:
            "Leo woke up early today. He brewed fresh black coffee, turned on his desk lamp, and spent the rainy morning building React components."
    },
    {
        id: "a4",
        title: "Exploring Sydney Harbour",
        subtitle: "Casual travel plan discussion near the iconic opera house.",
        durationEstimate: "0:18 min",
        level: "B1",
        accent: "AUS",
        category: "Travel",
        accuracy: 0,
        completed: false,
        transcript:
            "G'day mate! The ferry across the harbour leaves in fifteen minutes. Let's grab some water and catch the morning breeze by the bridge."
    }
]

// Gera a URL do endpoint Express passando o texto e o sotaque
function getAudioUrl(text: string, accent: string) {
    return `http://localhost:3001/api/tts?accent=${encodeURIComponent(accent)}&text=${encodeURIComponent(text)}`
}

export default function Listening() {
    const [selectedEpisode, setSelectedEpisode] = useState<AudioEpisode>(audioEpisodes[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState("1.0x")
    const [hideTranscript, setHideTranscript] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isLoadingAudio, setIsLoadingAudio] = useState(false)

    const audioRef = useRef<HTMLAudioElement | null>(null)

    // Recarrega o áudio quando troca o episódio
    useEffect(() => {
        if (!audioRef.current) return
        setIsPlaying(false)
        setCurrentTime(0)
        setDuration(0)
        setIsLoadingAudio(true)

        audioRef.current.src = getAudioUrl(selectedEpisode.transcript, selectedEpisode.accent)
        audioRef.current.load()
    }, [selectedEpisode])

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(console.error)
        }
    }

    const handleSpeedChange = (speedStr: string) => {
        setPlaybackSpeed(speedStr)
        const speed = parseFloat(speedStr.replace("x", ""))
        if (audioRef.current) audioRef.current.playbackRate = speed
    }

    const skipTime = (seconds: number) => {
        if (!audioRef.current) return
        const target = Math.max(0, Math.min(duration || 0, audioRef.current.currentTime + seconds))
        audioRef.current.currentTime = target
        setCurrentTime(target)
    }

    const handleSelectEpisode = (ep: AudioEpisode) => {
        if (ep.id === selectedEpisode.id) return
        setSelectedEpisode(ep)
    }

    const formatTime = (time: number) => {
        if (!time || isNaN(time) || !isFinite(time)) return "00:00"
        const mins = Math.floor(time / 60)
        const secs = Math.floor(time % 60)
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    }

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* Elemento de Áudio HTML5 nativo */}
            <audio
                ref={audioRef}
                onCanPlay={() => setIsLoadingAudio(false)}
                onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
                onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Header */}
            <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Audio & Comprehension</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Listening Lab</h1>
                <p className="mt-1 text-sm text-[#999994]">Train your ear to natural cadences, native accents and live dialogues.</p>
            </div>

            {/* Card do Player Principal */}
            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                {/* Top bar do player */}
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <span
                            className={`h-2 w-2 rounded-full ${isLoadingAudio ? "bg-amber-400 animate-ping" : isPlaying ? "bg-[#62C99B] animate-pulse" : "bg-[#777770]"
                                }`}
                        />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                            Now Playing • {selectedEpisode.id.toUpperCase()}
                        </span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">
                            {selectedEpisode.level}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-lg border border-[#2B2B2B] bg-[#171717] px-2.5 py-0.5 font-mono text-[10px] text-white">
                            {selectedEpisode.accent}
                        </div>

                        <div className="flex rounded-lg border border-[#2B2B2B] bg-[#171717] p-1">
                            {["0.75x", "1.0x", "1.25x"].map((speed) => (
                                <button
                                    key={speed}
                                    type="button"
                                    onClick={() => handleSpeedChange(speed)}
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
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-[#C96B62]">{selectedEpisode.category}</span>
                            <h2 className="text-2xl font-bold tracking-tight text-white">{selectedEpisode.title}</h2>
                            <p className="text-xs text-[#999994]">{selectedEpisode.subtitle}</p>
                        </div>

                        {/* Controles de Reprodução */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => skipTime(-5)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] text-[#999994] transition-colors hover:text-white active:scale-95"
                            >
                                <RotateCcw size={15} />
                            </button>

                            <button
                                type="button"
                                onClick={togglePlay}
                                disabled={isLoadingAudio}
                                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C96B62] text-white shadow-lg transition-transform active:scale-95 hover:bg-[#B85C55] ${isLoadingAudio ? "opacity-60 cursor-not-allowed" : ""
                                    }`}>

                                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
                            </button>

                            <button
                                type="button"
                                onClick={() => skipTime(5)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] text-[#999994] transition-colors hover:text-white active:scale-95"
                            >
                                <FastForward size={15} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#262626] bg-[#151515] p-4">
                        <div className="group relative flex h-14 w-full cursor-pointer items-center">
                            <div className="pointer-events-none flex h-full w-full items-center justify-between gap-1">
                                {Array.from({ length: 48 }).map((_, i) => {
                                    const height = Math.sin(i * 0.4) * 18 + 22
                                    const progressRatio = duration > 0 ? currentTime / duration : 0
                                    const isPassed = i / 48 <= progressRatio

                                    return (
                                        <div key={i}
                                            style={{ height: `${height}px` }}
                                            className={`w-full rounded-full transition-all duration-150 ${isPassed ? "bg-[#C96B62]" : "bg-[#292929] group-hover:bg-[#383838]"}`} />
                                    )
                                })}
                            </div>

                            <input type="range" min={0} max={duration || 100} step="0.1"
                                value={currentTime}
                                onChange={(e) => {
                                    const newTime = Number(e.target.value)

                                    setCurrentTime(newTime)
                                    if (audioRef.current) audioRef.current.currentTime = newTime
                                }}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                        </div>

                        <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[#777770]">
                            <span>{formatTime(currentTime)}</span>
                            <span className="flex items-center gap-1">
                                <Volume2 size={13} /> Natural Tempo ({playbackSpeed})
                            </span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

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
                                <p className="font-mono text-xs italic text-[#555]">
                                    [Transcript hidden for comprehension practice.]
                                </p>
                            ) : (
                                <p className="text-sm text-[#B7B7B2]">
                                    <span className="text-white">"{selectedEpisode.transcript}"</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/*  Lateral */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Audio Library</h2>
                        <span className="rounded-lg border border-[#2B2B2B] bg-[#171717] px-2.5 py-1 font-mono text-[11px] text-[#999994]">
                            {audioEpisodes.length} Episodes Available
                        </span>
                    </div>

                    <div className="space-y-3">
                        {audioEpisodes.map((ep) => {
                            const isSelected = selectedEpisode.id === ep.id

                            return (
                                <div
                                    key={ep.id}
                                    onClick={() => handleSelectEpisode(ep)}
                                    className={`cursor-pointer rounded-2xl border p-4.5 transition-all hover:border-[#3A3A3A] ${isSelected
                                        ? "border-[#C96B62]/60 bg-[#241F1F]"
                                        : ep.completed
                                            ? "border-[#2B2B2B] bg-[#1D1D1D]"
                                            : "border-[#282828] bg-[#1A1A1A]"
                                        }`}
                                >
                                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-3.5">
                                            <button
                                                type="button"
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${isSelected
                                                    ? "bg-[#C96B62] text-white"
                                                    : "bg-[#2A2020] text-[#C96B62] hover:bg-[#C96B62] hover:text-white"
                                                    }`}
                                            >
                                                {isSelected && isPlaying ? (
                                                    <Pause size={16} />
                                                ) : (
                                                    <Play size={16} fill="currentColor" className="ml-0.5" />
                                                )}
                                            </button>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded bg-[#292929] px-1.5 py-0.5 font-mono text-[9px] text-[#A78BC7]">
                                                        {ep.accent}
                                                    </span>
                                                    <span className="rounded bg-[#242424] px-1.5 py-0.5 font-mono text-[9px] text-[#777770]">
                                                        {ep.level}
                                                    </span>
                                                    <span className="text-[11px] text-[#777770]">{ep.category}</span>
                                                </div>
                                                <h3 className="mt-1 text-sm font-semibold text-white">{ep.title}</h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 border-t border-[#242424] pt-2 sm:border-0 sm:pt-0">
                                            <div className="text-left sm:text-right">
                                                <span className="block font-mono text-xs text-[#999994]">{ep.durationEstimate}</span>
                                                {ep.completed && (
                                                    <span className="font-mono text-[10px] text-[#62C99B]">{ep.accuracy}% Accuracy</span>
                                                )}
                                            </div>
                                            <ChevronRight size={16} className={isSelected ? "text-[#C96B62]" : "text-[#555]"} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Lateral */}
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
                                <button
                                    type="button"
                                    className="rounded-lg border border-[#2B2B2B] bg-[#1F1F1F] py-2 font-mono text-xs text-white transition-colors hover:border-[#C96B62]"
                                >
                                    Ship
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg border border-[#2B2B2B] bg-[#1F1F1F] py-2 font-mono text-xs text-white transition-colors hover:border-[#C96B62]"
                                >
                                    Sheep
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#C96B62] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                        >
                            <Play size={13} fill="currentColor" /> Play Audio Sample
                        </button>
                    </div>

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

                    {/* <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Sparkles size={16} />
                            <span className="text-xs font-semibold">Connected Speech Tip</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            Native speakers often blend words: <code className="font-mono text-white">"Want to"</code> sounds like{" "}
                            <code className="font-mono text-white">"Wanna"</code>.
                        </p>
                    </div> */}
                </aside>
            </div>
        </section>
    )
}