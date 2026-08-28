import { supabase } from "../lib/supabase";

export async function singUp(email: string, password: string) {
    const { data, error } = await supabase.auth
        .signUp({ email, password });

    if (error) {
        throw error
    }

    return data;
}

export async function singIn(email: string, password: string) {
    const { data, error } = await supabase.auth
        .signInWithPassword({ email, password });

    if (error) {
        throw error
    }
    return data
}