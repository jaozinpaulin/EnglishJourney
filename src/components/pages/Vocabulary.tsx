interface VocabularyWord {
    id: string
    word: string
    translation: string
    example: string
    status: "New" | "Learning" | "Mastered"
}

const DAILY_VOCABULARY_GOAL = 15

const words: VocabularyWord[] = [
    {
        id: "1",
        word: "Improve",
        translation: "Melhorar",
        example: "I want to improve my English.",
        status: "Learning",
    },
    {
        id: "2",
        word: "Routine",
        translation: "Rotina",
        example: "I have a study routine.",
        status: "New",
    },
    {
        id: "3",
        word: "Achieve",
        translation: "Alcançar",
        example: "I want to achieve my goals.",
        status: "Learning",
    },
    {
        id: "4",
        word: "Journey",
        translation: "Jornada",
        example: "Learning English is a long journey.",
        status: "Mastered",
    },
    {
        id: "5",
        word: "Practice",
        translation: "Praticar",
        example: "I practice English every day.",
        status: "Learning",
    },
    {
        id: "6",
        word: "Improve",
        translation: "Melhorar",
        example: "Practice helps me improve.",
        status: "New",
    },
]

export default function Vocabulary() {
    return (
        <section className="mx-auto max-w-6xl">

            <div>
                <h1 className="text-3xl font-bold text-[#E7E5E1]">
                    Vocabulary
                </h1>

                <p className="mt-2 text-[#999994]">
                    Build your vocabulary, one word at a time.
                </p>
            </div>

            <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#E7E5E1]">
                            Today's Vocabulary
                        </h2>

                        <p className="mt-1 text-sm text-[#999994]">
                            {DAILY_VOCABULARY_GOAL} words to practice today.
                        </p>
                    </div>

                    <span className="text-sm font-medium text-[#C96B62]">
                        0 / {DAILY_VOCABULARY_GOAL} completed
                    </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#2B2B2B]">
                    <div className="h-full w-0 rounded-full bg-[#B85C55]" />
                </div>
            </div>

            <div className="mt-10">

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-[#E7E5E1]">
                        Your Words
                    </h2>

                    <p className="mt-1 text-sm text-[#999994]">
                        Words you are currently learning.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {words.map((word) => (
                        <article
                            key={word.id}
                            className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 transition-colors hover:border-[#B85C55]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-[#E7E5E1]">
                                        {word.word}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-[#C96B62]">
                                        {word.translation}
                                    </p>
                                </div>

                                <span className="rounded-full bg-[#2A2020] px-2.5 py-1 text-xs font-medium text-[#C96B62]">
                                    {word.status}
                                </span>
                            </div>

                            <div className="mt-5 border-t border-[#2B2B2B] pt-4">
                                <p className="text-sm leading-relaxed text-[#999994]">
                                    "{word.example}"
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="mt-10 rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-6">

                <div>
                    <h2 className="text-xl font-semibold text-[#E7E5E1]">
                        Dictionary
                    </h2>

                    <p className="mt-1 text-sm text-[#999994]">
                        Search for a new word and add it to your vocabulary.
                    </p>
                </div>

                <div className="mt-5 flex gap-3">
                    <input
                        type="text"
                        placeholder="Search a new word..."
                        className="min-w-0 flex-1 rounded-lg border border-[#2B2B2B] bg-[#151515] px-4 py-2.5 text-sm text-[#E7E5E1] outline-none placeholder:text-[#666660] focus:border-[#B85C55]"
                    />

                    <button
                        type="button"
                        className="rounded-lg bg-[#B85C55] px-5 py-2.5 text-sm font-medium text-[#F3F1ED] transition-colors hover:bg-[#C96B62]"
                    >
                        Search
                    </button>
                </div>
            </div>

        </section>
    )
}


/*
    FUTURE VOCABULARY IDEAS
    ------------------------

    Base:
    - Daily vocabulary goal
    - Vocabulary progress
    - Word cards
    - Word status: New / Learning / Mastered
    - Dictionary search

    Visual improvements:
    - Vocabulary statistics
        - Words learned
        - Words learning
        - Words to review
    - Word filters
        - All
        - New
        - Learning
        - Mastered
    - Start studying button
    - Word of the Day

    Word details:
    - Pronunciation
    - Phonetic transcription
    - Audio pronunciation
    - More example sentences
    - Related expressions

    Study system:
    - Vocabulary study session
    - Mark word as learned
    - Review later
    - Vocabulary history
    - Spaced repetition
    - Review schedule

    Dictionary API:
    - Search external dictionary API
    - Retrieve definitions
    - Retrieve translations
    - Retrieve pronunciation
    - Retrieve examples
    - Retrieve audio
    - Add searched word to personal vocabulary

    User data:
    - Save vocabulary per user
    - Store learned words
    - Store review history
    - Store mastery level
    - Track vocabulary progress

    Future:
    - Connect vocabulary data to Progress page
    - Personalized daily vocabulary
    - Vocabulary statistics
    - Firebase / Firestore persistence
*/