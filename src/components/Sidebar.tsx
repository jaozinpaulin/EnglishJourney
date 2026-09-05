import {
    LayoutDashboard, BookOpen, Type, Headphones, Mic, BookMarked,
    PenLine, RotateCcw, Layers, Trophy, TrendingUp, Settings, PanelLeft, Bell
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { CompassLogo } from "./CompassLogo";

interface NavigationItem {
    label: string;
    path: string;
    icon: any;
    enabled: boolean;
}

interface NavigationSection {
    title?: string;
    items: NavigationItem[];
}

interface SidebarProps {
    isMenuOpen: boolean;
    onClose: () => void;
    mode: "hover" | "open";
    setAsideMode: (mode: "hover" | "open") => void;
}

const navSections: NavigationSection[] = [
    {
        items: [
            { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, enabled: true },
            { label: "Vocabulary", path: "/vocabulary", icon: BookOpen, enabled: true },
            { label: "Grammar", path: "/grammar", icon: Type, enabled: false },
            { label: "Listening", path: "/listening", icon: Headphones, enabled: true },
            { label: "Speaking", path: "/speaking", icon: Mic, enabled: true },
            { label: "Reading", path: "/reading", icon: BookMarked, enabled: false },
            { label: "Writing", path: "/writing", icon: PenLine, enabled: false },
            { label: "Review", path: "/review", icon: RotateCcw, enabled: true },
        ],
    },
    {
        title: "JOURNEY",
        items: [
            { label: "Units", path: "/units", icon: Layers, enabled: false },
            { label: "Levels", path: "/levels", icon: Trophy, enabled: false },
        ],
    },
    {
        title: "PROGRESS",
        items: [
            { label: "My Progress", path: "/progress", icon: TrendingUp, enabled: false },
        ],
    },
];

export default function Sidebar({ isMenuOpen, onClose, mode, setAsideMode }: SidebarProps) {
    const [showAsideOptions, setShowAsideOptions] = useState(false);
    const asideOptionsRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    useEffect(() => {
        const handleClickOutside = (evt: MouseEvent) => {
            if (asideOptionsRef.current && !asideOptionsRef.current.contains(evt.target as Node)) {
                setShowAsideOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isHover = mode === "hover";

    return (
        <>
            <aside
                className={`fixed left-0 top-0 z-40 hidden h-screen border-r border-[#1F1F1F] bg-[#0E0E10] md:flex flex-col justify-between transition-[width] duration-300 ease-in-out group ${isHover ? "w-16 hover:w-56" : "w-56"
                    }`}            >
                <div className="flex items-center h-16 shrink-0 border-b border-[#1F1F1F]/50 overflow-hidden">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                        <div className="flex h-7 w-7 items-center justify-center text-[#C96B62]">
                            <CompassLogo />
                        </div>
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out pr-3 ${isHover
                            ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                            : "max-w-xs opacity-100"
                            }`}
                    >
                        <h1 className="truncate text-sm font-bold tracking-tight text-[#E7E5E1] whitespace-nowrap leading-tight">
                            English Journey
                        </h1>
                        <p className="text-[10px] text-zinc-500 whitespace-nowrap">
                            Your path to fluency
                        </p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden px-1.5 py-2.5 space-y-2.5 scrollbar-none">
                    {navSections.map((section, idx) => (
                        <div
                            key={idx}
                            className={`space-y-0.5 ${idx !== navSections.length - 1 ? "border-b border-[#1F1F1F]/60 pb-2" : ""}`}
                        >
                            {section.title && (
                                <p
                                    className={`px-3.5 my-1 text-[9px] font-semibold tracking-wider text-zinc-500 uppercase overflow-hidden whitespace-nowrap transition-all duration-300 ${isHover
                                        ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                        : "max-w-xs opacity-100"
                                        }`}
                                >
                                    {section.title}
                                </p>
                            )}

                            <ul className="space-y-0.5">
                                {section.items.map((item) => {
                                    const Icon = item.icon;

                                    if (!item.enabled) {
                                        return (
                                            <li key={item.path}>
                                                <div
                                                    title={`${item.label} (Em breve)`}
                                                    className="flex h-9 w-full cursor-not-allowed select-none items-center rounded-lg text-sm text-zinc-600 opacity-40 transition-colors"
                                                >
                                                    <div className="flex h-full w-[52px] shrink-0 items-center justify-center">
                                                        <Icon size={17} strokeWidth={1.8} className="shrink-0" />
                                                    </div>

                                                    <div
                                                        className={`flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isHover
                                                            ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                                            : "max-w-xs opacity-100"
                                                            }`}
                                                    >
                                                        <span className="text-xs">{item.label}</span>
                                                        <span className="mr-2 rounded bg-[#171719] px-1.5 py-0.5 font-mono text-[9px] text-zinc-500 border border-[#222]">
                                                            Em breve
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }

                                    return (
                                        <li key={item.path}>
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex h-9 w-full items-center rounded-lg text-sm font-medium transition-colors ${isActive
                                                        ? "bg-[#251A18] text-[#C96B62]"
                                                        : "text-zinc-400 hover:bg-[#18181B] hover:text-zinc-200"
                                                    }`
                                                }
                                            >
                                                <div className="flex h-full w-[52px] shrink-0 items-center justify-center">
                                                    <Icon size={17} strokeWidth={1.8} className="shrink-0" />
                                                </div>
                                                <span
                                                    className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-300 ease-in-out ${isHover
                                                        ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                                        : "max-w-xs opacity-100"
                                                        }`}
                                                >
                                                    {item.label}
                                                </span>
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="flex w-full shrink-0 flex-col space-y-1.5 px-1.5 py-2 border-t border-[#1F1F1F]">
                    <NavLink
                        to="/notifications"
                        className={({ isActive }) =>
                            `group/notif relative flex h-9 w-full items-center justify-between rounded-lg transition-colors ${isActive
                                ? "bg-[#251A18] text-[#C96B62]"
                                : "text-zinc-400 hover:bg-[#18181B] hover:text-zinc-200"
                            }`
                        }
                    >
                        <div className="flex items-center min-w-0">
                            <div className="relative flex h-full w-[52px] shrink-0 items-center justify-center">
                                <Bell size={17} strokeWidth={1.8} className="shrink-0" />
                                <span
                                    className={`absolute top-2 right-4 h-2 w-2 rounded-full bg-amber-500 transition-opacity duration-200 ${isHover ? "group-hover:opacity-0" : "hidden"}`}
                                />
                            </div>

                            <span
                                className={`overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-300 ease-in-out ${isHover
                                    ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                    : "max-w-xs opacity-100"
                                    }`}>
                                Notificações
                            </span>
                        </div>

                        <div
                            className={`pr-2 transition-all duration-300 ease-in-out ${isHover
                                ? "max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                : "max-w-xs opacity-100"
                                }`}
                        >
                            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/15 px-1 font-mono text-[9px] font-bold text-amber-400">
                                2
                            </span>
                        </div>
                    </NavLink>
                    {/* Toggle de Modo Aside */}
                    <div ref={asideOptionsRef} className="relative flex w-full">
                        <button
                            type="button"
                            onClick={() => setShowAsideOptions((curr) => !curr)}
                            title="Configurações da barra lateral"
                            className="group/aside-toggle relative flex h-9 w-full items-center justify-between rounded-lg text-zinc-400 transition-colors hover:bg-[#18181B] hover:text-zinc-200"
                        >
                            <div className="flex items-center min-w-0">
                                <div className="flex h-full w-[52px] shrink-0 items-center justify-center">
                                    <PanelLeft size={17} strokeWidth={1.8} className="shrink-0" />
                                </div>

                                <span
                                    className={`overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-300 ease-in-out ${isHover
                                        ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                        : "max-w-xs opacity-100"
                                        }`}
                                >
                                    Barra lateral
                                </span>
                            </div>

                            <div
                                className={`pr-2 transition-all duration-300 ease-in-out ${isHover
                                    ? "max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                    : "max-w-xs opacity-100"
                                    }`}
                            >
                                <span className="flex h-4 items-center justify-center rounded border border-zinc-800 bg-zinc-900/60 px-1.5 font-mono text-[9px] font-bold uppercase text-zinc-400">
                                    {mode}
                                </span>
                            </div>
                        </button>

                        {showAsideOptions && (
                            <div className="absolute bottom-full left-0 mb-2 w-32 rounded-lg border border-[#2B2B2B] bg-[#141416] p-1 text-xs shadow-xl z-50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAsideMode("hover");
                                        setShowAsideOptions(false);
                                    }}
                                    className={`w-full cursor-pointer rounded px-2.5 py-1.5 text-left transition-colors ${mode === "hover"
                                        ? "bg-[#251A18] font-medium text-[#C96B62]"
                                        : "text-zinc-400 hover:bg-[#1D1D1D]"
                                        }`}
                                >
                                    Hover
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAsideMode("open");
                                        setShowAsideOptions(false);
                                    }}
                                    className={`w-full cursor-pointer rounded px-2.5 py-1.5 text-left transition-colors ${mode === "open"
                                        ? "bg-[#251A18] font-medium text-[#C96B62]"
                                        : "text-zinc-400 hover:bg-[#1D1D1D]"
                                        }`}
                                >
                                    Open
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Card User */}
                    <div className="flex h-11 items-center justify-between overflow-hidden p-1">
                        <div className="flex min-w-0 items-center">
                            <NavLink
                                to="/settings"
                                title="Configurações de perfil"
                                className="group/avatar flex h-9 w-[44px] shrink-0 items-center justify-center"
                            >
                                {user?.user_metadata?.avatar_url ? (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="Avatar"
                                        className="h-7 w-7 rounded-full object-cover transition-opacity group-hover/avatar:opacity-80"
                                    />
                                ) : (
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3D201E] text-xs font-semibold text-[#C96B62] transition-colors group-hover/avatar:bg-[#4A2624]">
                                        {user?.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                )}
                            </NavLink>

                            <div
                                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isHover
                                    ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                    : "max-w-xs opacity-100"
                                    }`}
                            >
                                <p className="truncate text-xs font-medium leading-tight text-zinc-200">
                                    {user?.user_metadata?.name || "Learner"}
                                </p>
                                <p className="truncate text-[10px] text-zinc-500">
                                    A1 Learner
                                </p>
                            </div>
                        </div>

                        <NavLink
                            to="/settings"
                            title="Settings"
                            className={`flex h-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-all duration-300 hover:bg-[#18181B] hover:text-zinc-200 ${isHover
                                ? "w-0 overflow-hidden opacity-0 group-hover:w-7 group-hover:opacity-100"
                                : "w-7 opacity-100"
                                }`}>
                            <Settings size={15} />
                        </NavLink>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {isMenuOpen && (
                <aside className="fixed inset-y-0 right-0 z-50 flex h-full w-72 flex-col justify-between border-l border-[#1F1F1F] bg-[#0E0E10] p-4 md:hidden">
                    <div className="overflow-y-auto space-y-3">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#1F1F1F]">
                            <div className="flex h-6 w-6 items-center justify-center text-[#C96B62]">
                                <CompassLogo />
                            </div>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C96B62]">
                                English Journey
                            </span>
                        </div>

                        {navSections.map((section, idx) => (
                            <div
                                key={idx}
                                className={`space-y-1 ${idx !== navSections.length - 1 ? "border-b border-[#1F1F1F]/60 pb-2.5" : ""
                                    }`}
                            >
                                {section.title && (
                                    <p className="px-3 mb-1 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                                        {section.title}
                                    </p>
                                )}
                                <ul className="space-y-0.5">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.path}>
                                                <NavLink
                                                    to={item.path}
                                                    onClick={onClose}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                                            ? "bg-[#251A18] text-[#C96B62]"
                                                            : "text-zinc-400 hover:bg-[#18181B] hover:text-zinc-200"
                                                        }`
                                                    }
                                                >
                                                    <Icon size={18} strokeWidth={1.8} />
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1 border-t border-[#1F1F1F] pt-3">
                        <NavLink
                            to="/notifications"
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-[#251A18] text-[#C96B62]"
                                    : "text-zinc-400 hover:bg-[#18181B] hover:text-zinc-200"
                                }`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <Bell size={18} strokeWidth={1.8} />
                                <span>Notificações</span>
                            </div>
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/15 px-1.5 font-mono text-[10px] font-bold text-amber-400">
                                2
                            </span>
                        </NavLink>

                        <NavLink
                            to="/settings"
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-[#18181B] hover:text-zinc-200"
                        >
                            <Settings size={18} />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </aside>
            )}
        </>
    );
}