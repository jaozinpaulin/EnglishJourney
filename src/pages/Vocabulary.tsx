import { useState } from "react"
import { ArrowRight, Check, ChevronRight, Flame, Plus, Search, Sparkles, Volume2, } from "lucide-react"

interface WordData {
    word: string
    phonetic: string
    level?: string
    partOfSpeech: string
    translation: string
    definition: string
    example: string
    synonyms?: string[]
    collocations?: string[]
    conceptTip?: string
}

interface SuggestedWord {
    word: string
    translation: string
    level: string
    category: string
}

const dictionaryData: Record<string, WordData> = {
    resilient: {
        word: "Resilient",
        phonetic: "/rɪˈzɪl.jənt/",
        level: "B2",
        partOfSpeech: "adjective",
        translation: "Resiliente, que se recupera rápido",
        definition: "Able to withstand or recover quickly from difficult conditions or sudden shock.",
        example: "The engineering team remained resilient despite the tight delivery schedule.",
        synonyms: ["Adaptable", "Tough", "Flexible", "Persistent"],
        collocations: ["Highly resilient", "Stay resilient", "Resilient system"],
        conceptTip: "Muito usado para descrever equilíbrio mental ou código e sistemas à prova de falhas.",
    },
    enhance: {
        word: "Enhance",
        phonetic: "/ɪnˈhæns/",
        level: "B2",
        partOfSpeech: "verb",
        translation: "Melhorar, elevar qualidade",
        definition: "Intensify, increase, or further improve the quality, value, or extent of something.",
        example: "Clean layout architecture will drastically enhance the user experience.",
        synonyms: ["Improve", "Boost", "Upgrade", "Elevate"],
        collocations: ["Enhance performance", "Enhance skills", "Greatly enhance"],
        conceptTip: "Usado quando algo já é bom e você quer deixá-lo com padrão ainda superior.",
    },
    overwhelmed: {
        word: "Overwhelmed",
        phonetic: "/ˌoʊ.vɚˈwelmd/",
        level: "B1",
        partOfSpeech: "adjective",
        translation: "Sobrecarregado de tarefas",
        definition: "Having too much of something to deal with, feeling weighed down by excessive work.",
        example: "He felt overwhelmed by the amount of unread notifications.",
        synonyms: ["Swamped", "Overloaded", "Stressed"],
        collocations: ["Feel overwhelmed", "Easily overwhelmed"],
        conceptTip: "Termo essencial para conversas de trabalho ao negociar prazos ou pedir ajuda.",
    },
    leverage: {
        word: "Leverage",
        phonetic: "/ˈlev.ɚ.ɪdʒ/",
        level: "B2",
        partOfSpeech: "verb / noun",
        translation: "Alavancar, tirar vantagem de",
        definition: "Use something to maximum advantage or obtain leverage in a process.",
        example: "We can leverage modern CSS features to build responsive interfaces faster.",
        synonyms: ["Utilize", "Exploit", "Capitalize"],
        collocations: ["Leverage resources", "Leverage technology"],
        conceptTip: "Palavra onipresente em reuniões técnicas e corporativas.",
    },
}

const sidebarSuggestions: SuggestedWord[] = [
    { word: "Leverage", translation: "Alavancar, utilizar como vantagem", level: "B2", category: "Tech & Work" },
    { word: "Enhance", translation: "Melhorar, elevar qualidade", level: "B2", category: "General" },
    { word: "Overwhelmed", translation: "Sobrecarregado de tarefas", level: "B1", category: "Daily" },
    { word: "Resilient", translation: "Resiliente, adaptável a choques", level: "B2", category: "Mindset" },
]

export default function Vocabulary() {
    const [query, setQuery] = useState("")
    const [result, setResult] = useState<WordData | null>(dictionaryData.resilient)
    const [saved, setSaved] = useState(false)

    const searchWord = (term: string) => {
        const key = term.trim().toLowerCase()
        if (!key) return

        if (dictionaryData[key]) {
            setResult(dictionaryData[key])
        } else {
            setResult({
                word: term.trim(),
                phonetic: "/.../",
                level: "B1",
                partOfSpeech: "termo",
                translation: "Tradução simulada (integre com sua API)",
                definition: "Definição automática que virá do backend de dicionário.",
                example: `Context sentence showcasing the application of "${term.trim()}".`,
                synonyms: [],
                collocations: [],
                conceptTip: "Nuance conceitual fornecida após conexão externa.",
            })
        }
        setSaved(false)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        searchWord(query)
    }

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            <div className="flex flex-col justify-between gap-4 border-b border-[#262626] pb-5 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Vocabulário & Tradutor</h1>
                    <p className="mt-0.5 text-xs text-[#8A8A85]">Consulte vocabulário, entenda a nuance de uso e salve para memorizar.</p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#242424] bg-[#161616] px-3.5 py-2 text-xs text-[#C96B62]">
                    <Flame size={15} />
                    <span className="font-mono font-semibold">6 dias de prática</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="space-y-5">
                    <form onSubmit={onSubmit} className="w-full">
                        <div className="group flex items-center rounded-2xl border border-[#2B2B2B] bg-[#161616] p-2 transition-all focus-within:border-[#C96B62]">
                            <Search size={20} className="ml-3 text-[#666] group-focus-within:text-[#C96B62]" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Pesquise um termo (ex: leverage, enhance, resilient)..."
                                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-[#555] outline-none"
                            />
                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-xl bg-[#C96B62] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                            >
                                Buscar <ArrowRight size={14} />
                            </button>
                        </div>
                    </form>

                    {result && (
                        <div className="rounded-2xl border border-[#242424] bg-[#161616] p-6 sm:p-7">
                            <div className="flex flex-col justify-between gap-4 border-b border-[#222222] pb-5 sm:flex-row sm:items-start">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-3xl font-bold tracking-tight text-white">{result.word}</h2>
                                        <button
                                            type="button"
                                            aria-label="Pronúncia"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#222222] text-[#8A8A85] transition-colors hover:bg-[#C96B62] hover:text-white"
                                        >
                                            <Volume2 size={16} />
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="font-mono text-xs text-[#7A7A75]">{result.phonetic}</span>
                                        {result.level && (
                                            <span className="rounded bg-[#251A19] px-2 py-0.5 font-mono text-[11px] text-[#C96B62]">
                                                {result.level}
                                            </span>
                                        )}
                                        <span className="rounded bg-[#202020] px-2 py-0.5 text-xs text-[#8A8A85]">
                                            {result.partOfSpeech}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSaved(!saved)}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${saved
                                        ? "border border-[#1F3D2C] bg-[#14261B] text-[#55BA82]"
                                        : "border border-[#2B2B2B] bg-[#202020] text-white hover:border-[#3D3D3D]"
                                        }`}
                                >
                                    {saved ? <><Check size={14} /> Salvo no Deck</> : <><Plus size={14} /> Salvar Palavra</>}
                                </button>
                            </div>

                            <div className="mt-5 space-y-5">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">Significado / Tradução</span>
                                    <p className="mt-1 text-base font-semibold text-white">{result.translation}</p>
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">Definição</span>
                                    <p className="mt-1 text-xs leading-relaxed text-[#B0B0AA]">{result.definition}</p>
                                </div>

                                <div className="rounded-xl border border-[#222222] bg-[#111111] p-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">Exemplo Prático</span>
                                    <p className="mt-1 text-xs italic text-[#E5E5E0]">"{result.example}"</p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-[#222222] bg-[#121212] p-3.5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">Termos Semelhantes</span>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {(result.synonyms ?? []).length > 0 ? (
                                                result.synonyms?.map((item, idx) => (
                                                    <button
                                                        key={`${item}-${idx}`}
                                                        type="button"
                                                        onClick={() => {
                                                            setQuery(item)
                                                            searchWord(item)
                                                        }}
                                                        className="rounded-md border border-[#242424] bg-[#1A1A1A] px-2 py-0.5 text-xs text-[#A0A09B] transition-colors hover:border-[#C96B62] hover:text-white"
                                                    >
                                                        {item}
                                                    </button>
                                                ))
                                            ) : (
                                                <span className="text-xs text-[#555]">Nenhum termo similar registrado.</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-[#222222] bg-[#121212] p-3.5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A75]">Combinações Comuns</span>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {(result.collocations ?? []).length > 0 ? (
                                                result.collocations?.map((item, idx) => (
                                                    <span
                                                        key={`${item}-${idx}`}
                                                        className="rounded-md border border-[#242424] bg-[#1A1A1A] px-2 py-0.5 font-mono text-[11px] text-[#7A7A75]"
                                                    >
                                                        {item}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-[#555]">Sem combinações registradas.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {result.conceptTip && (
                                    <div className="rounded-xl border border-[#331C1A] bg-[#1A1414] p-3.5">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C96B62]">
                                            <Sparkles size={14} />
                                            <span>Conceito & Aplicação Prática</span>
                                        </div>
                                        <p className="mt-1 text-xs text-[#B8AAA8] leading-relaxed">{result.conceptTip}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <aside className="space-y-4">
                    <div className="rounded-2xl border border-[#242424] bg-[#161616] p-4">
                        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                            <div>
                                <h3 className="text-sm font-semibold text-white">Explorar Vocabulário</h3>
                                <p className="text-[11px] text-[#7A7A75]">Termos essenciais para praticar</p>
                            </div>
                            <span className="rounded bg-[#202020] px-2 py-0.5 text-[10px] text-[#8A8A85]">
                                {sidebarSuggestions.length} palavras
                            </span>
                        </div>

                        <div className="mt-3 divide-y divide-[#202020]">
                            {sidebarSuggestions.map((item, idx) => (
                                <button
                                    key={`${item.word}-${idx}`}
                                    type="button"
                                    onClick={() => {
                                        setQuery(item.word)
                                        searchWord(item.word)
                                    }}
                                    className="group flex w-full items-center justify-between py-3 text-left transition-colors hover:bg-[#1A1A1A] px-2 rounded-lg"
                                >
                                    <div className="pr-2">
                                        <div className="flex items-center gap-2">
                                            <strong className="text-sm font-medium text-white group-hover:text-[#C96B62]">
                                                {item.word}
                                            </strong>
                                            <span className="rounded bg-[#222222] px-1.5 py-0.2 font-mono text-[9px] text-[#8A8A85]">
                                                {item.level}
                                            </span>
                                        </div>
                                        <p className="mt-0.5 text-xs text-[#8A8A85] line-clamp-1">{item.translation}</p>
                                        <span className="text-[10px] text-[#555]">{item.category}</span>
                                    </div>

                                    <ChevronRight size={14} className="shrink-0 text-[#444] group-hover:text-white transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
}