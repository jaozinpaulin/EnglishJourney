import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Compass, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

import { CompassRose } from "../components/CompassRose";
import { signUp, signIn } from "../services/auth";

export function AuthPage() {
    const location = useLocation();
    const initialMode = location.state?.mode === "login" ? "login" : "signup";
    const navigate = useNavigate();
    const [mode, setMode] = useState<"login" | "signup">(initialMode);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!email.trim()) {
            setError("Please enter your email.");
            return false;
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValidEmail) {
            setError("Please enter a valid email.");
            return false;
        }

        if (!password) {
            setError("Please enter your password.");
            return false;
        }

        if (mode === "signup") {
            if (password.length < 8) {
                setError("Password must be at least 8 characters.");
                return false;
            }

            if (!/[a-z]/.test(password)) {
                setError("Password must contain a lowercase letter.");
                return false;
            }

            if (!/[A-Z]/.test(password)) {
                setError("Password must contain an uppercase letter.");
                return false;
            }

            if (!/\d/.test(password)) {
                setError("Password must contain a number.");
                return false;
            }

            if (!/[^A-Za-z0-9]/.test(password)) {
                setError("Password must contain a symbol.");
                return false;
            }
        }

        return true;
    };

    const getAuthErrorMessage = (error: unknown) => {
        if (error instanceof Error) {
            if (error.message === "Invalid login credentials") {
                return "Invalid email or password.";
            }
        }

        return "Something went wrong. Please try again.";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!validateForm()) return;

        try {
            setLoading(true);

            if (mode === "signup") {
                await signUp(email, password, name);

                setSuccess("Account created! Check your email to confirm your account.");
                navigate("/dashboard");

                setEmail("");
                setPassword("");
            }

            if (mode === "login") {
                await signIn(email, password);

                setSuccess("Login successful!");
                navigate("/dashboard");

                setEmail("");
                setPassword("");
            }
        } catch (error) {
            console.error("Authentication error:", error);

            setError(getAuthErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0D0D0D] p-4 text-[#E7E5E1] sm:p-6 lg:p-10">
            <div className="grid min-h-[640px] w-full max-w-[1360px] overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] shadow-2xl lg:grid-cols-2">

                {/* Left Side (Branding) */}
                <div className="relative flex flex-col justify-between overflow-hidden border-b border-[#242424] bg-[#111111] p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-16">
                    <div className="pointer-events-none absolute -bottom-20 -left-20 opacity-15">
                        <CompassRose className="h-96 w-96" />
                    </div>

                    <Link to="/" className="z-10 flex w-fit items-center gap-3 transition-opacity hover:opacity-80">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C96B62]/30 bg-[#2A1D1C] text-[#C96B62]">
                            <Compass size={20} strokeWidth={2} />
                        </div>

                        <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#C96B62]">
                            English Journey
                        </span>
                    </Link>

                    <div className="z-10 my-auto py-8">
                        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C96B62]">
                            Adaptive Learning System
                        </p>

                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Learn. Practice. <br />
                            <span className="text-[#C96B62]">
                                Improve with focus.
                            </span>
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8E8E88]">
                            A structured English learning journey designed around
                            your real level, career focus, and daily 20-minute momentum.
                        </p>
                    </div>

                    <div className="z-10 border-t border-[#222222] pt-5">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#666660]">
                            Small steps. Big dreams. Keep flying.
                        </p>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="flex flex-col justify-between bg-[#141414] p-6 sm:p-10 lg:p-16">

                    {/* Mode Toggle */}
                    <div className="flex justify-end">
                        <div className="flex rounded-xl border border-[#262626] bg-[#0E0E0E] p-1.5 font-mono text-xs">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode("signup");
                                    setError("");
                                    setSuccess("");
                                }}
                                className={`cursor-pointer rounded-lg px-5 py-2 font-semibold transition-all ${mode === "signup"
                                    ? "bg-[#C96B62] text-white shadow"
                                    : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMode("login");
                                    setError("");
                                    setSuccess("");
                                }}
                                className={`cursor-pointer rounded-lg px-5 py-2 font-semibold transition-all ${mode === "login"
                                    ? "bg-[#C96B62] text-white shadow"
                                    : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Log In
                            </button>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="mx-auto my-auto w-full max-w-lg py-6">
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

                        <form onSubmit={handleSubmit} noValidate className="mt-8">

                            {/* Name Input with Smooth Opacity & Height Transition */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${mode === "signup"
                                    ? "grid-rows-[1fr] opacity-100 mb-4"
                                    : "grid-rows-[0fr] opacity-0 pointer-events-none mb-0"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <label className="text-xs font-semibold text-[#A0A09A]">
                                        Name
                                    </label>

                                    <div className="mt-2 flex items-center gap-3.5 rounded-xl border border-[#262626] bg-[#0E0E0E] px-4 py-3.5 transition-colors focus-within:border-[#C96B62]">
                                        <User size={18} className="shrink-0 text-[#666660]" />

                                        <input
                                            type="text"
                                            placeholder="Seu nome"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            tabIndex={mode === "signup" ? 0 : -1}
                                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#555550]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="mb-4">
                                <label className="text-xs font-semibold text-[#A0A09A]">
                                    Email
                                </label>

                                <div className="mt-2 flex items-center gap-3.5 rounded-xl border border-[#262626] bg-[#0E0E0E] px-4 py-3.5 transition-colors focus-within:border-[#C96B62]">
                                    <Mail size={18} className="shrink-0 text-[#666660]" />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="teste@gmail.com"
                                        className="w-full border-none bg-transparent p-0 text-sm text-white outline-none placeholder-[#4A4A48]"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-[#A0A09A]">
                                        Password
                                    </label>

                                    <div
                                        className={`transition-opacity duration-300 ${mode === "login" ? "opacity-100" : "opacity-0 pointer-events-none"
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            className="cursor-pointer text-xs text-[#777770] transition-colors hover:text-[#C96B62]"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center gap-3.5 rounded-xl border border-[#262626] bg-[#0E0E0E] px-4 py-3.5 transition-colors focus-within:border-[#C96B62]">
                                    <Lock size={18} className="shrink-0 text-[#666660]" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border-none bg-transparent p-0 text-sm text-white outline-none placeholder-[#4A4A48]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer text-[#666660] transition-colors hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Feedback Messages */}
                            {error && (
                                <p className="mb-4 text-sm text-red-400">
                                    {error}
                                </p>
                            )}

                            {success && (
                                <p className="mb-4 text-sm text-green-400">
                                    {success}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C96B62] py-4 text-sm font-semibold text-white shadow-lg shadow-[#C96B62]/10 transition-colors hover:bg-[#B85C55] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading
                                    ? mode === "signup"
                                        ? "Creating Account..."
                                        : "Logging In..."
                                    : mode === "signup"
                                        ? "Create Account & Continue"
                                        : "Log In"}

                                {!loading && <ArrowRight size={16} />}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="text-center font-mono text-[11px] text-[#555550]">
                        By continuing, you agree to English Journey Terms & Privacy Policy.
                    </div>

                </div>
            </div>
        </div>
    );
}