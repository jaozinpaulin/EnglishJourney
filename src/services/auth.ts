import { data, redirect } from "react-router-dom";
import { supabase } from "../lib/supabase";

export async function signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    });

    if (error) {
        throw error;
    }

    if (!data.session) {
        throw new Error("Conta criada, mas não foi possível iniciar a sessão.");
    }

    return data;
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }

    // window.location.replace("/authPage")
}

export async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/dashboard`
        }
    });

    if (error) {
        throw new Error(error.message);
    }
}

export async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetPassword`,
    });

    if (error) {
        throw new Error(error.message);
    }
}

export async function updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
        password: password
    });

    if (error) {
        throw new Error(error.message);
    }
    // Remove a trava 
    localStorage.removeItem("is_resetting_password");

    await supabase.auth.signOut({ scope: "global" });

    return data;
}