import { useState } from "react"
import { Check, Save, Volume2, Bell, Clock, Trash2, Flame, BookOpen, Sparkles, UserCheck } from "lucide-react"


export default function Settings() {
    const [accent, setAccent] = useState("US")
    const [dailyGoal, setDailyGoal] = useState("30")
    const [voiceSpeed, setVoiceSpeed] = useState("1.0x")
    const [autoPlayAudio, setAutoPlayAudio] = useState(true)
    const [srsNotifications, setSrsNotifications] = useState(true)
    const [isSaved, setIsSaved] = useState(false)

    // Dados do Usuário / Estatísticas
    const userProfile = {
        name: "João Paulo",
        handle: "@jaozinpaulin",
        role: "Front-End Developer",
        level: "Intermediate (B1)",
        streak: 18,
        wordsMastered: 482,
        xpTotal: 3450,
    }

    const handleSave = () => {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    return (
        <section className="mx-auto w-full max-w-[1500px] space-y-6">
            {/* Header */}
            <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C96B62]">EnglishJourney • App</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">Configurações & Perfil</h1>
                <p className="mt-1 text-sm text-[#999994]">Gerencie suas metas de estudo, voz da IA e acompanhe o resumo da sua conta.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                <div className="space-y-5">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5 sm:p-6 space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                                <Clock size={15} className="text-[#C96B62]" /> Meta Diária de Estudo
                            </label>
                            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
                                {[
                                    { val: "15", label: "Casual (15m)" },
                                    { val: "30", label: "Regular (30m)" },
                                    { val: "45", label: "Intenso (45m)" },
                                    { val: "60", label: "Hardcore (60m)" },
                                ].map((item) => (
                                    <button
                                        key={item.val}
                                        type="button"
                                        onClick={() => setDailyGoal(item.val)}
                                        className={`rounded-xl border p-2.5 text-center font-medium transition-all ${dailyGoal === item.val
                                            ? "border-[#C96B62] bg-[#2A2020] text-white shadow-[0_0_10px_rgba(201,107,98,0.2)]"
                                            : "border-[#2B2B2B] bg-[#171717] text-[#777770] hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Configuração de Voz */}
                        <div className="grid grid-cols-1 gap-4 pt-4 border-t border-[#262626] sm:grid-cols-2">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                                    <Volume2 size={15} className="text-[#8BA9AD]" /> Sotaque da Pronúncia
                                </label>
                                <div className="mt-2.5 flex rounded-xl border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs">
                                    {[
                                        { id: "US", label: "American" },
                                        { id: "UK", label: "British" },
                                        { id: "AUS", label: "Aussie" },
                                    ].map((acc) => (
                                        <button
                                            key={acc.id}
                                            type="button"
                                            onClick={() => setAccent(acc.id)}
                                            className={`flex-1 rounded-lg py-1.5 font-medium transition-all ${accent === acc.id ? "bg-[#C96B62] text-white font-semibold" : "text-[#777770] hover:text-white"
                                                }`}
                                        >
                                            {acc.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-neutral-300">Velocidade de Fala</label>
                                <div className="mt-2.5 flex rounded-xl border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs">
                                    {["0.8x", "1.0x", "1.2x"].map((spd) => (
                                        <button
                                            key={spd}
                                            type="button"
                                            onClick={() => setVoiceSpeed(spd)}
                                            className={`flex-1 rounded-lg py-1.5 font-medium transition-all ${voiceSpeed === spd ? "bg-[#292929] text-white font-semibold" : "text-[#777770] hover:text-white"
                                                }`}
                                        >
                                            {spd}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3.5 border-t border-[#262626] pt-4">
                            <label className="flex cursor-pointer items-center justify-between">
                                <div>
                                    <span className="block text-xs font-semibold text-white">Áudio Automático</span>
                                    <span className="text-[11px] text-[#777770]">Tocar pronúncia ao virar flashcards</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={autoPlayAudio}
                                    onChange={() => setAutoPlayAudio(!autoPlayAudio)}
                                    className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 accent-[#C96B62]"
                                />
                            </label>

                            <label className="flex cursor-pointer items-center justify-between">
                                <div>
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                                        <Bell size={13} className="text-[#A78BC7]" /> Lembretes de Repetição Espaçada (SRS)
                                    </span>
                                    <span className="text-[11px] text-[#777770]">Notificar cards prontos para revisão</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={srsNotifications}
                                    onChange={() => setSrsNotifications(!srsNotifications)}
                                    className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 accent-[#C96B62]"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => alert("Progresso de estudo resetado.")}
                            className="flex items-center gap-1.5 text-xs text-red-400/80 transition-colors hover:text-red-400"
                        >
                            <Trash2 size={13} /> Resetar banco de memória SRS
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 rounded-xl bg-[#C96B62] px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#B85C55]"
                        >
                            {isSaved ? <Check size={14} /> : <Save size={14} />}
                            {isSaved ? "Salvo com sucesso!" : "Salvar Alterações"}
                        </button>
                    </div>
                </div>

                <aside className="space-y-5">
                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <div className="flex items-center gap-3 border-b border-[#2B2B2B] pb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6D3833] to-[#2A2020] font-mono text-base font-bold text-white border border-[#49302E]">
                                JP
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-sm font-bold text-white">{userProfile.name}</h3>
                                    <UserCheck size={13} className="text-[#62C99B]" />
                                </div>
                                <p className="font-mono text-xs text-[#777770]">{userProfile.handle}</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2.5 font-mono text-xs">
                            <div className="flex items-center justify-between rounded-xl bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-[#999994]">Nível Atual</span>
                                <span className="font-semibold text-[#8BA9AD]">{userProfile.level}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-[#171717] p-2.5 border border-[#242424]">
                                <span className="text-[#999994]">Função / Foco</span>
                                <span className="text-white">{userProfile.role}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#2B2B2B] bg-[#1D1D1D] p-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#777770] mb-3">
                            Métricas de Desempenho
                        </h4>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] p-3 text-center">
                                <Flame size={16} className="text-[#C96B62] mb-1" />
                                <strong className="text-sm font-bold text-white font-mono">{userProfile.streak}</strong>
                                <span className="text-[10px] text-[#777770]">Dias de Ofensiva</span>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] p-3 text-center">
                                <BookOpen size={16} className="text-[#8BA9AD] mb-1" />
                                <strong className="text-sm font-bold text-white font-mono">{userProfile.wordsMastered}</strong>
                                <span className="text-[10px] text-[#777770]">Cards Dominados</span>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-xl border border-[#2B2B2B] bg-[#171717] p-3 text-center">
                                <Sparkles size={16} className="text-[#A78BC7] mb-1" />
                                <strong className="text-sm font-bold text-white font-mono">{userProfile.xpTotal}</strong>
                                <span className="text-[10px] text-[#777770]">XP Acumulado</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
}


/*
================================================================================
ENGLISH JOURNEY — PRÓXIMOS PASSOS
================================================================================

ESTADO ATUAL
- Supabase conectado e funcionando.
- Keys configuradas no .env.
- Sign Up funcionando.
- Login funcionando.
- Confirmação de email funcionando pelo Supabase.
- Validações de email e senha implementadas.
- Tratamento de loading, sucesso e erros implementado.
- Form usando onSubmit + noValidate.
- Settings criada/reorganizada.
- Perfil dentro da Settings está mockado por enquanto.
- Sidebar possui perfil + engrenagem → /settings.
- Ainda NÃO estamos usando os dados reais do perfil.
- Ainda NÃO temos Route Guard / proteção das rotas.
- Ainda NÃO temos persistência do perfil/learning profile.

PRÓXIMA ETAPA — AUTH
1. Finalizar completamente o fluxo de Login.
2. Melhorar todos os tratamentos de erro do Supabase.
3. Adicionar Login com Google.
4. Trabalhar com a sessão real do Supabase.
5. Fazer o usuário permanecer logado ao recarregar a página.
6. Fazer Login → entrar automaticamente no App.
7. Implementar proteção das rotas internas.
8. Implementar Logout.
9. Verificar email confirmado.
10. Mostrar aviso dentro do App caso o email ainda não esteja confirmado.
11. Adicionar opção de reenviar confirmação de email.
12. Revisar o fluxo completo:
    Landing → Auth → Sign Up/Login → Session → App.

DEPOIS DO AUTH — PERFIL DO USUÁRIO
1. Criar estrutura real de Profile no Supabase.
2. Associar Profile ao usuário do Supabase Auth.
3. Buscar os dados reais na Settings.
4. Permitir editar informações do perfil.
5. Definir quais informações pertencem ao Auth
   e quais pertencem ao Profile/Learning Profile.

DEPOIS — LEARNING PROFILE / ONBOARDING
1. Definir as informações que precisamos coletar do aluno.
2. Objetivo de aprender inglês.
3. Experiência anterior.
4. Contexto de uso do inglês.
5. Preferências e necessidades.
6. Tempo disponível para estudar.
7. Outras informações relevantes para personalização.
8. Criar o fluxo de onboarding.
9. Salvar essas informações no Supabase.

DEPOIS — CURRÍCULO PERSONALIZADO
Aluno
  ↓
Profile
  ↓
Learning Profile
  ↓
Diagnóstico
  ↓
Nível / Capacidades
  ↓
Currículo
  ↓
Jornada
  ↓
Atividades
  ↓
Evidências de aprendizagem
  ↓
Personalização da jornada

IMPORTANTE
- Não pular etapas.
- Primeiro finalizar a fundação do Auth.
- Depois estruturar Profile/Learning Profile.
- Depois construir o currículo personalizado.
- Não colocar IA antes de definirmos corretamente os dados,
  currículo, progressão e regras pedagógicas.
- O currículo deve seguir nossa arquitetura já definida:
  Can-Do + comunicação + tarefas + spiral learning + recycling.
- O aluno não deve simplesmente "receber um nível".
  Precisamos construir o perfil e usar evidências para orientar
  a jornada.

COMMIT DE HOJE
feat: improve auth flow and settings page

================================================================================
RETOMAR DAQUI
================================================================================
*/