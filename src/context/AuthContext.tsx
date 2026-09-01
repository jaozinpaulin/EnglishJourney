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
        const isResetRoute =
            window.location.pathname === "/resetPassword" ||
            window.location.hash.includes("type=recovery") ||
            window.location.search.includes("type=recovery");

        if (isResetRoute) {
            localStorage.setItem("is_resetting_password", "true");
        }

        const loadSession = async () => {
            const isResetting = localStorage.getItem("is_resetting_password") === "true";
            const { data: { session } } = await supabase.auth.getSession();

            if (isResetting || window.location.pathname === "/resetPassword") {
                setUser(null);
            } else {
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

            if (event === "USER_UPDATED") {
                setLoading(false);
                return;
            }

            const isResetting = localStorage.getItem("is_resetting_password") === "true";
            const isResetPath = window.location.pathname === "/resetPassword";

            if (isResetting || isResetPath) {
                setUser(null);
            } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                setUser(session?.user ?? null);
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}