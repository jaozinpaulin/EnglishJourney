import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { CompassLogo } from "../components/CompassLogo";

import { updatePassword, signOut } from "../services/auth";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const validateResetForm = (p: string, cp: string) => {
        if (!p) {
            setError("Please enter your new password.");
            return false;
        }
        if (p.length < 8) {
            setError("Password must be at least 8 characters.");
            return false;
        }
        if (!/[a-z]/.test(p)) {
            setError("Password must contain a lowercase letter.");
            return false;
        }
        if (!/[A-Z]/.test(p)) {
            setError("Password must contain an uppercase letter.");
            return false;
        }
        if (!/\d/.test(p)) {
            setError("Password must contain a number.");
            return false;
        }
        if (!/[^A-Za-z0-9]/.test(p)) {
            setError("Password must contain a symbol.");
            return false;
        }
        if (!cp) {
            setError("Please confirm your password.");
            return false;
        }
        if (p !== cp) {
            setError("Passwords do not match.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const cleanPassword = password.trim();
        const cleanConfirmPassword = confirmPassword.trim();

        if (!validateResetForm(cleanPassword, cleanConfirmPassword)) return;

        try {
            setLoading(true);
            // Atualiza senha e encerra sessão
            await updatePassword(cleanPassword);
            await signOut();

            setPassword("");
            setConfirmPassword("");
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to update password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0D0D0D] p-3 text-[#E7E5E1] sm:p-5 lg:p-6">
            <div className="grid w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] shadow-2xl lg:min-h-[500px] lg:max-w-[960px] lg:grid-cols-2">

                {/* Hero */}
                <div className="relative hidden flex-col justify-between overflow-hidden border-r border-[#242424] bg-[#111111] p-6 lg:flex lg:p-8">
                    <div className="z-10 flex w-fit items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                            <CompassLogo />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C96B62]">
                            English Journey
                        </span>
                    </div>

                    <div className="z-10 my-auto py-4">
                        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C96B62]">
                            Security & Access
                        </p>
                        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white lg:text-3xl">
                            Create a new <br />
                            <span className="text-[#C96B62]">secure password.</span>
                        </h1>
                        <p className="mt-2.5 max-w-xs text-xs leading-relaxed text-[#8E8E88]">
                            Keep your progress and momentum safe with a strong, updated password.
                        </p>
                    </div>

                    <div className="z-10 border-t border-[#222222] pt-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#666660]">
                            Small steps. Big dreams. Keep flying.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between bg-[#141414] p-5 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-2 pb-1 lg:hidden">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                            <CompassLogo />
                        </div>
                        <span className="truncate font-mono text-xs font-bold uppercase tracking-wider text-[#C96B62]">
                            English Journey
                        </span>
                    </div>

                    <div className="mx-auto my-auto w-full py-2">
                        {success ? (
                            /* Card sucesso */
                            <div className="flex flex-col items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-5 text-center">
                                <CheckCircle2 className="h-10 w-10 text-emerald-400" />

                                <div>
                                    <h2 className="text-base font-bold tracking-tight text-white sm:text-lg">
                                        Password Updated Successfully!
                                    </h2>
                                    <p className="mt-1 text-xs text-[#8E8E88]">
                                        Your new credentials are now active across your account.
                                    </p>
                                </div>

                                <div className="w-full rounded-xl border border-[#262626] bg-[#0E0E0E] p-3.5 text-left">
                                    <div className="flex items-start gap-2.5">
                                        <AlertCircle size={16} className="mt-0.5 shrink-0 text-[#C96B62]" />
                                        <p className="text-xs leading-relaxed text-[#A0A09A]">
                                            <strong className="text-white">Security Action Required:</strong> Please <span className="text-[#C96B62] font-semibold">close this recovery window</span> and log in using your main application tab.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => window.close()}
                                    className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#262626] py-2.5 text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#333333] sm:text-sm"
                                >
                                    <XCircle size={15} />
                                    Close This Tab
                                </button>
                            </div>
                        ) : (
                            /* Form */
                            <>
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                                        Reset your password
                                    </h2>
                                    <p className="mt-0.5 text-xs text-[#8E8E88]">
                                        Enter your new password below to regain full access.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                                    {/* Password */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#A0A09A]">
                                            New Password
                                        </label>
                                        <div className="mt-1 flex items-center gap-3 rounded-xl border border-[#262626] bg-[#0E0E0E] px-3.5 py-2 transition-colors focus-within:border-[#C96B62]">
                                            <Lock size={15} className="shrink-0 text-[#666660]" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    if (error) setError("");
                                                }}
                                                placeholder="••••••••"
                                                className="w-full border-none bg-transparent p-0 text-sm text-white outline-none placeholder-[#4A4A48]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="cursor-pointer text-[#666660] transition-colors hover:text-white"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm password */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#A0A09A]">
                                            Confirm New Password
                                        </label>
                                        <div className="mt-1 flex items-center gap-3 rounded-xl border border-[#262626] bg-[#0E0E0E] px-3.5 py-2 transition-colors focus-within:border-[#C96B62]">
                                            <Lock size={15} className="shrink-0 text-[#666660]" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    if (error) setError("");
                                                }}
                                                placeholder="••••••••"
                                                className="w-full border-none bg-transparent p-0 text-sm text-white outline-none placeholder-[#4A4A48]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="cursor-pointer text-[#666660] transition-colors hover:text-white"
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                                            </button>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 text-xs text-red-400">
                                            <AlertCircle size={14} className="shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C96B62] py-2.5 text-xs font-semibold text-white shadow-md shadow-[#C96B62]/10 transition-colors hover:bg-[#B85C55] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
                                    >
                                        {loading ? "Updating Password..." : "Update Password"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="pt-2 text-center font-mono text-[9px] text-[#555550]">
                        English Journey • Secure Credentials System
                    </div>
                </div>
            </div>
        </div>
    );
}