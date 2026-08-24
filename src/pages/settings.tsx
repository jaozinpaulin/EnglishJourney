import { useState } from "react"
import { ArrowRight, Bell, Check, Database, Download, Globe, Key, Lock, Mic2, Moon, Palette, Save, Shield, Sliders, Sparkles, Trash2, User, Volume2, Zap } from "lucide-react"

export default function Settings() {
    const [accent, setAccent] = useState("US")
    const [dailyGoal, setDailyGoal] = useState("30")
    const [voiceSpeed, setVoiceSpeed] = useState("1.0x")
    const [autoPlayAudio, setAutoPlayAudio] = useState(true)
    const [srsNotifications, setSrsNotifications] = useState(true)
    const [soundEffects, setSoundEffects] = useState(true)
    const [hapticFeedback, setHapticFeedback] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    const handleSave = () => {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Preferences & System</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Settings</h1>
                    <p className="mt-1 text-sm text-[#999994]">Customize your learning experience, AI speech model and account preferences.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <Sliders size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">{dailyGoal} min/day</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">daily target</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <Volume2 size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">{accent} ({voiceSpeed})</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">ai voice</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Shield size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">Active</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">cloud sync</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* grid principal */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
                {/* painel de configuracoes principal */}
                <div className="space-y-5">
                    {/* metas de estudo & ritmo */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 sm:p-6">
                        <div className="flex items-center gap-2.5 border-b border-[#2B2B2B] pb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                                <Zap size={16} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white">Study Commitment & Daily Goals</h2>
                                <p className="text-xs text-[#999994]">Define how much time you dedicate each day to maintain your streak.</p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-[#B7B7B2]">Daily Target Duration</label>
                                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
                                    {[
                                        { val: "15", label: "Casual (15m)" },
                                        { val: "30", label: "Regular (30m)" },
                                        { val: "45", label: "Intense (45m)" },
                                        { val: "60", label: "Hardcore (60m)" },
                                    ].map((item) => (
                                        <button
                                            key={item.val}
                                            type="button"
                                            onClick={() => setDailyGoal(item.val)}
                                            className={`rounded-xl border p-2.5 text-center font-semibold transition-all ${dailyGoal === item.val
                                                ? "border-[#C96B62] bg-[#2A2020] text-white shadow-[0_0_12px_rgba(201,107,98,0.2)]"
                                                : "border-[#2B2B2B] bg-[#171717] text-[#777770] hover:text-white"
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* voz da ia & audio lab */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 sm:p-6">
                        <div className="flex items-center gap-2.5 border-b border-[#2B2B2B] pb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                                <Mic2 size={16} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white">AI Speech & Audio Synthesizer</h2>
                                <p className="text-xs text-[#999994]">Configure default narrator accent, playback cadence and sound cues.</p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold text-[#B7B7B2]">Default Accent</label>
                                    <div className="mt-2 flex rounded-xl border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs">
                                        {[
                                            { key: "US", label: "American" },
                                            { key: "UK", label: "British" },
                                            { key: "AUS", label: "Aussie" },
                                        ].map((acc) => (
                                            <button
                                                key={acc.key}
                                                type="button"
                                                onClick={() => setAccent(acc.key)}
                                                className={`flex-1 rounded-lg py-1.5 text-center font-semibold transition-all ${accent === acc.key ? "bg-[#C96B62] text-white" : "text-[#777770] hover:text-white"
                                                    }`}
                                            >
                                                {acc.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#B7B7B2]">Base Speaking Speed</label>
                                    <div className="mt-2 flex rounded-xl border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs">
                                        {["0.8x", "1.0x", "1.2x"].map((spd) => (
                                            <button
                                                key={spd}
                                                type="button"
                                                onClick={() => setVoiceSpeed(spd)}
                                                className={`flex-1 rounded-lg py-1.5 text-center font-semibold transition-all ${voiceSpeed === spd ? "bg-[#292929] text-white" : "text-[#777770] hover:text-white"
                                                    }`}
                                            >
                                                {spd}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* toggles de audio */}
                            <div className="space-y-3 border-t border-[#262626] pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="block text-xs font-semibold text-white">Auto-play audio clips</span>
                                        <span className="text-[11px] text-[#777770]">Automatically play pronunciation audio when revealing flashcards.</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setAutoPlayAudio(!autoPlayAudio)}
                                        className={`relative h-6 w-11 rounded-full transition-colors ${autoPlayAudio ? "bg-[#C96B62]" : "bg-[#292929]"
                                            }`}
                                    >
                                        <span
                                            className={`block h-4 w-4 rounded-full bg-white transition-transform ${autoPlayAudio ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="block text-xs font-semibold text-white">Interactive Sound Effects</span>
                                        <span className="text-[11px] text-[#777770]">Play audio cues on correct answers and streak milestones.</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSoundEffects(!soundEffects)}
                                        className={`relative h-6 w-11 rounded-full transition-colors ${soundEffects ? "bg-[#C96B62]" : "bg-[#292929]"
                                            }`}
                                    >
                                        <span
                                            className={`block h-4 w-4 rounded-full bg-white transition-transform ${soundEffects ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* notificacoes & srs */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 sm:p-6">
                        <div className="flex items-center gap-2.5 border-b border-[#2B2B2B] pb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                                <Bell size={16} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white">Spaced Repetition & Notifications</h2>
                                <p className="text-xs text-[#999994]">Stay on track with smart review alerts before memories decay.</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="block text-xs font-semibold text-white">SRS Memory Due Reminders</span>
                                    <span className="text-[11px] text-[#777770]">Get notified when vocabulary cards are ready for optimal refresh.</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSrsNotifications(!srsNotifications)}
                                    className={`relative h-6 w-11 rounded-full transition-colors ${srsNotifications ? "bg-[#C96B62]" : "bg-[#292929]"
                                        }`}
                                >
                                    <span
                                        className={`block h-4 w-4 rounded-full bg-white transition-transform ${srsNotifications ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="block text-xs font-semibold text-white">Daily Streak Saver Alert</span>
                                    <span className="text-[11px] text-[#777770]">Receive a ping at 8:00 PM if daily practice has not been completed.</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setHapticFeedback(!hapticFeedback)}
                                    className={`relative h-6 w-11 rounded-full transition-colors ${hapticFeedback ? "bg-[#C96B62]" : "bg-[#292929]"
                                        }`}
                                >
                                    <span
                                        className={`block h-4 w-4 rounded-full bg-white transition-transform ${hapticFeedback ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* botao salvar */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 rounded-xl bg-[#C96B62] px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition-all hover:bg-[#B85C55]"
                        >
                            {isSaved ? <Check size={14} /> : <Save size={14} />}
                            {isSaved ? "Saved Successfully!" : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    {/* dados do perfil */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center gap-3 border-b border-[#2B2B2B] pb-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6D3833] to-[#2A2020] font-mono text-base font-bold text-white border border-[#49302E]">
                                JD
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">João Dev</h3>
                                <span className="font-mono text-xs text-[#777770]">joao@developer.io</span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2.5 font-mono text-xs">
                            <div className="flex items-center justify-between rounded-lg bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-[#999994]">Plan Status</span>
                                <span className="text-[#62C99B] font-semibold">Pro Lifetime</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-[#999994]">Cloud Storage</span>
                                <span className="text-white">12.4 MB / 1 GB</span>
                            </div>
                        </div>
                    </div>

                    {/* exportacao e backup */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
                            <h3 className="text-sm font-bold text-white">Data Portability</h3>
                            <Database size={15} className="text-[#777770]" />
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-[#999994]">
                            Export your saved vocabulary bank and grammar notes for Anki or offline study.
                        </p>

                        <div className="mt-4 space-y-2">
                            <button
                                type="button"
                                className="flex w-full items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#171717] p-2.5 text-xs text-white transition-colors hover:border-[#3A3A3A]"
                            >
                                <span className="flex items-center gap-2">
                                    <Download size={13} className="text-[#C96B62]" /> Export Vocabulary (CSV)
                                </span>
                                <span className="font-mono text-[10px] text-[#777770]">482 Words</span>
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#171717] p-2.5 text-xs text-white transition-colors hover:border-[#3A3A3A]"
                            >
                                <span className="flex items-center gap-2">
                                    <Download size={13} className="text-[#A78BC7]" /> Full Learning Progress (JSON)
                                </span>
                                <span className="font-mono text-[10px] text-[#777770]">Backup</span>
                            </button>
                        </div>
                    </div>

                    {/* zona de perigo */}
                    <div className="rounded-2xl border border-[#3D2220] bg-gradient-to-b from-[#211515] to-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between text-[#C96B62]">
                            <span className="text-xs font-bold uppercase tracking-wider">Danger Zone</span>
                            <Trash2 size={15} />
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7A09E]">
                            Resetting your progress will wipe all streak history and SRS queues permanently.
                        </p>
                        <button
                            type="button"
                            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#6B3A36] bg-[#2A1A1A] py-2 text-xs font-semibold text-[#C96B62] transition-colors hover:bg-[#3D2220]"
                        >
                            Reset SRS Memory Bank
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    )
}