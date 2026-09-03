import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthContextType = {
    user: User | null;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isRecoveryHash = window.location.hash.includes("type=recovery") ||
            window.location.search.includes("type=recovery");
        const isResetPath = window.location.pathname === "/resetPassword";

        if (isRecoveryHash || isResetPath) {
            localStorage.setItem("is_resetting_password", "true");
        }

        const loadSession = async () => {
            const isResetting = localStorage.getItem("is_resetting_password") === "true";
            const { data: { session } } = await supabase.auth.getSession();

            if (isResetting && isResetPath) {
                setUser(null);
            } else {
                if (!isResetPath && !isRecoveryHash) {
                    localStorage.removeItem("is_resetting_password");
                }
                setUser(session?.user ?? null);
            }

            setLoading(false);
        };

        loadSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                localStorage.setItem("is_resetting_password", "true");
                setUser(null);
                setLoading(false);
                return;
            }

            if (event === "SIGNED_OUT") {
                localStorage.removeItem("is_resetting_password");
                setUser(null);
                setLoading(false);
                return;
            }

            if (event === "SIGNED_IN") {
                const hasRecoveryToken = window.location.hash.includes("type=recovery");

                if (!hasRecoveryToken && window.location.pathname !== "/resetPassword") {
                    localStorage.removeItem("is_resetting_password");
                    setUser(session?.user ?? null);
                } else {
                    setUser(null);
                }
                setLoading(false);
                return;
            }

            if (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
                const isCurrentlyResetting = localStorage.getItem("is_resetting_password") === "true" &&
                    window.location.pathname === "/resetPassword";

                if (isCurrentlyResetting) {
                    setUser(null);
                } else {
                    setUser(session?.user ?? null);
                }
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}