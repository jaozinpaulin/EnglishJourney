import { useState } from "react"
import { ArrowRight, Compass, Eye, EyeOff, User } from "lucide-react"

export function AuthPage({
    initialMode = "signup",
    onSuccess
}: {
    initialMode?: "login" | "signup"
    onSuccess: (userData: { name: string; email: string; isNewUser: boolean }) => void
}) {
    const [mode, setMode] = useState<"login" | "signup">(initialMode)
    const [name, setName] = useState("João")
    const [email, setEmail] = useState("joao@developer.io")
    const [password, setPassword] = useState("••••••••")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSuccess({ name: name || "Learner", email, isNewUser: mode === "signup" })
    }

    return (
        <section className="mx-auto flex min-h-[92vh] w-full max-w-[1500px] items-center justify-center p-4 lg:p-10">
            <div className="grid min-h-[700px] w-full overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#171717] lg:grid-cols-2">

                {/* Lado Esquerdo: Identidade & Textos Centralizados */}
                <div className="flex flex-col justify-between items-center text-center border-b border-[#2B2B2B] bg-[#1A1A1A] p-8 sm:p-14 lg:border-b-0 lg:border-r">
                    {/* Topo: Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A2020] text-[#C96B62]">
                            <Compass size={20} strokeWidth={2} />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C96B62]">English Journey</span>
                    </div>

                    {/* Centro: Hero Text */}
                    <div className="my-auto max-w-md py-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                            Learn. Practice. <br />
                            <span className="text-[#C96B62]">Improve with focus.</span>
                        </h1>
                        <p className="mt-4 text-sm leading-relaxed text-[#999994]">
                            A structured English learning journey designed around your real level, career focus, and daily 20-minute momentum.
                        </p>
                    </div>

                    {/* Base: Frase Oficial do Projeto */}
                    <div className="w-full border-t border-[#2B2B2B] pt-6">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#C96B62]">
                            Small steps. Big dreams. Keep flying.
                        </p>
                    </div>
                </div>

                {/* Lado Direito: Formulario */}
                <div className="flex flex-col justify-between bg-[#1D1D1D] p-8 sm:p-14">
                    {/* Switcher */}
                    <div className="flex justify-end">
                        <div className="flex rounded-xl border border-[#2B2B2B] bg-[#171717] p-1 font-mono text-xs">
                            <button
                                type="button"
                                onClick={() => setMode("signup")}
                                className={`rounded-lg px-4 py-1.5 font-semibold transition-colors ${mode === "signup" ? "bg-[#C96B62] text-white" : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("login")}
                                className={`rounded-lg px-4 py-1.5 font-semibold transition-colors ${mode === "login" ? "bg-[#C96B62] text-white" : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Log In
                            </button>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="my-auto mx-auto w-full max-w-md py-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">
                                {mode === "signup" ? "Create your account" : "Welcome back"}
                            </h2>
                            <p className="mt-1 text-xs text-[#999994]">
                                {mode === "signup"
                                    ? "Start building your customized journey today."
                                    : "Log in to continue your daily streak."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            {mode === "signup" && (
                                <div>
                                    <label className="text-xs font-semibold text-[#B7B7B2]">Name</label>
                                    <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[#2B2B2B] bg-[#151515] px-3.5 py-2.5">
                                        <User size={15} className="text-[#777770]" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full bg-transparent text-xs text-white placeholder-[#555] outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-semibold text-[#B7B7B2]">Email</label>
                                <div className="mt-1.5 rounded-xl border border-[#2B2B2B] bg-[#151515] px-3.5 py-2.5">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-transparent text-xs text-white placeholder-[#555] outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-[#B7B7B2]">Password</label>
                                    {mode === "login" && (
                                        <button type="button" className="text-[11px] text-[#777770] hover:text-[#C96B62]">
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#2B2B2B] bg-[#151515] px-3.5 py-2.5">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-transparent text-xs text-white placeholder-[#555] outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-[#777770] hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C96B62] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55]"
                            >
                                {mode === "signup" ? "Create Account & Continue" : "Log In"} <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="text-center font-mono text-[10px] text-[#666]">
                        By continuing, you agree to English Journey Terms & Privacy Policy.
                    </div>
                </div>

            </div>
        </section>
    )
}