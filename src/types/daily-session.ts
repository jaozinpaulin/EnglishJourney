export type PedagogicalDecision = 'SUPPORT' | 'DEVELOP' | 'MASTER';

export type DailySessionStatus = 'not_started' | 'in_progress' | 'completed';

export interface ActivityAttempt {
    activityId: string;
    userAnswer: string;

    isCorrect: boolean;
    attemptsCount: number;
    hintsUsed: number;

    answeredAt: string;
}

export interface DailySession {
    sessionId: string;
    userId: string;
    lessonId: string;

    decision: PedagogicalDecision;
    status: DailySessionStatus;

    attempts: ActivityAttempt[];

    totalActivities: number;
    correctActivities: number;
    score: number;

    startedAt: string;
    completedAt?: string;
}
