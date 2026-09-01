import { Link } from "react-router-dom";
import { Bell, CheckCheck, AlertCircle, Flame, BookOpen, Trophy, ArrowRight, Check } from "lucide-react";

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: "warning" | "streak" | "lesson" | "achievement";
    actionUrl?: string;
    actionLabel?: string;
}

const mockNotifications: NotificationItem[] = [
    {
        id: "1",
        title: "Complete seu perfil de estudos",
        description: "Você ainda não finalizou o onboarding para gerar seu cronograma diário adaptado.",
        time: "Há 10 min",
        read: false,
        type: "warning",
        actionUrl: "/onboarding",
        actionLabel: "Configurar plano"
    },
    {
        id: "2",
        title: "Ofensiva em risco!",
        description: "Pratique pelo menos 5 minutos hoje para manter sua sequência ativa de 4 dias.",
        time: "Há 2 horas",
        read: false,
        type: "streak",
        actionUrl: "/practice",
        actionLabel: "Praticar agora"
    },
    {
        id: "3",
        title: "Nova lição disponível: Past Continuous",
        description: "Adicionamos 12 novos exercícios de fixação ao seu módulo gramatical.",
        time: "Ontem",
        read: true,
        type: "lesson"
    },
    {
        id: "4",
        title: "Conquista desbloqueada: First Steps",
        description: "Você concluiu seus primeiros 3 blocos de vocabulário básico.",
        time: "Há 3 dias",
        read: true,
        type: "achievement"
    }
];

export default function NotificationsPage() {
    const unreadCount = mockNotifications.filter((n) => !n.read).length;

    const renderIcon = (type: NotificationItem["type"]) => {
        switch (type) {
            case "warning":
                return <AlertCircle size={18} className="text-amber-400" />;
            case "streak":
                return <Flame size={18} className="text-[#C96B62]" />;
            case "lesson":
                return <BookOpen size={18} className="text-sky-400" />;
            case "achievement":
                return <Trophy size={18} className="text-yellow-400" />;
        }
    };

    return (
        <div className="mx-auto w-full max-w-[1500px] space-y-6">

            <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300">
                        <Bell size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                            Notificações
                        </h1>
                        <p className="text-xs text-zinc-400">
                            Acompanhe lembretes de estudo, avisos do sistema e conquistas.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <span className="rounded-full border border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                            {unreadCount} novas
                        </span>
                    )}
                    <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-xl border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
                    >
                        <CheckCheck size={14} />
                        Marcar todas como lidas
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {mockNotifications.map((item) => (
                    <div
                        key={item.id}
                        className={`flex flex-col justify-between gap-4 rounded-2xl border p-4.5 transition-colors sm:flex-row sm:items-center ${item.read
                            ? "border-zinc-800/80 bg-zinc-900/20"
                            : item.type === "warning"
                                ? "border-amber-500/40 bg-zinc-900/40"
                                : "border-zinc-700 bg-zinc-900/50"
                            }`}
                    >
                        <div className="flex items-start gap-3.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-800">
                                {renderIcon(item.type)}
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold text-white">
                                        {item.title}
                                    </h2>
                                    {!item.read && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                    )}
                                </div>
                                <p className="text-xs leading-relaxed text-zinc-400">
                                    {item.description}
                                </p>
                                <span className="block text-[10px] text-zinc-500">
                                    {item.time}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                            {item.actionUrl && item.actionLabel && (
                                <Link
                                    to={item.actionUrl}
                                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${item.type === "warning"
                                        ? "border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-zinc-950"
                                        : "border border-[#C96B62]/40 text-[#C96B62] hover:bg-[#C96B62] hover:text-white"
                                        }`}
                                >
                                    <span>{item.actionLabel}</span>
                                    <ArrowRight size={13} />
                                </Link>
                            )}

                            {!item.read && (
                                <button
                                    type="button"
                                    aria-label="Marcar como lida"
                                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition-colors hover:text-white"
                                >
                                    <Check size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}