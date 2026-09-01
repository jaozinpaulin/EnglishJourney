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