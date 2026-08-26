import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Compass, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { CompassRose } from "../components/CompassRose";

export function AuthPage() {
    const navigate = useNavigate();

    const [mode, setMode] = useState<"login" | "signup">("signup");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("isLogin", "true");
        navigate(mode === "signup" ? "/onboarding" : "/dashboard");
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0D0D0D] p-6 lg:p-10 text-[#E7E5E1]">
            <div className="grid w-full max-w-[1360px] min-h-[640px] overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] lg:grid-cols-2 shadow-2xl">

                {/* Lado Esquerdo */}
                <div className="relative flex flex-col justify-between border-b border-[#242424] bg-[#111111] p-10 lg:border-b-0 lg:border-r lg:p-16 overflow-hidden">
                    <div className="pointer-events-none absolute -bottom-20 -left-20 opacity-15">
                        <CompassRose className="h-96 w-96" />
                    </div>

                    <Link to="/" className="flex items-center gap-3 z-10 w-fit transition-opacity hover:opacity-80">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A1D1C] text-[#C96B62] border border-[#C96B62]/30">
                            <Compass size={20} strokeWidth={2} />
                        </div>
                        <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#C96B62]">
                            English Journey
                        </span>
                    </Link>

                    <div className="my-auto py-8 z-10">
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C96B62] mb-3">
                            Adaptive Learning System
                        </p>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                            Learn. Practice. <br />
                            <span className="text-[#C96B62]">Improve with focus.</span>
                        </h1>
                        <p className="mt-4 text-sm leading-relaxed text-[#8E8E88] max-w-md">
                            A structured English learning journey designed around your real level, career focus, and daily 20-minute momentum.
                        </p>
                    </div>

                    <div className="border-t border-[#222222] pt-5 z-10">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#666660]">
                            Small steps. Big dreams. Keep flying.
                        </p>
                    </div>
                </div>

                {/* Lado Direito */}
                <div className="flex flex-col justify-between bg-[#141414] p-10 lg:p-16">
                    <div className="flex justify-end">
                        <div className="flex rounded-xl border border-[#262626] bg-[#0E0E0E] p-1.5 font-mono text-xs">
                            <button
                                type="button"
                                onClick={() => setMode("signup")}
                                className={`rounded-lg px-5 py-2 font-semibold transition-all ${mode === "signup" ? "bg-[#C96B62] text-white shadow" : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("login")}
                                className={`rounded-lg px-5 py-2 font-semibold transition-all ${mode === "login" ? "bg-[#C96B62] text-white shadow" : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Log In
                            </button>
                        </div>
                    </div>

                    <div className="my-auto mx-auto w-full max-w-lg py-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                {mode === "signup" ? "Create your account" : "Welcome back"}
                            </h2>
                            <p className="mt-1.5 text-sm text-[#8E8E88]">
                                {mode === "signup"
                                    ? "Start building your customized journey today."
                                    : "Log in to continue your daily streak."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            {mode === "signup" && (
                                <div>
                                    <label className="text-xs font-semibold text-[#A0A09A]">Name</label>
                                    <div className="mt-2 flex items-center gap-3.5 rounded-xl border border-[#262626] bg-[#0E0E0E] px-4 py-3.5 focus-within:border-[#C96B62] transition-colors">
                                        <User size={18} className="text-[#666660] shrink-0" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full border-none bg-transparent p-0 text-sm text-white placeholder-[#4A4A48] outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-semibold text-[#A0A09A]">Email</label>
                                <div className="mt-2 flex items-center gap-3.5 rounded-xl border border-[#262626] bg-[#0E0E0E] px-4 py-3.5 focus-within:border-[#C96B62] transition-colors">
                                    <Mail size={18} className="text-[#666660] shrink-0" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="teste@gmail.com"
                                        className="w-full border-none bg-transparent p-0 text-sm text-white placeholder-[#4A4A48] outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-[#A0A09A]">Password</label>
                                    {mode === "login" && (
                                        <button type="button" className="text-xs text-[#777770] hover:text-[#C96B62]">
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className="mt-2 flex items-center gap-3.5 rounded-xl border border-[#262626] bg-[#0E0E0E] px-4 py-3.5 focus-within:border-[#C96B62] transition-colors">
                                    <Lock size={18} className="text-[#666660] shrink-0" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border-none bg-transparent p-0 text-sm text-white placeholder-[#4A4A48] outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-[#666660] hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C96B62] py-4 text-sm font-semibold text-white shadow-lg shadow-[#C96B62]/10 transition-colors hover:bg-[#B85C55] active:scale-[0.99]"
                            >
                                {mode === "signup" ? "Create Account & Continue" : "Log In"} <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>

                    <div className="text-center font-mono text-[11px] text-[#555550]">
                        By continuing, you agree to English Journey Terms & Privacy Policy.
                    </div>
                </div>

            </div>
        </div>
    );
}