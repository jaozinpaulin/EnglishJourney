import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { CompassLogo } from "../components/CompassLogo";
import { signUp, signIn, loginWithGoogle, resetPassword } from "../services/auth";

type LoadingAction = "form" | "google" | "reset" | null;

export function AuthPage() {
    const location = useLocation();
    const initialMode = location.state?.mode === "login" ? "login" : "signup";
    const [mode, setMode] = useState<"login" | "signup">(initialMode);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);

    const isEmailValid = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

    const validateForm = () => {
        if (!email.trim()) {
            setError("Please enter your email.");
            return false;
        }

        if (!isEmailValid(email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (mode === "signup" && !name.trim()) {
            setError("Please enter your name.");
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

    const getAuthErrorMessage = (err: unknown) => {
        if (err instanceof Error) {
            if (err.message.includes("Invalid login credentials")) {
                return "Invalid email or password.";
            }
            if (err.message.includes("User already registered")) {
                return "An account with this email already exists.";
            }
            return err.message;
        }
        return "Something went wrong. Please try again.";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) return;

        try {
            setLoadingAction("form");

            if (mode === "signup") {
                await signUp(email.trim(), password, name.trim());
                setSuccess("Account created! Please check your email to confirm your account.");
                setEmail("");
                setPassword("");
                setName("");
            } else {
                await signIn(email.trim(), password);
                setSuccess("Login successful!");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            console.error("Authentication error:", err);
            setError(getAuthErrorMessage(err));
        } finally {
            setLoadingAction(null);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError("");
            setSuccess("");
            setLoadingAction("google");

            await loginWithGoogle();
        } catch (err) {
            console.error("Google authentication error:", err);
            setError(getAuthErrorMessage(err));
        } finally {
            setLoadingAction(null);
        }
    };

    const handleResetPassword = async () => {
        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Please enter your email above to receive the password reset link.");
            return;
        }

        if (!isEmailValid(email)) {
            setError("Please enter a valid email address to receive the password reset link.");
            return;
        }

        try {
            setLoadingAction("reset");
            await resetPassword(email.trim());
            setSuccess("If an account exists with this email, recovery instructions have been sent.");
        } catch (err) {
            console.error("Password reset request error:", err);
            setError("Unable to send recovery email. Please try again in a moment.");
        } finally {
            setLoadingAction(null);
        }
    };

    const isAnyLoading = loadingAction !== null;

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0D0D0D] p-3 text-[#E7E5E1] sm:p-6 lg:p-8">
            <div className="grid w-full max-w-md overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] shadow-2xl lg:min-h-[580px] lg:max-w-[1280px] lg:grid-cols-2">

                <div className="relative hidden flex-col justify-between overflow-hidden border-r border-[#242424] bg-[#111111] p-8 lg:flex lg:p-12">
                    <Link to="/" className="z-10 flex w-fit items-center gap-3 transition-opacity hover:opacity-80">
                        <div className="flex h-8 w-8 items-center justify-center">
                            <CompassLogo />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C96B62]">
                            English Journey
                        </span>
                    </Link>

                    <div className="z-10 my-auto py-6">
                        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#C96B62]">
                            Adaptive Learning System
                        </p>
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
                            Learn. Practice. <br />
                            <span className="text-[#C96B62]">Improve with focus.</span>
                        </h1>
                        <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#8E8E88] sm:text-sm">
                            A structured English learning journey designed around your real level, career focus, and daily momentum.
                        </p>
                    </div>

                    <div className="z-10 border-t border-[#222222] pt-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#666660]">
                            Small steps. Big dreams. Keep flying.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between bg-[#141414] p-5 sm:p-8 lg:p-12">

                    <div className="flex items-center justify-between gap-2 pb-2">

                        <div className="ml-auto flex shrink-0 items-center rounded-xl border border-[#262626] bg-[#0E0E0E] p-1 font-mono text-xs">
                            <button
                                type="button"
                                disabled={isAnyLoading}
                                onClick={() => {
                                    setMode("signup");
                                    setError("");
                                    setSuccess("");
                                }}
                                className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50 ${mode === "signup"
                                    ? "bg-[#C96B62] text-white shadow"
                                    : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </button>

                            <button
                                type="button"
                                disabled={isAnyLoading}
                                onClick={() => {
                                    setMode("login");
                                    setError("");
                                    setSuccess("");
                                }}
                                className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50 ${mode === "login"
                                    ? "bg-[#C96B62] text-white shadow"
                                    : "text-[#777770] hover:text-white"
                                    }`}
                            >
                                Log In
                            </button>
                        </div>
                    </div>

                    <div className="mx-auto my-auto w-full py-3">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                                {mode === "signup" ? "Create your account" : "Welcome back"}
                            </h2>
                            <p className="mt-1 text-xs text-[#8E8E88]">
                                {mode === "signup"
                                    ? "Start building your customized journey today."
                                    : "Log in to continue your daily streak."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

                            {/* Nome */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${mode === "signup"
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <label className="text-[11px] font-semibold text-[#A0A09A]">Name</label>
                                    <div className="mt-1 flex items-center gap-3 rounded-xl border border-[#262626] bg-[#0E0E0E] px-3.5 py-2.5 transition-colors focus-within:border-[#C96B62]">
                                        <User size={16} className="shrink-0 text-[#666660]" />
                                        <input
                                            type="text"
                                            placeholder="Your full name"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                if (error) setError("");
                                            }}
                                            tabIndex={mode === "signup" ? 0 : -1}
                                            disabled={isAnyLoading}
                                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#555550] disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Campo Email */}
                            <div>
                                <label className="text-[11px] font-semibold text-[#A0A09A]">Email</label>
                                <div className="mt-1 flex items-center gap-3 rounded-xl border border-[#262626] bg-[#0E0E0E] px-3.5 py-2.5 transition-colors focus-within:border-[#C96B62]">
                                    <Mail size={16} className="shrink-0 text-[#666660]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError("");
                                        }}
                                        placeholder="your.email@example.com"
                                        disabled={isAnyLoading}
                                        className="w-full border-none bg-transparent p-0 text-sm text-white outline-none placeholder-[#4A4A48] disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {/* Campo Senha */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-semibold text-[#A0A09A]">Password</label>
                                    <div
                                        className={`transition-opacity duration-300 ${mode === "login" ? "opacity-100" : "opacity-0 pointer-events-none"
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            disabled={isAnyLoading}
                                            onClick={handleResetPassword}
                                            className="cursor-pointer text-[11px] text-[#777770] transition-colors hover:text-[#C96B62] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {loadingAction === "reset" ? (
                                                <span className="flex items-center gap-1.5 text-[#C96B62]">
                                                    <span className="h-2.5 w-2.5 animate-spin rounded-full border border-[#C96B62]/30 border-t-[#C96B62]" />
                                                    Sending link...
                                                </span>
                                            ) : (
                                                "Forgot password?"
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-1 flex items-center gap-3 rounded-xl border border-[#262626] bg-[#0E0E0E] px-3.5 py-2.5 transition-colors focus-within:border-[#C96B62]">
                                    <Lock size={16} className="shrink-0 text-[#666660]" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError("");
                                        }}
                                        placeholder="••••••••"
                                        disabled={isAnyLoading}
                                        className="w-full border-none bg-transparent p-0 text-sm text-white outline-none placeholder-[#4A4A48] disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer text-[#666660] transition-colors hover:text-white"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/*Erro e Sucesso */}
                            {error && (
                                <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-950/20 p-2.5 text-xs text-red-400">
                                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {success && (
                                <div className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-2.5 text-xs text-emerald-300">
                                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                                    <span>{success}</span>
                                </div>
                            )}

                            <div className="my-1 flex items-center gap-3">
                                <div className="h-px flex-1 bg-[#242424]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#666660]">or</span>
                                <div className="h-px flex-1 bg-[#242424]" />
                            </div>

                            {/* Botão Google OAuth */}
                            <button
                                onClick={handleGoogleLogin}
                                type="button"
                                disabled={isAnyLoading}
                                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#242424] bg-[#141414] px-4 py-2.5 text-xs font-medium text-[#E7E5E1] transition-all hover:border-[#383838] hover:bg-[#1a1a1a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                            >
                                {loadingAction === "google" ? (
                                    <>
                                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#E7E5E1]/30 border-t-[#E7E5E1]" />
                                        <span>Connecting with Google...</span>
                                    </>
                                ) : (
                                    <>
                                        <FcGoogle className="h-4 w-4 shrink-0" />
                                        <span>Continue with Google</span>
                                    </>
                                )}
                            </button>

                            <button
                                type="submit"
                                disabled={isAnyLoading}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C96B62] py-3 text-xs font-semibold text-white shadow-md shadow-[#C96B62]/10 transition-colors hover:bg-[#B85C55] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
                            >
                                {loadingAction === "form" ? (
                                    <>
                                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        <span>{mode === "signup" ? "Creating Account..." : "Logging In..."}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{mode === "signup" ? "Create Account & Continue" : "Log In"}</span>
                                        <ArrowRight size={15} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="pt-2 text-center font-mono text-[10px] text-[#555550]">
                        By continuing, you agree to English Journey Terms & Privacy Policy.
                    </div>

                </div>
            </div>
        </div>
    );
}