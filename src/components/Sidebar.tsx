import { LayoutDashboard, BookOpen, Type, Headphones, Mic, BookMarked, PenLine, RotateCcw, Layers, Trophy, TrendingUp, Settings, PanelLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface NavigationItem {
    label: string;
    path: string;
    icon: any;
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
            { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
            { label: "Vocabulary", path: "/vocabulary", icon: BookOpen },
            { label: "Grammar", path: "/grammar", icon: Type },
            { label: "Listening", path: "/listening", icon: Headphones },
            { label: "Speaking", path: "/speaking", icon: Mic },
            { label: "Reading", path: "/reading", icon: BookMarked },
            { label: "Writing", path: "/writing", icon: PenLine },
            { label: "Review", path: "/review", icon: RotateCcw },
        ],
    },
    {
        title: "JOURNEY",
        items: [
            { label: "Units", path: "/units", icon: Layers },
            { label: "Levels", path: "/levels", icon: Trophy },
        ],
    },
    {
        title: "PROGRESS",
        items: [
            { label: "My Progress", path: "/progress", icon: TrendingUp },
        ],
    },
];

export default function Sidebar({ isMenuOpen, onClose, mode, setAsideMode }: SidebarProps) {
    const [showAsideOptions, setShowAsideOptions] = useState(false);
    const asideOptionsRef = useRef<HTMLDivElement>(null);

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
            {/* Desktop Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-40 hidden h-screen border-r border-[#1F1F1F] bg-[#0E0E10] md:flex flex-col justify-between transition-[width] duration-300 ease-in-out group ${isHover ? "w-16 hover:w-56" : "w-56"
                    }`}
            >
                {/* Header / Logo */}
                <div className="flex items-center h-16 shrink-0 border-b border-[#1F1F1F]/50 overflow-hidden">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                        <svg
                            viewBox="0 0 64 64"
                            className="h-6 w-6 text-[#B85C55]"
                            fill="currentColor"
                            aria-label="English Journey"
                            role="img"
                        >
                            <path d="M32 3 27 17 18 10 20 23 7 20 17 31 5 37 22 39 16 53 29 46 32 61 35 46 48 53 42 39 59 37 47 31 57 20 44 23 46 10 37 17 32 3Z" />
                        </svg>
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

                {/* Navegação */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden px-1.5 py-2.5 space-y-2.5 scrollbar-none">
                    {navSections.map((section, idx) => (
                        <div
                            key={idx}
                            className={`space-y-0.5 ${idx !== navSections.length - 1 ? "border-b border-[#1F1F1F]/60 pb-2" : ""
                                }`}
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
                                    return (
                                        <li key={item.path}>
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex h-9 items-center rounded-lg text-sm font-medium transition-colors ${isActive
                                                        ? "bg-[#251A18] text-[#B85C55]"
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

                {/* Container Inferior Alinhado */}
                <div className="flex w-full shrink-0 flex-col space-y-1.5 px-1.5 py-2 border-t border-[#1F1F1F]">
                    {/* Botão PanelLeft + Badge com o [mode] atual */}
                    <div ref={asideOptionsRef} className="relative flex h-9 w-full items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setShowAsideOptions((curr) => !curr)}
                            title="Configurações da barra lateral"
                            className="flex h-9 w-[52px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-[#18181B] hover:text-zinc-200"
                        >
                            <PanelLeft size={17} />
                        </button>

                        <div
                            className={`overflow-hidden pr-2 transition-all duration-300 ease-in-out ${isHover
                                ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                : "max-w-xs opacity-100"
                                }`}>
                            <span className="rounded-md border border-zinc-800/80 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-medium tracking-wider text-zinc-400 uppercase">
                                {mode}
                            </span>
                        </div>

                        {showAsideOptions && (
                            <div className="absolute bottom-full left-0 mb-2 w-32 rounded-lg border border-[#2B2B2B] bg-[#141416] p-1 text-xs shadow-xl z-50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAsideMode("hover");
                                        setShowAsideOptions(false);
                                    }}
                                    className={`w-full cursor-pointer rounded px-2.5 py-1.5 text-left transition-colors ${mode === "hover"
                                        ? "bg-[#251A18] font-medium text-[#B85C55]"
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
                                        ? "bg-[#251A18] font-medium text-[#B85C55]"
                                        : "text-zinc-400 hover:bg-[#1D1D1D]"
                                        }`}
                                >
                                    Open
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Card User */}
                    <div className="flex h-11 items-center justify-between overflow-hidden rounded-xl border border-[#222226] bg-[#141416] p-1">
                        <div className="flex min-w-0 items-center">
                            <div className="flex h-9 w-[44px] shrink-0 items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                                    alt="Avatar"
                                    className="h-7 w-7 rounded-full object-cover"
                                />
                            </div>

                            <div
                                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isHover
                                    ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                                    : "max-w-xs opacity-100"
                                    }`}
                            >
                                <p className="truncate text-xs font-medium leading-tight text-zinc-200">
                                    João Silva
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
                                }`}
                        >
                            <Settings size={15} />
                        </NavLink>
                    </div>
                </div>
            </aside>

            {/* Mobile  */}
            {isMenuOpen && (
                <aside className="fixed inset-y-0 right-0 z-50 flex h-full w-72 flex-col justify-between border-l border-[#1F1F1F] bg-[#0E0E10] p-4 md:hidden">
                    <div className="overflow-y-auto space-y-3">
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
                                                            ? "bg-[#251A18] text-[#B85C55]"
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

                    <div className="border-t border-[#1F1F1F] pt-2">
                        <NavLink
                            to="/settings"
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-[#18181B]"
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

