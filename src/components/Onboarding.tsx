import { useState } from "react"
import { CompassRose } from "./CompassRose"
import {
    Sparkles,
    Target,
    Clock,
    BookOpen,
    Headphones,
    Mic,
    PenTool,
    Check,
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    Briefcase,
    Plane,
    Monitor,
    MessageCircle,
    Trophy,
    Flame,
    Globe,
    GraduationCap,
    Layers,
    Compass
} from "lucide-react"

export type LevelId = "A1" | "A2" | "B1" | "B2" | "unsure"
export type SkillType = "speaking" | "listening" | "reading" | "writing"
export type ConfidenceLevel = "low" | "medium" | "high"

export interface LevelOption {
    id: LevelId
    title: string
    badge: string
    description: string
}

export interface MotivationOption {
    id: string
    title: string
    description: string
    icon: React.ElementType
}

export interface StudyTimeOption {
    value: number
    label: string
    description: string
}

export interface FrequencyOption {
    value: number
    label: string
    description: string
}

export interface SkillDetail {
    confidence: ConfidenceLevel | null
    priority: boolean
}

export type SkillsState = Record<SkillType, SkillDetail>

export interface JourneyProfile {
    level: LevelId | null
    motivations: string[]
    abilities: string[]
    studyPlan: {
        dailyMinutes: number | null
        daysPerWeek: number | null
    }
    skills: SkillsState
    previousExperience: {
        studiedBefore: boolean | null
        experience: string | null
        duration: string | null
    }
}

export default function Onboarding() {
    const [step, setStep] = useState<number>(1)
    const [selectedMotivations, setSelectedMotivations] = useState<string[]>([])
    const [selectedLevel, setSelectedLevel] = useState<LevelId | null>(null)
    const [selectedAbilities, setSelectedAbilities] = useState<string[]>([])
    const [dailyMinutes, setDailyMinutes] = useState<number | null>(null)
    const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null)
    const [studiedBefore, setStudiedBefore] = useState<boolean | null>(null)
    const [studyExperience, setStudyExperience] = useState<string | null>(null)
    const [studyDuration, setStudyDuration] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showValidationError, setShowValidationError] = useState<boolean>(false)

    const totalSteps = 7

    const levels: LevelOption[] = [
        {
            id: "A1",
            title: "Beginner",
            badge: "Discovery",
            description: "I know basic greetings, numbers, and simple expressions, but struggle to formulate full sentences.",
        },
        {
            id: "A2",
            title: "Elementary",
            badge: "Foundations",
            description: "I can understand common phrases and communicate in familiar, predictable everyday situations.",
        },
        {
            id: "B1",
            title: "Intermediate",
            badge: "Autonomy",
            description: "I can discuss familiar routines, share past experiences, and travel with reasonable autonomy.",
        },
        {
            id: "B2",
            title: "Upper Intermediate",
            badge: "Proficiency",
            description: "I can follow natural conversations, understand technical discussions, and articulate clear viewpoints.",
        },
        {
            id: "unsure",
            title: "I'm not sure",
            badge: "Adaptive",
            description: "We will start with interactive benchmark exercises to discover your ideal starting point.",
        },
    ]

    const motivations: MotivationOption[] = [
        {
            id: "career",
            title: "Career Advancement",
            description: "Unlock international roles, prepare for technical interviews, and lead meetings comfortably.",
            icon: Briefcase,
        },
        {
            id: "travel",
            title: "Travel & Independence",
            description: "Navigate global airports, make reservations, and explore new places without communication stress.",
            icon: Plane,
        },
        {
            id: "tech-study",
            title: "Tech & Documentation",
            description: "Read technical docs, access research, and follow global software engineering content smoothly.",
            icon: Monitor,
        },
        {
            id: "communication",
            title: "Global Networking",
            description: "Connect with foreign colleagues, build partnerships, and share ideas across languages.",
            icon: MessageCircle,
        },
        {
            id: "entertainment",
            title: "Media & Culture",
            description: "Enjoy podcasts, series, films, and video games in English without needing subtitles.",
            icon: Globe,
        },
        {
            id: "mastery",
            title: "Personal Mastery",
            description: "Challenge yourself with a lifelong cognitive skill and open up brand-new horizons.",
            icon: Trophy,
        },
    ]

    const abilitiesList = [
        { label: "Introduce myself naturally", icon: Sparkles },
        { label: "Engage in daily conversations", icon: MessageCircle },
        { label: "Travel abroad without anxiety", icon: Plane },
        { label: "Order food and ask questions", icon: Compass },
        { label: "Ask for and follow directions", icon: Target },
        { label: "Pitch ideas during meetings", icon: Briefcase },
        { label: "Explain technical workflows", icon: Monitor },
        { label: "Listen to podcasts with ease", icon: Headphones },
        { label: "Watch videos without subtitles", icon: Globe },
        { label: "Draft clear messages & emails", icon: PenTool },
        { label: "Defend arguments and debate", icon: Flame },
        { label: "Catch slang and casual humor", icon: BookOpen },
    ]

    const studyTimes: StudyTimeOption[] = [
        { value: 10, label: "10 min / day", description: "Micro-sessions focused on consistent habits" },
        { value: 20, label: "20 min / day", description: "Balanced daily rhythm for steady progression" },
        { value: 35, label: "35 min / day", description: "Recommended pace for high retention" },
        { value: 50, label: "50+ min / day", description: "Intensive track for accelerated results" },
    ]

    const frequencies: FrequencyOption[] = [
        { value: 3, label: "3 days / week", description: "Flexible routine for busy schedules" },
        { value: 5, label: "5 days / week", description: "Optimal habit loop for steady memory" },
        { value: 7, label: "Every day", description: "Full daily immersion for fast progress" },
    ]

    const [skills, setSkills] = useState<SkillsState>({
        speaking: { confidence: null, priority: false },
        listening: { confidence: null, priority: false },
        reading: { confidence: null, priority: false },
        writing: { confidence: null, priority: false },
    })

    const skillOptions: { key: SkillType; label: string; icon: React.ElementType }[] = [
        { key: "speaking", label: "Speaking", icon: Mic },
        { key: "listening", label: "Listening", icon: Headphones },
        { key: "reading", label: "Reading", icon: BookOpen },
        { key: "writing", label: "Writing", icon: PenTool },
    ]

    const studyExperiences: string[] = [
        "Language school / Academy",
        "Self-taught (apps & videos)",
        "Private tutor (1-on-1)",
        "School / College classes",
        "Living abroad / Travels",
        "Other methods",
    ]

    const studyDurations: string[] = [
        "Under 6 months",
        "6 months to 1 year",
        "1 to 2 years",
        "2 to 4 years",
        "5+ years",
    ]

    // validacao de etapas
    const getStepMissingDetails = (stepIndex: number): string | null => {
        switch (stepIndex) {
            case 1:
                return selectedLevel === null ? "Select your current English level" : null
            case 2:
                return selectedMotivations.length === 0 ? "Select at least one motivation" : null
            case 3:
                return selectedAbilities.length === 0 ? "Select at least one practical ability" : null
            case 4:
                if (dailyMinutes === null && daysPerWeek === null) return "Choose both daily time and weekly frequency"
                if (dailyMinutes === null) return "Select your daily study duration"
                if (daysPerWeek === null) return "Select how many days per week"
                return null
            case 5: {
                const unrated = skillOptions
                    .map((s) => s.key)
                    .filter((k) => skills[k].confidence === null)
                if (unrated.length > 0) {
                    return `Rate comfort level for: ${unrated.join(", ")}`
                }
                return null
            }
            case 6:
                if (studiedBefore === null) return "Select whether you have studied English before"
                if (studiedBefore === true) {
                    if (!studyExperience && !studyDuration) return "Select your study method and past duration"
                    if (!studyExperience) return "Select your previous study method"
                    if (!studyDuration) return "Select how long you previously studied"
                }
                return null
            default:
                return null
        }
    }

    const currentMissingInfo = getStepMissingDetails(step)
    const isCurrentStepValid = currentMissingInfo === null

    const handleNextStep = () => {
        if (!isCurrentStepValid) {
            setShowValidationError(true)
            return
        }
        setShowValidationError(false)
        setStep((current) => Math.min(current + 1, totalSteps))
    }

    const handleCreateJourney = async () => {
        const journeyProfile: JourneyProfile = {
            level: selectedLevel,
            motivations: selectedMotivations,
            abilities: selectedAbilities,
            studyPlan: {
                dailyMinutes,
                daysPerWeek,
            },
            skills,
            previousExperience: {
                studiedBefore,
                experience: studyExperience,
                duration: studyDuration,
            },
        }

        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:3001/api/journey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(journeyProfile),
            })

            if (!response.ok) {
                throw new Error(`Request error: ${response.statusText}`)
            }

            const dailyJourney = await response.json()
            console.log("JOURNEY RECEIVED FROM BACKEND:", dailyJourney)
        } catch (error) {
            console.error("Failed to create journey:", error)
            alert("Error connecting to journey server. Verify if backend is active.")
        } finally {
            setIsLoading(false)
        }
    }

    const priorityCount = Object.values(skills).filter((s) => s.priority).length
    const isAlertVisible = Boolean(showValidationError && currentMissingInfo)

    return (
        <section className="relative mx-auto flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#111111] px-4 py-6 text-[#E7E5E1] antialiased transition-colors duration-300 sm:px-8 sm:py-8 lg:px-12 xl:px-16">
            {/* background decorativo */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.05] transition-opacity duration-500">
                <div className="h-[480px] w-[480px] animate-[spin_140s_linear_infinite] sm:h-[650px] sm:w-[650px] md:h-[750px] md:w-[750px]">
                    <CompassRose />
                </div>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between">
                {/* cabecalho de progresso */}
                <div className="mb-4 border-b border-[#2B2B2B]/80 pb-4 transition-all duration-300 sm:mb-5 sm:pb-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-[#E7E5E1] sm:text-2xl md:text-3xl">
                                Let's Build Your Journey
                            </h1>
                            <p className="mt-1 text-xs text-[#999994] sm:text-sm">
                                Complete your profile to generate an AI-tailored study blueprint.
                            </p>
                        </div>

                        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-1.5">
                            <span className="rounded-full border border-[#2B2B2B] bg-[#1A1A1A] px-3.5 py-1 font-mono text-xs text-[#999994] transition-colors duration-200 sm:px-4 sm:py-1.5">
                                Step <strong className="text-[#E7E5E1]">{step}</strong> / {totalSteps}
                            </span>
                            <span className="text-xs font-semibold tracking-wider text-[#C96B62]">
                                {Math.round((step / totalSteps) * 100)}% Completed
                            </span>
                        </div>
                    </div>

                    <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-[#1F1F1F]">
                        <div
                            className="h-full rounded-full bg-[#B85C55] transition-all duration-500 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* feedback de validacao clean */}
                <div
                    aria-live="polite"
                    className={`mb-3 flex items-center gap-2 rounded-lg border border-[#3A2222] bg-[#161313] px-3 py-2 text-xs transition-all duration-300 ease-in-out sm:mb-4 sm:text-sm ${isAlertVisible
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none select-none"
                        }`}
                >
                    <AlertCircle className="h-4 w-4 shrink-0 text-[#C96B62]" />
                    <span className="text-[#999994]">
                        <strong className="text-[#C96B62]">Required:</strong> {currentMissingInfo ?? "Please complete all fields."}
                    </span>
                </div>

                {/* etapas */}
                <div key={step} className="flex-1 transition-all duration-300 ease-out">
                    {step === 1 && (
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <span className="text-[11px] font-semibold tracking-wider text-[#C96B62] uppercase">
                                    Step 01 · Diagnostic
                                </span>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#E7E5E1] sm:text-xl md:text-2xl">
                                    What is your current English level?
                                </h2>
                                <p className="mt-0.5 text-xs text-[#999994] sm:text-sm">
                                    Select the tier that best matches your conversational ease.
                                </p>
                            </div>

                            <div className="grid gap-2.5 sm:gap-3">
                                {levels.map((lvl) => {
                                    const isSelected = selectedLevel === lvl.id
                                    const isMissing = showValidationError && selectedLevel === null

                                    return (
                                        <button
                                            key={lvl.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedLevel(lvl.id)
                                                setShowValidationError(false)
                                            }}
                                            className={`group flex items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer sm:items-center sm:p-4 ${isSelected
                                                ? "border-[#B85C55] bg-[#261717] scale-[1.005]"
                                                : isMissing
                                                    ? "border-[#4A2626] bg-[#181818]/90 hover:border-[#6B3232]"
                                                    : "border-[#2B2B2B] bg-[#181818]/90 hover:border-[#444444] hover:bg-[#1E1E1E]"
                                                }`}
                                        >
                                            <div className="flex items-start gap-3 sm:items-center">
                                                <span className="flex h-8 w-11 shrink-0 items-center justify-center rounded-lg border border-[#B85C55]/40 bg-[#201313] font-mono text-xs font-bold text-[#C96B62] transition-colors duration-200">
                                                    {lvl.id}
                                                </span>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-[#E7E5E1] sm:text-base">{lvl.title}</h3>
                                                    <p className="mt-0.5 text-xs leading-relaxed text-[#999994]">
                                                        {lvl.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="shrink-0 rounded-full border border-[#2B2B2B] bg-[#121212] px-2.5 py-0.5 text-[10px] font-medium text-[#888882] transition-colors duration-200 sm:text-xs">
                                                {lvl.badge}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <span className="text-[11px] font-semibold tracking-wider text-[#C96B62] uppercase">
                                    Step 02 · Driving Force
                                </span>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#E7E5E1] sm:text-xl md:text-2xl">
                                    Why do you want to learn English?
                                </h2>
                                <p className="mt-0.5 text-xs text-[#999994] sm:text-sm">
                                    Choose all reasons that apply to personalize your study topics.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {motivations.map((mot) => {
                                    const Icon = mot.icon
                                    const isSelected = selectedMotivations.includes(mot.id)
                                    const isMissing = showValidationError && selectedMotivations.length === 0

                                    return (
                                        <button
                                            key={mot.id}
                                            type="button"
                                            onClick={() => {
                                                setShowValidationError(false)
                                                setSelectedMotivations((prev) =>
                                                    prev.includes(mot.id) ? prev.filter((id) => id !== mot.id) : [...prev, mot.id]
                                                )
                                            }}
                                            className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer sm:p-4.5 ${isSelected
                                                ? "border-[#B85C55] bg-[#261717] scale-[1.008]"
                                                : isMissing
                                                    ? "border-[#4A2626] bg-[#181818]/90 hover:border-[#6B3232]"
                                                    : "border-[#2B2B2B] bg-[#181818]/90 hover:border-[#444444] hover:bg-[#1E1E1E]"
                                                }`}
                                        >
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#121212] text-[#C96B62] transition-colors duration-200">
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span
                                                        className={`flex h-5 w-5 items-center justify-center rounded-full bg-[#B85C55] text-white transition-all duration-200 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                                            }`}
                                                    >
                                                        <Check className="h-3 w-3 stroke-[3]" />
                                                    </span>
                                                </div>
                                                <h3 className="mt-3 text-sm font-semibold text-[#E7E5E1] sm:text-base">{mot.title}</h3>
                                                <p className="mt-1 text-xs leading-relaxed text-[#999994]">
                                                    {mot.description}
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <span className="text-[11px] font-semibold tracking-wider text-[#C96B62] uppercase">
                                    Step 03 · Practical Milestones
                                </span>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#E7E5E1] sm:text-xl md:text-2xl">
                                    What would you like to be able to do?
                                </h2>
                                <p className="mt-0.5 text-xs text-[#999994] sm:text-sm">
                                    Pick the practical skills that you intend to use daily.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                                {abilitiesList.map((item) => {
                                    const Icon = item.icon
                                    const isSelected = selectedAbilities.includes(item.label)
                                    const isMissing = showValidationError && selectedAbilities.length === 0

                                    return (
                                        <button
                                            key={item.label}
                                            type="button"
                                            onClick={() => {
                                                setShowValidationError(false)
                                                setSelectedAbilities((prev) =>
                                                    prev.includes(item.label)
                                                        ? prev.filter((a) => a !== item.label)
                                                        : [...prev, item.label]
                                                )
                                            }}
                                            className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-200 cursor-pointer sm:p-3.5 ${isSelected
                                                ? "border-[#B85C55] bg-[#261717] text-[#E7E5E1] scale-[1.008]"
                                                : isMissing
                                                    ? "border-[#4A2626] bg-[#181818]/90 text-[#999994] hover:border-[#6B3232]"
                                                    : "border-[#2B2B2B] bg-[#181818]/90 text-[#999994] hover:border-[#444444] hover:text-[#E7E5E1]"
                                                }`}
                                        >
                                            <Icon
                                                className={`h-4 w-4 shrink-0 transition-colors duration-200 ${isSelected ? "text-[#C96B62]" : "text-[#777770]"
                                                    }`}
                                            />
                                            <span className="text-xs font-medium sm:text-sm">{item.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-5 sm:space-y-6">
                            <div>
                                <span className="text-[11px] font-semibold tracking-wider text-[#C96B62] uppercase">
                                    Step 04 · Routine & Schedule
                                </span>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#E7E5E1] sm:text-xl md:text-2xl">
                                    How much time can you realistically study?
                                </h2>
                                <p className="mt-0.5 text-xs text-[#999994] sm:text-sm">
                                    Set a realistic time commitment to maintain consistent habits.
                                </p>
                            </div>

                            <div className="space-y-4 sm:space-y-5">
                                <div>
                                    <div className="mb-2.5 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-[#C96B62]" />
                                        <h3 className="text-xs font-semibold text-[#E7E5E1] sm:text-sm">Daily Session Duration</h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                                        {studyTimes.map((time) => {
                                            const isSelected = dailyMinutes === time.value
                                            const isMissing = showValidationError && dailyMinutes === null

                                            return (
                                                <button
                                                    key={time.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setDailyMinutes(time.value)
                                                        setShowValidationError(false)
                                                    }}
                                                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${isSelected
                                                        ? "border-[#B85C55] bg-[#261717] scale-[1.01]"
                                                        : isMissing
                                                            ? "border-[#4A2626] bg-[#181818]/90 hover:border-[#6B3232]"
                                                            : "border-[#2B2B2B] bg-[#181818]/90 hover:border-[#444444]"
                                                        }`}
                                                >
                                                    <span className="text-sm font-bold text-[#E7E5E1] sm:text-base">{time.label}</span>
                                                    <span className="mt-1 text-xs leading-relaxed text-[#999994]">
                                                        {time.description}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2.5 flex items-center gap-2">
                                        <Target className="h-4 w-4 text-[#C96B62]" />
                                        <h3 className="text-xs font-semibold text-[#E7E5E1] sm:text-sm">Weekly Frequency</h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                                        {frequencies.map((freq) => {
                                            const isSelected = daysPerWeek === freq.value
                                            const isMissing = showValidationError && daysPerWeek === null

                                            return (
                                                <button
                                                    key={freq.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setDaysPerWeek(freq.value)
                                                        setShowValidationError(false)
                                                    }}
                                                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${isSelected
                                                        ? "border-[#B85C55] bg-[#261717] scale-[1.01]"
                                                        : isMissing
                                                            ? "border-[#4A2626] bg-[#181818]/90 hover:border-[#6B3232]"
                                                            : "border-[#2B2B2B] bg-[#181818]/90 hover:border-[#444444]"
                                                        }`}
                                                >
                                                    <span className="text-sm font-bold text-[#E7E5E1] sm:text-base">{freq.label}</span>
                                                    <span className="mt-1 text-xs leading-relaxed text-[#999994]">
                                                        {freq.description}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div
                                    className={`flex flex-col justify-between gap-1 rounded-xl border border-[#2B2B2B] bg-[#151515] p-3 text-xs text-[#999994] transition-all duration-300 sm:flex-row sm:items-center sm:text-sm ${dailyMinutes && daysPerWeek ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                                        }`}
                                >
                                    <span>Total weekly investment:</span>
                                    <span className="font-semibold text-[#C96B62]">
                                        {dailyMinutes && daysPerWeek
                                            ? `${((dailyMinutes * daysPerWeek) / 60).toFixed(1)} hours / week`
                                            : "0 hours"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                    <span className="text-[11px] font-semibold tracking-wider text-[#C96B62] uppercase">
                                        Step 05 · Skills & Priorities
                                    </span>
                                    <span className="self-start rounded-full border border-[#2B2B2B] bg-[#161616] px-3 py-0.5 text-xs text-[#999994] transition-colors duration-200 sm:self-auto">
                                        {priorityCount} of 2 priorities
                                    </span>
                                </div>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#E7E5E1] sm:text-xl md:text-2xl">
                                    How comfortable are you with each skill?
                                </h2>
                                <p className="mt-0.5 text-xs text-[#999994] sm:text-sm">
                                    Rate comfort level and optionally pick up to two priorities.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {skillOptions.map((item) => {
                                    const Icon = item.icon
                                    const data = skills[item.key]
                                    const isComplete = data.confidence !== null
                                    const isMissing = showValidationError && !isComplete

                                    return (
                                        <div
                                            key={item.key}
                                            className={`flex flex-col justify-between rounded-xl border p-3.5 transition-all duration-200 sm:p-4 ${isMissing
                                                ? "border-[#4A2626] bg-[#181818]/90"
                                                : "border-[#2B2B2B] bg-[#181818]/90"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#121212] text-[#C96B62] transition-colors duration-200">
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-[#E7E5E1] sm:text-base">{item.label}</h3>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!data.priority && priorityCount >= 2) return
                                                        setSkills((prev) => ({
                                                            ...prev,
                                                            [item.key]: { ...prev[item.key], priority: !prev[item.key].priority },
                                                        }))
                                                    }}
                                                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer ${data.priority
                                                        ? "bg-[#B85C55] text-white scale-[1.03]"
                                                        : "border border-[#2B2B2B] bg-[#121212] text-[#999994] hover:text-[#E7E5E1]"
                                                        }`}
                                                >
                                                    {data.priority ? "★ Priority" : "+ Prioritize"}
                                                </button>
                                            </div>

                                            <div className="mt-3.5 grid grid-cols-3 gap-2">
                                                {(
                                                    [
                                                        ["low", "Not yet"],
                                                        ["medium", "A little"],
                                                        ["high", "Comfortable"],
                                                    ] as const
                                                ).map(([val, label]) => (
                                                    <button
                                                        key={val}
                                                        type="button"
                                                        onClick={() => {
                                                            setShowValidationError(false)
                                                            setSkills((prev) => ({
                                                                ...prev,
                                                                [item.key]: { ...prev[item.key], confidence: val },
                                                            }))
                                                        }}
                                                        className={`rounded-lg border py-2 text-xs font-medium transition-all duration-150 cursor-pointer ${data.confidence === val
                                                            ? "border-[#B85C55] bg-[#261717] text-[#E7E5E1]"
                                                            : "border-[#2B2B2B] bg-[#121212] text-[#777770] hover:text-[#E7E5E1]"
                                                            }`}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <span className="text-[11px] font-semibold tracking-wider text-[#C96B62] uppercase">
                                    Step 06 · Experience
                                </span>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#E7E5E1] sm:text-xl md:text-2xl">
                                    Have you studied English before?
                                </h2>
                                <p className="mt-0.5 text-xs text-[#999994] sm:text-sm">
                                    Tell us about your learning background to adjust explanation depth.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStudiedBefore(true)
                                        setShowValidationError(false)
                                    }}
                                    className={`flex flex-col rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${studiedBefore === true
                                        ? "border-[#B85C55] bg-[#261717] scale-[1.01]"
                                        : showValidationError && studiedBefore === null
                                            ? "border-[#4A2626] bg-[#181818]/90 hover:border-[#6B3232]"
                                            : "border-[#2B2B2B] bg-[#181818]/90 hover:border-[#444444]"
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <GraduationCap className="h-5 w-5 text-[#C96B62]" />
                                        <h3 className="text-base font-bold text-[#E7E5E1] sm:text-lg">Yes</h3>
                                    </div>
                                    <p className="mt-1.5 text-xs leading-relaxed text-[#999994] sm:text-sm">
                                        I have previously taken courses, studied with apps, or practiced independently.
                                    </p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStudiedBefore(false)
                                        setStudyExperience(null)
                                        setStudyDuration(null)
                                        setShowValidationError(false)
                                    }}
                                    className={`flex flex-col rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${studiedBefore === false
                                        ? "border-[#B85C55] bg-[#261717] scale-[1.01]"
                                        : showValidationError && studiedBefore === null
                                            ? "border-[#4A2626] bg-[#181818]/90 hover:border-[#6B3232]"
                                            : "border-[#2B2B2B] bg-[#181818]/90 hover:border-[#444444]"
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Sparkles className="h-5 w-5 text-[#C96B62]" />
                                        <h3 className="text-base font-bold text-[#E7E5E1] sm:text-lg">No</h3>
                                    </div>
                                    <p className="mt-1.5 text-xs leading-relaxed text-[#999994] sm:text-sm">
                                        I am starting from ground zero with no previous structured study.
                                    </p>
                                </button>
                            </div>

                            <div
                                className={`space-y-4 transition-all duration-300 ease-in-out sm:space-y-5 ${studiedBefore === true
                                    ? "opacity-100 translate-y-0 pointer-events-auto"
                                    : "opacity-0 -translate-y-2 pointer-events-none max-h-0 overflow-hidden"
                                    }`}
                            >
                                <div>
                                    <h3 className="mb-2 text-xs font-semibold tracking-wider text-[#999994] uppercase">
                                        Primary Study Method
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {studyExperiences.map((exp) => {
                                            const isSelected = studyExperience === exp
                                            const isMissing = showValidationError && !studyExperience

                                            return (
                                                <button
                                                    key={exp}
                                                    type="button"
                                                    onClick={() => {
                                                        setStudyExperience(exp)
                                                        setShowValidationError(false)
                                                    }}
                                                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer sm:text-sm ${isSelected
                                                        ? "border-[#B85C55] bg-[#261717] text-[#E7E5E1] scale-[1.02]"
                                                        : isMissing
                                                            ? "border-[#4A2626] bg-[#181818]/90 text-[#999994] hover:border-[#6B3232]"
                                                            : "border-[#2B2B2B] bg-[#181818]/90 text-[#999994] hover:border-[#444444] hover:text-[#E7E5E1]"
                                                        }`}
                                                >
                                                    {exp}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-xs font-semibold tracking-wider text-[#999994] uppercase">
                                        Approximate Study Duration
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {studyDurations.map((dur) => {
                                            const isSelected = studyDuration === dur
                                            const isMissing = showValidationError && !studyDuration

                                            return (
                                                <button
                                                    key={dur}
                                                    type="button"
                                                    onClick={() => {
                                                        setStudyDuration(dur)
                                                        setShowValidationError(false)
                                                    }}
                                                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer sm:text-sm ${isSelected
                                                        ? "border-[#B85C55] bg-[#261717] text-[#E7E5E1] scale-[1.02]"
                                                        : isMissing
                                                            ? "border-[#4A2626] bg-[#181818]/90 text-[#999994] hover:border-[#6B3232]"
                                                            : "border-[#2B2B2B] bg-[#181818]/90 text-[#999994] hover:border-[#444444] hover:text-[#E7E5E1]"
                                                        }`}
                                                >
                                                    {dur}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 7 && (
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <span className="text-[11px] font-semibold tracking-wider text-[#C96B62] uppercase">
                                    Step 07 · Confirmation
                                </span>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#E7E5E1] sm:text-xl md:text-2xl">
                                    Here's what we learned about you.
                                </h2>
                                <p className="mt-0.5 text-xs text-[#999994] sm:text-sm">
                                    Review your answers before generating your customized journey.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                                <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#181818]/90 p-4 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#121212] text-[#C96B62]">
                                            <Compass className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] text-[#777770]">Your Level</span>
                                            <p className="text-sm font-bold text-[#E7E5E1] sm:text-base">
                                                {selectedLevel ? levels.find((l) => l.id === selectedLevel)?.title : "Not specified"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs font-semibold text-[#C96B62] hover:underline cursor-pointer transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#181818]/90 p-4 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#121212] text-[#C96B62]">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] text-[#777770]">Study Routine</span>
                                            <p className="text-sm font-bold text-[#E7E5E1] sm:text-base">
                                                {dailyMinutes} min/day · {daysPerWeek} days/week
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep(4)}
                                        className="text-xs font-semibold text-[#C96B62] hover:underline cursor-pointer transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div className="rounded-xl border border-[#2B2B2B] bg-[#181818]/90 p-4 transition-colors duration-200 lg:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-[#777770]">
                                            <Target className="h-3.5 w-3.5 text-[#C96B62]" />
                                            <span>Motivations</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="text-xs font-semibold text-[#C96B62] hover:underline cursor-pointer transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className="mt-2.5 flex flex-wrap gap-2">
                                        {selectedMotivations.map((id) => {
                                            const item = motivations.find((m) => m.id === id)
                                            return (
                                                <span
                                                    key={id}
                                                    className="rounded-lg border border-[#B85C55]/30 bg-[#261717] px-3 py-1 text-xs font-medium text-[#ECA39E] transition-all duration-150"
                                                >
                                                    {item?.title ?? id}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-[#2B2B2B] bg-[#181818]/90 p-4 transition-colors duration-200 lg:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-[#777770]">
                                            <Layers className="h-3.5 w-3.5 text-[#C96B62]" />
                                            <span>Target Abilities ({selectedAbilities.length})</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="text-xs font-semibold text-[#C96B62] hover:underline cursor-pointer transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className="mt-2.5 flex flex-wrap gap-2">
                                        {selectedAbilities.map((ab) => (
                                            <span
                                                key={ab}
                                                className="rounded-lg border border-[#2B2B2B] bg-[#141414] px-3 py-1 text-xs font-medium text-[#999994] transition-all duration-150"
                                            >
                                                {ab}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-[#2B2B2B] bg-[#181818]/90 p-4 transition-colors duration-200 lg:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-[#777770]">Skills & Comfort</span>
                                        <button
                                            type="button"
                                            onClick={() => setStep(5)}
                                            className="text-xs font-semibold text-[#C96B62] hover:underline cursor-pointer transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                                        {skillOptions.map(({ key, label }) => {
                                            const data = skills[key]
                                            return (
                                                <div key={key} className="rounded-lg border border-[#2B2B2B] bg-[#121212] p-3 transition-all duration-200">
                                                    <span className="text-[10px] font-semibold text-[#777770] uppercase">{label}</span>
                                                    <p className="mt-0.5 text-xs font-bold capitalize text-[#E7E5E1] sm:text-sm">
                                                        {data.confidence ?? "Unrated"}
                                                    </p>
                                                    {data.priority && (
                                                        <span className="mt-1 inline-block rounded bg-[#B85C55]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#C96B62]">
                                                            Priority
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* acoes de navegacao */}
                <div className="mt-6 flex items-center justify-between border-t border-[#2B2B2B]/80 pt-4 sm:mt-8 sm:pt-5">
                    <button
                        type="button"
                        disabled={step === 1 || isLoading}
                        onClick={() => {
                            setShowValidationError(false)
                            setStep((curr) => Math.max(curr - 1, 1))
                        }}
                        className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#999994] transition-all duration-200 hover:text-[#E7E5E1] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed sm:text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </button>

                    {step < totalSteps ? (
                        <button
                            type="button"
                            onClick={handleNextStep}
                            className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold text-white transition-all duration-200 cursor-pointer sm:px-6 sm:py-2.5 sm:text-sm ${!isCurrentStepValid
                                ? "bg-[#B85C55]/50 hover:bg-[#B85C55]/70"
                                : "bg-[#B85C55] hover:bg-[#C96B62] active:scale-95"
                                }`}
                        >
                            <span>Continue</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={handleCreateJourney}
                            className="flex items-center gap-2 rounded-xl bg-[#B85C55] px-6 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#C96B62] active:scale-95 disabled:opacity-50 cursor-pointer sm:text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    <span>Generating Journey...</span>
                                </>
                            ) : (
                                <>
                                    <span>Launch My Journey</span>
                                    <Sparkles className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}