import { useState, useRef, useEffect } from "react"
import {
    ChevronRight,
    Eye,
    EyeOff,
    FastForward,
    Headphones,
    Lightbulb,
    Pause,
    Play,
    RotateCcw,
    Sparkles,
    Volume2,
    VolumeX
} from "lucide-react"

interface AudioEpisode {
    id: string
    title: string
    subtitle: string
    durationEstimate: string
    level: "A1"
    accent: "CA"
    category: string
    accuracy: number
    completed: boolean
    transcript: string
}

const audioEpisodes: AudioEpisode[] = [
    {
        id: "a1",
        title: "Cumprimentos no Hotel",
        subtitle: "Ouça uma interação simples de check-in na recepção em Toronto.",
        durationEstimate: "0:15 min",
        level: "A1",
        accent: "CA",
        category: "Viagem & Hotel",
        accuracy: 90,
        completed: true,
        transcript:
            "Hello! Good morning. Welcome to Canada. May I have your name and passport, please?"
    },
    {
        id: "a2",
        title: "Pedindo Café em Vancouver",
        subtitle: "Um pedido básico e direto em uma cafeteria canadense.",
        durationEstimate: "0:15 min",
        level: "A1",
        accent: "CA",
        category: "Dia a Dia",
        accuracy: 75,
        completed: false,
        transcript:
            "Hi there! Good afternoon. Could I have one cup of hot coffee and a croissant, please?"
    },
    {
        id: "a3",
        title: "Chegando ao Aeroporto de Montreal",
        subtitle: "Conversa rápida com o atendente no portão de embarque.",
        durationEstimate: "0:15 min",
        level: "A1",
        accent: "CA",
        category: "Aeroporto",
        accuracy: 0,
        completed: false,
        transcript:
            "Good morning! Please have your boarding pass ready. Have a safe and pleasant flight!"
    },
    {
        id: "a4",
        title: "Informação Turística em Ottawa",
        subtitle: "Perguntando o caminho para a estação central de trem.",
        durationEstimate: "0:15 min",
        level: "A1",
        accent: "CA",
        category: "Turismo",
        accuracy: 0,
        completed: false,
        transcript:
            "Hello! The train station is just down the street on your right. Have a wonderful day!"
    }
]

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
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isLoadingAudio, setIsLoadingAudio] = useState(false)

    const audioRef = useRef<HTMLAudioElement | null>(null)

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

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume)
        setIsMuted(newVolume === 0)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
            audioRef.current.muted = newVolume === 0
        }
    }

    const toggleMute = () => {
        if (!audioRef.current) return
        if (isMuted) {
            audioRef.current.muted = false
            audioRef.current.volume = volume || 0.5
            setIsMuted(false)
        } else {
            audioRef.current.muted = true
            setIsMuted(true)
        }
    }

    const skipTime = (seconds: number) => {
        if (!audioRef.current) return
        const target = Math.max(0, Math.min(duration || 0, audioRef.current.currentTime + seconds))
        audioRef.current.currentTime = target
        setCurrentTime(target)
    }

    const handleEpisodePlayToggle = (ep: AudioEpisode) => {
        if (ep.id === selectedEpisode.id) {
            togglePlay()
        } else {
            setSelectedEpisode(ep)
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play()
                        .then(() => setIsPlaying(true))
                        .catch(console.error)
                }
            }, 150)
        }
    }

    const formatTime = (time: number) => {
        if (!time || isNaN(time) || !isFinite(time)) return "00:00"
        const mins = Math.floor(time / 60)
        const secs = Math.floor(time % 60)
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    }

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            <audio
                ref={audioRef}
                onCanPlay={() => setIsLoadingAudio(false)}
                onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
                onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
            />

            <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Áudio & Compreensão</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Laboratório de Listening</h1>
                <p className="mt-1 text-sm text-[#999994]">Treine seu ouvido com inglês canadense natural, claro e prático para viagens.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <span
                            className={`h-2 w-2 rounded-full ${isLoadingAudio ? "bg-amber-400 animate-ping" : isPlaying ? "bg-[#62C99B] animate-pulse" : "bg-[#777770]"
                                }`}
                        />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                            Tocando Agora • {selectedEpisode.id.toUpperCase()}
                        </span>
                        <span className="rounded bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">
                            {selectedEpisode.level} Iniciante
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="group relative flex items-center gap-2 rounded-lg border border-[#2B2B2B] bg-[#171717] px-2.5 py-1">
                            <button
                                type="button"
                                onClick={toggleMute}
                                title={isMuted ? "Ativar som" : "Mutar"}
                                className="text-[#999994] transition-colors hover:text-white"
                            >
                                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                className="h-1 w-16 cursor-pointer appearance-none rounded bg-[#292929] accent-[#C96B62]"
                            />
                        </div>

                        <div className="rounded-lg border border-[#2B2B2B] bg-[#171717] px-2.5 py-1 font-mono text-[10px] text-white">
                            Sotaque Canadense (CA)
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

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => skipTime(-5)}
                                title="Voltar 5 segundos"
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] text-[#999994] transition-colors hover:text-white active:scale-95"
                            >
                                <RotateCcw size={15} />
                            </button>

                            <button
                                type="button"
                                onClick={togglePlay}
                                disabled={isLoadingAudio}
                                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C96B62] text-white transition-transform active:scale-95 hover:bg-[#B85C55] ${isLoadingAudio ? "opacity-60 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
                            </button>

                            <button
                                type="button"
                                onClick={() => skipTime(5)}
                                title="Avançar 5 segundos"
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
                                        <div key={i} style={{ height: `${height}px` }}
                                            className={`w-full rounded-full transition-all duration-150 ${isPassed ? "bg-[#C96B62]" : "bg-[#292929] group-hover:bg-[#383838]"}`}
                                        />
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
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />

                        </div>

                        <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[#777770]">
                            <span>{formatTime(currentTime)}</span>
                            <span className="flex items-center gap-1">
                                <Volume2 size={13} /> Ritmo Natural ({playbackSpeed})
                            </span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-[#2B2B2B] bg-[#191919] p-4">
                        <div className="flex items-center justify-between border-b border-[#242424] pb-2.5">
                            <span className="text-[11px] font-semibold text-[#999994]">Sincronização de Transcrição</span>
                            <button
                                type="button"
                                onClick={() => setHideTranscript(!hideTranscript)}
                                className="flex items-center gap-1.5 text-[11px] text-[#777770] hover:text-white"
                            >
                                {hideTranscript ? <Eye size={13} /> : <EyeOff size={13} />}
                                {hideTranscript ? "Mostrar Texto" : "Modo Ditado (Ocultar)"}
                            </button>
                        </div>

                        <div className="mt-3 leading-relaxed">
                            {hideTranscript ? (
                                <p className="font-mono text-xs italic text-[#555]">
                                    [Transcrição oculta para você praticar a audição. Ouça com atenção!]
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

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Biblioteca de Áudios</h2>
                        <span className="rounded-lg border border-[#2B2B2B] bg-[#171717] px-2.5 py-1 font-mono text-[11px] text-[#999994]">
                            {audioEpisodes.length} Lições Disponíveis
                        </span>
                    </div>

                    <div className="space-y-3">
                        {audioEpisodes.map((ep) => {
                            const isSelected = selectedEpisode.id === ep.id

                            return (
                                <div
                                    key={ep.id}
                                    onClick={() => setSelectedEpisode(ep)}
                                    className={`cursor-pointer rounded-2xl border p-4.5 transition-colors ${isSelected
                                        ? "border-[#C96B62] bg-[#1C1C1C]"
                                        : ep.completed
                                            ? "border-[#292929] bg-[#181818] hover:border-[#383838]"
                                            : "border-[#222222] bg-[#141414] hover:border-[#303030]"
                                        }`}
                                >
                                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-3.5">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEpisodePlayToggle(ep)
                                                }}
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${isSelected
                                                    ? "bg-[#C96B62] text-white"
                                                    : "bg-[#251A19] text-[#C96B62] hover:bg-[#C96B62] hover:text-white"
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
                                                    <span className="rounded bg-[#252525] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#B39CD0]">
                                                        {ep.accent}
                                                    </span>
                                                    <span className="rounded bg-[#252525] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#A0A09B]">
                                                        {ep.level}
                                                    </span>
                                                    <span className="text-[11px] font-medium text-[#8E8E88]">{ep.category}</span>
                                                </div>
                                                <h3 className="mt-1 text-sm font-semibold text-white">{ep.title}</h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 border-t border-[#262626] pt-2 sm:border-0 sm:pt-0">
                                            <div className="text-left sm:text-right">
                                                <span className="block font-mono text-xs text-[#999994]">{ep.durationEstimate}</span>
                                                {ep.completed && (
                                                    <span className="font-mono text-[10px] font-medium text-[#62C99B]">{ep.accuracy}% Precisão</span>
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

                <aside className="space-y-4">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                            <div className="flex items-center gap-2">
                                <Headphones size={16} className="text-[#C96B62]" />
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Sessão Atual</h3>
                            </div>
                            <span className="font-mono text-[10px] text-[#62C99B]">Pronto</span>
                        </div>

                        <div className="mt-3 space-y-2.5 font-mono text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-[#777770]">Nível</span>
                                <span className="text-white">A1 Iniciante</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#777770]">Sotaque</span>
                                <span className="text-[#A78BC7]">Canadense (en-CA)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#777770]">Velocidade</span>
                                <span className="text-white">{playbackSpeed}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#777770]">Modo</span>
                                <span className={hideTranscript ? "text-[#C96B62]" : "text-emerald-400"}>
                                    {hideTranscript ? "Ditado (Oculto)" : "Leitura Ativa"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 space-y-3">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Lightbulb size={16} />
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Dicas de Escuta</h3>
                        </div>

                        <ul className="space-y-2 text-xs text-[#999994]">
                            <li className="flex items-start gap-2">
                                <span className="text-[#C96B62]">•</span>
                                <span>O sotaque canadense é neutro, articulado e tem ritmo muito similar ao padrão norte-americano.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#C96B62]">•</span>
                                <span>Foque nas saudações e pedidos de cortesia comuns como <em>please</em> e <em>thank you</em>.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#C96B62]">•</span>
                                <span>Repita em voz alta após a voz neural para acostumar com as vogais abertas.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Sparkles size={16} />
                            <span className="text-xs font-semibold">Fala Conectada</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            No Canadá, a ligação entre vogais e consoantes é fluida: <code className="font-mono text-white">"Could I have"</code> soa naturalmente como <code className="font-mono text-white">"Cou-dI-have"</code>.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    )
}