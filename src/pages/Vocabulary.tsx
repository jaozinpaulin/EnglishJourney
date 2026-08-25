import { ArrowRight, BookMarked, CheckCircle2, ChevronRight, Filter, Flame, Layers, Play, Plus, RotateCcw, Search, Sparkles, Volume2, Zap } from "lucide-react"
import A1 from "../../JSONS/A1.json"

console.log(A1)
interface VocabularyDeck {
    id: string
    title: string
    category: string
    totalWords: number
    masteredWords: number
    level: string
}

interface RecentWord {
    id: string
    word: string
    phonetic: string
    translation: string
    type: string
    level: string
    mastery: number
}

const decks: VocabularyDeck[] = [
    { id: "1", title: "Daily Routines & Habits", category: "General", totalWords: 40, masteredWords: 28, level: "A1" },
    { id: "2", title: "Travel & Airport Essentials", category: "Travel", totalWords: 35, masteredWords: 12, level: "A2" },
    { id: "3", title: "Tech & Software Workspace", category: "Professional", totalWords: 50, masteredWords: 45, level: "B1" },
    { id: "4", title: "Socializing & Informal Chat", category: "Conversation", totalWords: 30, masteredWords: 8, level: "A2" },
]

const recentWords: RecentWord[] = [
    { id: "w1", word: "Overwhelmed", phonetic: "/ˌoʊ.vɚˈwelmd/", translation: "Sobrecarregado", type: "adj", level: "B1", mastery: 85 },
    { id: "w2", word: "Schedule", phonetic: "/ˈskedʒ.uːl/", translation: "Cronograma / Agendar", type: "noun / verb", level: "A2", mastery: 100 },
    { id: "w3", word: "Reliable", phonetic: "/rɪˈlaɪ.ə.bəl/", translation: "Confiável", type: "adj", level: "B1", mastery: 40 },
    { id: "w4", word: "Enhance", phonetic: "/ɪnˈhæns/", translation: "Melhorar / Aprimorar", type: "verb", level: "B2", mastery: 20 },
]

export default function Vocabulary() {
    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">Vocabulary Lab</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Word Mastery</h1>
                    <p className="mt-1 text-sm text-[#999994]">Expand and practice your active English vocabulary bank.</p>
                </div>

                {/* stats topo */}
                <div className="flex items-center gap-4 rounded-xl border border-[#2B2B2B] bg-[#1A1A1A] p-2.5 sm:gap-6 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A2020] text-[#C96B62]">
                            <BookMarked size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">482</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">saved words</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#202326] text-[#8BA9AD]">
                            <CheckCircle2 size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">314</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">mastered</span>
                        </div>
                    </div>

                    <div className="hidden h-6 w-px bg-[#2B2B2B] sm:block" />

                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242126] text-[#A78BC7]">
                            <Flame size={18} strokeWidth={1.8} />
                        </div>
                        <div className="leading-tight">
                            <strong className="block font-mono text-sm font-semibold text-white">18/day</strong>
                            <span className="text-[10px] uppercase tracking-wider text-[#777770]">practice avg</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-5">
                    <div className="overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                        <div className="flex items-center justify-between border-b border-[#2B2B2B] px-6 py-3.5">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Daily Flashcard Session</p>
                            <span className="font-mono text-xs text-[#777770]">Card 4 of 15</span>
                        </div>

                        <div className="grid gap-6 p-6 md:grid-cols-[1fr_260px] md:items-center">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-md bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">Adjective</span>
                                    <span className="rounded-md bg-[#2A2020] px-2 py-0.5 font-mono text-[10px] text-[#C96B62]">B2 Level</span>
                                </div>

                                <div className="mt-3 flex items-center gap-3">
                                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Resilient</h2>
                                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#292929] text-[#999994] transition-colors hover:bg-[#C96B62] hover:text-white">
                                        <Volume2 size={18} />
                                    </button>
                                </div>
                                <p className="mt-1 font-mono text-xs text-[#777770]">/rɪˈzɪl.jənt/</p>

                                <div className="mt-5 border-t border-[#2B2B2B] pt-4">
                                    <p className="text-xs font-semibold text-[#999994]">Definition & Context</p>
                                    <p className="mt-1 text-sm text-[#E7E5E1]">Able to quickly recover from difficult conditions or adapt to challenges.</p>
                                    <p className="mt-2 text-xs italic text-[#777770]">"The engineering team remained resilient despite the tight deadlines."</p>
                                </div>
                            </div>

                            {/* acoes do flashcard */}
                            <div className="flex flex-col gap-2.5 rounded-xl border border-[#2B2B2B] bg-[#171717] p-4">
                                <span className="text-[11px] font-semibold text-[#999994]">How well do you know it?</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <button type="button" className="rounded-lg border border-[#3A2222] bg-[#221717] py-2 font-mono text-xs text-[#C96B62] transition-colors hover:bg-[#3A2222]">Hard</button>
                                    <button type="button" className="rounded-lg border border-[#2B2B2B] bg-[#1F1F1F] py-2 font-mono text-xs text-[#E7E5E1] transition-colors hover:bg-[#2B2B2B]">Good</button>
                                    <button type="button" className="rounded-lg border border-[#1F2B26] bg-[#14211B] py-2 font-mono text-xs text-[#62C99B] transition-colors hover:bg-[#1F2B26]">Easy</button>
                                </div>
                                <button type="button" className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C96B62] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                                    Next Card <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* decks de vocabulario */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-white">Study Decks</h2>
                            <button type="button" className="flex items-center gap-1.5 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                                <Plus size={14} /> Create Deck
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {decks.map((deck) => {
                                const progress = Math.round((deck.masteredWords / deck.totalWords) * 100)
                                return (
                                    <div key={deck.id} className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 transition-colors hover:border-[#3A3A3A]">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-md bg-[#242126] px-2 py-0.5 font-mono text-[10px] text-[#A78BC7]">{deck.category}</span>
                                                <span className="rounded-md bg-[#292929] px-2 py-0.5 font-mono text-[10px] text-[#777770]">{deck.level}</span>
                                            </div>
                                            <span className="font-mono text-xs text-[#999994]">{deck.masteredWords}/{deck.totalWords} words</span>
                                        </div>

                                        <h3 className="mt-3 text-base font-semibold text-white">{deck.title}</h3>

                                        <div className="mt-4">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-[#777770]">Mastery</span>
                                                <span className="font-mono text-[#C96B62]">{progress}%</span>
                                            </div>
                                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                                <div className="h-full rounded-full bg-[#C96B62]" style={{ width: `${progress}%` }} />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-[#2B2B2B] pt-3.5">
                                            <span className="flex items-center gap-1 text-[11px] text-[#777770]">
                                                <Layers size={13} /> Flashcards
                                            </span>
                                            <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                                                Practice <ArrowRight size={13} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D]">
                        <div className="flex flex-col gap-3 border-b border-[#2B2B2B] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-white">Recent Saved Words</h2>
                                <p className="text-xs text-[#999994]">Words captured from your daily lessons and chats.</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 rounded-lg border border-[#2B2B2B] bg-[#171717] px-2.5 py-1.5 text-xs text-[#999994]">
                                    <Search size={14} />
                                    <input type="text" placeholder="Search words..." className="w-28 bg-transparent text-xs text-white placeholder-[#555] outline-none sm:w-36" />
                                </div>
                                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#171717] text-[#999994] transition-colors hover:text-white">
                                    <Filter size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="divide-y divide-[#2B2B2B]">
                            {recentWords.map((item) => (
                                <div key={item.id} className="flex flex-col justify-between gap-3 p-4 transition-colors hover:bg-[#202020] sm:flex-row sm:items-center sm:px-6">
                                    <div className="flex items-center gap-3.5">
                                        <button type="button" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#292929] text-[#999994] transition-colors hover:bg-[#C96B62] hover:text-white">
                                            <Volume2 size={15} />
                                        </button>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <strong className="text-sm font-semibold text-white">{item.word}</strong>
                                                <span className="font-mono text-xs text-[#777770]">{item.phonetic}</span>
                                                <span className="rounded bg-[#292929] px-1.5 py-0.2 font-mono text-[9px] text-[#A78BC7]">{item.level}</span>
                                            </div>
                                            <p className="text-xs text-[#999994]">{item.translation} • <span className="italic text-[#777770]">{item.type}</span></p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-24 text-right">
                                            <span className="font-mono text-[10px] text-[#777770]">{item.mastery}% Retained</span>
                                            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#2B2B2B]">
                                                <div className="h-full rounded-full bg-[#C96B62]" style={{ width: `${item.mastery}%` }} />
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-[#555]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* lateral */}
                <aside className="space-y-5">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C96B62]">Daily Word Sprint</p>
                            <Zap size={16} className="text-[#C96B62]" />
                        </div>

                        <div className="mt-4 text-center">
                            <span className="font-mono text-3xl font-bold text-white">10 / 15</span>
                            <p className="mt-1 text-xs text-[#999994]">Words reviewed today</p>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                <div className="h-full rounded-full bg-[#C96B62]" style={{ width: "66%" }} />
                            </div>
                        </div>

                        <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C96B62] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]">
                            <Play size={13} fill="currentColor" /> Quick Sprint (3 min)
                        </button>
                    </div>

                    {/* repeticao espacada */}
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-white">SRS Queue</h2>
                            <RotateCcw size={15} className="text-[#777770]" />
                        </div>
                        <p className="mt-1 text-xs text-[#999994]">Words due for memory refresh.</p>

                        <div className="mt-4 space-y-2.5">
                            <div className="flex items-center justify-between rounded-xl bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-xs text-[#E7E5E1]">Due Right Now</span>
                                <strong className="font-mono text-xs text-[#C96B62]">12 words</strong>
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-xs text-[#E7E5E1]">Due Tomorrow</span>
                                <strong className="font-mono text-xs text-[#999994]">24 words</strong>
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-xs text-[#E7E5E1]">Next 7 Days</span>
                                <strong className="font-mono text-xs text-[#777770]">68 words</strong>
                            </div>
                        </div>

                        <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2B2B2B] bg-[#242424] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2B2B2B]">
                            Clear Today's Queue <ArrowRight size={13} />
                        </button>
                    </div>

                    <div className="rounded-2xl border border-[#3D2624] bg-gradient-to-b from-[#211717] to-[#1D1D1D] p-5">
                        <div className="flex items-center gap-2 text-[#C96B62]">
                            <Sparkles size={16} />
                            <span className="text-xs font-semibold">AI Context Booster</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#B7B7B2]">
                            You often confuse <span className="font-mono text-white underline">Borrow</span> and <span className="font-mono text-white underline">Lend</span>. Would you like a targeted mini-exercise?
                        </p>
                        <button type="button" className="mt-4 text-xs font-semibold text-[#C96B62] transition-colors hover:text-white">
                            Fix confusion →
                        </button>
                    </div>
                </aside>
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