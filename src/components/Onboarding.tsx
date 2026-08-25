// @ts-nocheck

import { useState } from "react"

export default function Onboarding() {

    const [step, setStep] = useState(1)
    const [selectedMotivations, setSelectedMotivations] = useState<string[]>([])
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

    const [selectedAbilities, setSelectedAbilities] = useState<string[]>([])

    const [dailyMinutes, setDailyMinutes] = useState<number | null>(null)
    const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null)

    const [studiedBefore, setStudiedBefore] = useState<boolean | null>(null)
    const [studyExperience, setStudyExperience] = useState<string | null>(null)
    const [studyDuration, setStudyDuration] = useState<string | null>(null)

    const totalSteps = 7

    const levels = [
        {
            id: "A1",
            title: "Beginner",
            description:
                "I can understand and use very basic words, greetings and simple expressions.",
        },
        {
            id: "A2",
            title: "Elementary",
            description:
                "I can understand simple sentences and communicate in familiar everyday situations.",
        },
        {
            id: "B1",
            title: "Intermediate",
            description:
                "I can talk about familiar topics, experiences and everyday situations.",
        },
        {
            id: "B2",
            title: "Upper Intermediate",
            description:
                "I can communicate with confidence and understand more complex conversations and texts.",
        },
        {
            id: "unsure",
            title: "I'm not sure",
            description:
                "That's okay. We'll help you discover the right starting point.",
        },
    ]

    const motivations = [
        {
            id: "travel",
            title: "Travel",
            description:
                "I want to communicate in English when traveling.",
        },
        {
            id: "work",
            title: "Work",
            description:
                "I want to use English in my professional life.",
        },
        {
            id: "study",
            title: "Study",
            description:
                "I want to study or access content in English.",
        },
        {
            id: "communication",
            title: "Communication",
            description:
                "I want to communicate with people from other countries.",
        },
        {
            id: "personal-development",
            title: "Personal Development",
            description:
                "I want to improve myself and learn English.",
        },
        {
            id: "other",
            title: "Other",
            description:
                "I have another reason for learning English.",
        },
    ]

    const abilities = [
        "Introduce myself",
        "Have simple conversations",
        "Travel",
        "Order food",
        "Ask for directions",
        "Talk about my daily life",
        "Talk about work",
        "Understand videos",
        "Understand songs",
        "Write messages",
        "Talk to foreigners",
        "Participate in meetings",
    ]

    const studyTimes = [
        { value: 10, label: "10 min" },
        { value: 20, label: "20 min" },
        { value: 30, label: "30 min" },
        { value: 45, label: "45+ min" },
    ]

    const frequencies = [
        { value: 3, label: "3 days / week" },
        { value: 5, label: "5 days / week" },
        { value: 7, label: "Every day" },
    ]

    const [skills, setSkills] = useState({
        speaking: {
            confidence: null,
            priority: false,
        },
        listening: {
            confidence: null,
            priority: false,
        },
        reading: {
            confidence: null,
            priority: false,
        },
        writing: {
            confidence: null,
            priority: false,
        },
    })

    const skillOptions = [
        "speaking",
        "listening",
        "reading",
        "writing",
    ]

    const studyExperiences = [
        "At school",
        "Courses",
        "Self-study",
        "Private lessons",
        "Other",
    ]

    const studyDurations = [
        "Less than 6 months",
        "6–12 months",
        "1–2 years",
        "2+ years",
    ]

    return (
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
            <div className="mb-10 flex items-center justify-between">

                <div>
                    <span className="text-sm font-semibold tracking-wide text-[#C96B62]"> ENGLISH JOURNEY</span>
                    <h1 className="mt-2 text-2xl font-bold"> Let's build your journey.</h1>
                </div>

                <span className="text-sm text-[#777770]">
                    Step {step} of {totalSteps}
                </span>

            </div>

            <div className="mb-10 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                <div
                    className="h-full rounded-full bg-[#B85C55] transition-all duration-300"
                    style={{
                        width: `${(step / totalSteps) * 100}%`,
                    }} />
            </div>


            <div className="flex-1">

                {step === 1 && (
                    <div className="mt-8 grid gap-4">
                        {levels.map((level) => (
                            <button
                                key={level.id}
                                type="button"
                                onClick={() => setSelectedLevel(level.id)}
                                className={`rounded-2xl border p-5 text-left transition-colors ${selectedLevel === level.id
                                    ? "border-[#B85C55] bg-[#2A2020]"
                                    : "border-[#2B2B2B] bg-[#1D1D1D] hover:border-[#B85C55]"
                                    }`}>
                                <h3 className="font-semibold">
                                    {level.id} — {level.title}
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-[#999994]">
                                    {level.description}
                                </p>
                            </button>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div>
                            <p className="text-sm font-medium text-[#C96B62]">
                                STEP 2
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Why do you want to learn English?
                            </h2>

                            <p className="mt-3 max-w-2xl text-[#999994]">
                                Choose the reasons that best describe why English
                                is important to you.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {motivations.map((motivation) => {
                                const isSelected = selectedMotivations.includes(motivation.id)

                                return (
                                    <button key={motivation.id} type="button"
                                        onClick={() =>
                                            setSelectedMotivations((current) => {
                                                if (current.includes(motivation.id)) {
                                                    return current.filter(
                                                        (id) => id !== motivation.id
                                                    )
                                                }

                                                return [
                                                    ...current,
                                                    motivation.id
                                                ]
                                            })
                                        }
                                        className={`rounded-2xl border p-5 text-left transition-colors cursor-pointer ${isSelected
                                            ? "border-[#B85C55] bg-[#2A2020]"
                                            : "border-[#2B2B2B] bg-[#1D1D1D] hover:border-[#B85C55]"
                                            }`}>
                                        <h3 className="font-semibold">
                                            {motivation.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-relaxed text-[#999994]">
                                            {motivation.description}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#C96B62]">
                                Real-life English
                            </p>
                            <h2 className="mt-2 text-3xl font-bold">
                                What would you like to be able to do?
                            </h2>
                            <p className="mt-3 text-[#999994]">
                                Select the situations and abilities that matter most to you.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">

                            {abilities.map((ability) => {
                                const isSelectedAB = selectedAbilities.includes(ability)

                                return (
                                    <button key={ability} type="button"
                                        onClick={() => {
                                            setSelectedAbilities((current) => {
                                                if (current.includes(ability)) {
                                                    return current.filter((item) => item !== ability)
                                                }
                                                return [...current, ability]
                                            })
                                        }}
                                        className={`rounded-xl border px-4 py-3 text-sm transition-all ${isSelectedAB
                                            ? "border-[#B85C55] bg-[#2A2020] text-[#E7E5E1]"
                                            : "border-[#2B2B2B] bg-[#1D1D1D] text-[#999994] hover:border-[#444444] hover:text-[#E7E5E1]"
                                            }`}>
                                        {ability}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#C96B62]">
                                Your routine
                            </p>
                            <h2 className="mt-2 text-3xl font-bold">
                                How much time can you realistically study?
                            </h2>

                            <p className="mt-3 max-w-2xl text-[#999994]">
                                We'll use this to build a study routine that fits your life.
                            </p>
                        </div>

                        <div className="mb-10">

                            <h3 className="mb-4 font-semibold">Daily study time</h3>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {studyTimes.map((time) => {
                                    const selected = dailyMinutes === time.value
                                    return (
                                        <button
                                            key={time.value}
                                            type="button"
                                            onClick={() => setDailyMinutes(time.value)}
                                            className={`rounded-xl border p-4 transition-all ${selected
                                                ? "border-[#B85C55] bg-[#2A2020]"
                                                : "border-[#2B2B2B] bg-[#1D1D1D] text-[#999994] hover:border-[#444444]"
                                                }`}
                                        >
                                            {time.label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold">How often?</h3>
                            <div className="grid gap-3 md:grid-cols-3">
                                {frequencies.map((frequency) => {
                                    const selected = daysPerWeek === frequency.value

                                    return (
                                        <button
                                            key={frequency.value}
                                            type="button"
                                            onClick={() => setDaysPerWeek(frequency.value)}
                                            className={`rounded-xl border p-4 transition-all ${selected
                                                ? "border-[#B85C55] bg-[#2A2020]"
                                                : "border-[#2B2B2B] bg-[#1D1D1D] text-[#999994] hover:border-[#444444]"
                                                }`}
                                        >
                                            {frequency.label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#C96B62]">
                                Your skills
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                How comfortable are you with each skill?
                            </h2>
                            <p className="mt-3 max-w-2xl text-[#999994]">
                                Tell us how you feel about each skill and choose up to two
                                priorities.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {skillOptions.map((skill) => {

                                const data = skills[skill]

                                return (
                                    <div key={skill}
                                        className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                                        <div className="flex items-center justify-between">

                                            <h3 className="font-semibold capitalize"> {skill}</h3>
                                            <button
                                                type="button"
                                                onClick={() => {

                                                    const priorityCont = Object.values(skills).filter(
                                                        (skill) => skill.priority
                                                    ).length

                                                    if (!skills[skill].priority && priorityCont >= 2) {
                                                        return
                                                    }

                                                    setSkills((current) => ({
                                                        ...current,
                                                        [skill]: {
                                                            ...current[skill],
                                                            priority: !current[skill].priority,
                                                        },
                                                    }))
                                                }}
                                                className={`rounded-full px-3 py-1.5 text-xs font-medium ${data.priority
                                                    ? "bg-[#B85C55] text-white"
                                                    : "bg-[#2B2B2B] text-[#999994]"
                                                    }`}>

                                                {data.priority
                                                    ? "Priority"
                                                    : "Make priority"}
                                            </button>
                                        </div>

                                        <div className="mt-4 grid grid-cols-3 gap-2">
                                            {[
                                                ["low", "Not yet"],
                                                ["medium", "A little"],
                                                ["high", "Comfortable"],
                                            ].map(([value, label]) => (

                                                <button key={value}
                                                    type="button"
                                                    onClick={() => {
                                                        setSkills((current) => ({
                                                            ...current, [skill]: { ...current[skill], confidence: value, },
                                                        }))
                                                    }}
                                                    className={`rounded-lg border py-2 text-sm ${data.confidence === value
                                                        ? "border-[#B85C55] bg-[#2A2020]"
                                                        : "border-[#2B2B2B] text-[#999994]"
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
                    <div>
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#C96B62]">
                                Your experience
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">Have you studied English before?</h2>
                            <p className="mt-3 text-[#999994]">
                                Tell us a little about your previous experience with English.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button type="button"
                                onClick={() => setStudiedBefore(true)}
                                className={`rounded-2xl border p-5 text-left transition-all ${studiedBefore === true
                                    ? "border-[#B85C55] bg-[#2A2020]"
                                    : "border-[#2B2B2B] bg-[#1D1D1D] hover:border-[#444444]"
                                    }`}>

                                <h3 className="font-semibold">Yes</h3>

                                <p className="mt-2 text-sm text-[#999994]">
                                    I've studied English before.
                                </p>
                            </button>

                            <button type="button"
                                onClick={() => {
                                    setStudiedBefore(false)
                                    setStudyExperience(null)
                                    setStudyDuration(null)
                                }}
                                className={`rounded-2xl border p-5 text-left transition-all ${studiedBefore === false
                                    ? "border-[#B85C55] bg-[#2A2020]"
                                    : "border-[#2B2B2B] bg-[#1D1D1D] hover:border-[#444444]"
                                    }`}>

                                <h3 className="font-semibold">No</h3>

                                <p className="mt-2 text-sm text-[#999994]">
                                    I'm starting from the beginning.
                                </p>
                            </button>
                        </div>

                        {studiedBefore === true && (
                            <>
                                <div className="mt-8">

                                    <h3 className="mb-4 font-semibold">
                                        How did you study?
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {studyExperiences.map((experience) => {
                                            const selected =
                                                studyExperience === experience
                                            return (
                                                <button
                                                    key={experience}
                                                    type="button"
                                                    onClick={() =>
                                                        setStudyExperience(experience)
                                                    }
                                                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${selected
                                                        ? "border-[#B85C55] bg-[#2A2020] text-[#E7E5E1]"
                                                        : "border-[#2B2B2B] text-[#999994] hover:text-[#E7E5E1]"
                                                        }`}>
                                                    {experience}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="mb-4 font-semibold">
                                        For how long?
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {studyDurations.map((duration) => {
                                            const selected =
                                                studyDuration === duration
                                            return (
                                                <button
                                                    key={duration}
                                                    type="button"
                                                    onClick={() =>
                                                        setStudyDuration(duration)
                                                    }
                                                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${selected
                                                        ? "border-[#B85C55] bg-[#2A2020] text-[#E7E5E1]"
                                                        : "border-[#2B2B2B] text-[#999994] hover:text-[#E7E5E1]"
                                                        }`}>
                                                    {duration}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {step === 7 && (
                    <div>
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#C96B62]">
                                Your journey
                            </p>
                            <h2 className="mt-2 text-3xl font-bold">
                                Here's what we learned about you.
                            </h2>

                            <p className="mt-3 max-w-2xl text-[#999994]">
                                Review your answers before we create your English journey.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                                <p className="text-sm text-[#777770]">
                                    Your level
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    {selectedLevel}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                                <p className="text-sm text-[#777770]">
                                    Why you want to learn English
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {selectedMotivations.map((motivation) => (
                                        <span
                                            key={motivation}
                                            className="rounded-full bg-[#2A2020] px-3 py-1.5 text-sm text-[#C96B62]">
                                            {motivation}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                                <p className="text-sm text-[#777770]">
                                    What you want to be able to do
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {selectedAbilities.map((ability) => (
                                        <span
                                            key={ability}
                                            className="rounded-full bg-[#2A2020] px-3 py-1.5 text-sm text-[#C96B62]">
                                            {ability}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                                <p className="text-sm text-[#777770]">
                                    Your study routine
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    {dailyMinutes} minutes · {daysPerWeek} days per week
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                                <p className="text-sm text-[#777770]">
                                    Your skills
                                </p>
                                <div className="mt-3 space-y-2">
                                    {Object.entries(skills).map(
                                        ([skill, data]) => (
                                            <div
                                                key={skill}
                                                className="flex items-center justify-between">
                                                <span className="capitalize">
                                                    {skill}
                                                </span>

                                                <span className="text-sm text-[#999994]">
                                                    {data.confidence}
                                                    {data.priority && " · Priority"}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                                <p className="text-sm text-[#777770]">
                                    Previous experience
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    {studiedBefore ? "Yes" : "No"}
                                </h3>

                                {studiedBefore && (
                                    <p className="mt-1 text-sm text-[#999994]">
                                        {studyExperience} · {studyDuration}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className="mt-12 flex items-center justify-between border-t border-[#2B2B2B] pt-6">
                <button type="button" disabled={step === 1}
                    onClick={() =>
                        setStep((current) =>
                            Math.max(current - 1, 1)
                        )
                    }
                    className="text-sm text-[#999994] disabled:opacity-30">
                    Back
                </button>

                {step < totalSteps ? (
                    <button type="button"
                        disabled={
                            (step === 1 && selectedLevel === null) ||
                            (step === 2 && selectedMotivations.length === 0) ||
                            (step === 3 && selectedAbilities.length === 0) ||
                            (step === 4 && (dailyMinutes === null || daysPerWeek === null)) ||
                            (step === 5 && !Object.values(skills).every(
                                (skill) => skill.confidence !== null
                            )) ||
                            (step === 6 &&
                                (studiedBefore === null) ||
                                (studiedBefore === true &&
                                    (studyExperience === null ||
                                        studyDuration === null
                                    )
                                )
                            )
                        }

                        onClick={() =>
                            setStep((current) =>
                                Math.min(current + 1, totalSteps)
                            )
                        }
                        className="rounded-xl bg-[#B85C55] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C96B62]">
                        Continue
                    </button>

                ) : (
                    <button type="button"
                        onClick={() => {
                            const journeyProfile = {
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

                            console.log("JOURNEY PROFILE:", journeyProfile)
                        }}
                        className="rounded-xl bg-[#B85C55] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C96B62]">
                        Create my journey
                    </button>
                )}
            </div>
        </section >
    )
}

/* fazer tratamento de empy */
/* tipar esse tsx e remover o anule la em cima */