import { useState } from "react"
import { Check, Save, LogOut, Camera, Mail, AtSign, User } from "lucide-react"

import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../services/auth";


export default function Settings() {
    const { user } = useAuth()
    const [isSaved, setIsSaved] = useState(false)

    const navigate = useNavigate();

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const [loggingOut, setLoggingOut] = useState(false);

    // Estado do Perfil (Pronto para plugar no Supabase)
    const [profile, setProfile] = useState({
        name: user?.user_metadata?.name || "",
        handle: "---",
        email: user?.email || "",
        role: "Front-End Developer",
        bio: "Estudando para entrevistas internacionais e documentação técnica.",
    })

    const firstLetterName = user?.user_metadata?.name?.charAt(0).toUpperCase() || "E";

    const handleSave = () => {
        setIsSaved(true)

        // Lógica futura: await supabase.from('profiles').update(...)

        setTimeout(() => setIsSaved(false), 2000)
    }

    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            await signOut();

            setToast({
                message: "Logout realizado com sucesso.",
                type: "success",
            });

            navigate("/", { replace: true });

        } catch (error) {
            console.error(error);

            setToast({
                message: "Não foi possível sair da conta.",
                type: "error",
            });

            setLoggingOut(false);
        }
    };



    console.log(user)

    return (
        <section className="mx-auto w-full max-w-3xl space-y-6 pb-10">
            <div className="flex flex-col justify-between gap-4 border-b border-[#222226] pb-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-xl font-bold text-white sm:text-2xl">
                        Perfil do Usuário
                    </h1>

                    <p className="text-xs text-zinc-500">
                        Gerencie suas informações pessoais e acesso à conta.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#141416] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-red-900/50 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <LogOut size={14} />
                        {loggingOut ? "Saindo..." : "Sair"}
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#C96B62] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                    >
                        {isSaved ? <Check size={14} /> : <Save size={14} />}
                        {isSaved ? "Salvo!" : "Salvar"}
                    </button>
                </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-[#26262B] bg-[#121214] p-5 sm:p-6">

                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0">
                        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-[#49302E] bg-[#6D3833] font-mono text-base font-bold text-white">
                            {firstLetterName}
                        </div>

                        <button
                            type="button"
                            title="Trocar avatar"
                            className="absolute -bottom-1 -right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-[#2B2B2B] bg-[#1E1E22] text-zinc-300 hover:text-white"
                        >
                            <Camera size={11} />
                        </button>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-white">
                            {profile.name}
                        </h2>

                        <p className="font-mono text-xs text-zinc-500">
                            @{profile.handle}
                        </p>
                    </div>
                </div>

                {/* Campos do Formulário */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                            <User size={13} className="text-zinc-500" /> Nome
                        </label>

                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full rounded-xl border border-[#26262B] bg-[#18181B] px-3 py-2 text-xs text-white outline-none focus:border-[#C96B62]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                            <AtSign size={13} className="text-zinc-500" /> Username
                        </label>

                        <input
                            type="text"
                            value={profile.handle}
                            onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                            className="w-full rounded-xl border border-[#26262B] bg-[#18181B] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#C96B62]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                            <Mail size={13} className="text-zinc-500" /> Email
                        </label>

                        <input
                            type="email"
                            disabled
                            value={profile.email}
                            className="w-full cursor-not-allowed rounded-xl border border-[#222226] bg-[#141416] px-3 py-2 font-mono text-xs text-zinc-500"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                            Área / Foco
                        </label>

                        <input
                            type="text"
                            value={profile.role}
                            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            className="w-full rounded-xl border border-[#26262B] bg-[#18181B] px-3 py-2 text-xs text-white outline-none focus:border-[#C96B62]"
                        />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">

                        <label className="text-xs font-medium text-zinc-300">
                            Bio / Objetivo
                        </label>

                        <textarea
                            rows={2}
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            className="w-full resize-none rounded-xl border border-[#26262B] bg-[#18181B] px-3 py-2 text-xs text-white outline-none focus:border-[#C96B62]"
                        />
                    </div>

                </div>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                />
            )}

        </section>
    )
}