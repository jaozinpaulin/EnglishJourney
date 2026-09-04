export type EnglishLevel = 'A1';

export type SkillName = 'speaking' | 'listening' | 'reading' | 'writing';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface SkillProfile {
    confidence: ConfidenceLevel;
    priority: boolean;
}

export interface UserProfile {
    level: EnglishLevel;
    motivations: string[];
    abilities: string[];

    studyPlan: {
        dailyMinutes: number;
        daysPerWeek: number;
    };

    skills: Record<SkillName, SkillProfile>;

    previousExperience: {
        studiedBefore: boolean;
        experience?: string;
        duration?: string;
    };
}

export interface UserJourney {
    userId: string;
    level: EnglishLevel;

    currentLessonId: string;
    completedLessonIds: string[];

    masteryScore: number;
    status: 'active' | 'completed';

    createdAt: string;
    updatedAt: string;
}
