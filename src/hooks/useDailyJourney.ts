// src/hooks/useDailyJourney.ts
import { useState, useEffect } from 'react';

export function useDailyJourney() {
    const [journey, setJourney] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const raw = localStorage.getItem('dailyJourney');
        if (raw) {
            try {
                setJourney(JSON.parse(raw));
            } catch (e) {
                console.error('Falha ao ler dailyJourney do localStorage', e);
            }
        }
        setIsLoading(false);
    }, []);

    return { journey, isLoading };
}