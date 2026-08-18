import { BookOpen, ChartNoAxesColumn, Headphones, LayoutDashboard, Mic, SpellCheck, PanelLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"

import { NavLink } from "react-router-dom"

interface NavigationItem {
    label: string
    path: string
    icon: typeof LayoutDashboard
}
interface SidebarProps {
    isMenuOpen: boolean;
    onClose: () => void;
    mode: "hover" | "open";
    setAsideMode: (mode: "hover" | "open") => void;
}

const navigationItems: NavigationItem[] = [
    {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Vocabulary",
        path: "/vocabulary",
        icon: BookOpen,
    },
    {
        label: "Grammar",
        path: "/grammar",
        icon: SpellCheck,
    },
    {
        label: "Listening",
        path: "/listening",
        icon: Headphones,
    },
    {
        label: "Speaking",
        path: "/speaking",
        icon: Mic,
    },
    {
        label: "Progress",
        path: "/progress",
        icon: ChartNoAxesColumn,
    },
]


function Sidebar({ isMenuOpen, onClose, mode, setAsideMode }: SidebarProps) {
    const [showAsideOptions, setShowAsideOptions] = useState(false);
    const asideOptionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const handleClickOutside = (evt: MouseEvent) => {
            if (asideOptionsRef.current && !asideOptionsRef.current.contains(evt.target as Node)) {
                setShowAsideOptions(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        };

    }, []);



    return (
        <>
            <aside
                className={`fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] border-r border-[#2B2B2B] bg-[#151515] md:block transition-[width] duration-300 ease-in-out group ${mode === "hover" ? "w-16 hover:w-56" : "w-56"
                    }`}
            >
                <nav className="h-full flex flex-col justify-between py-3 px-2">
                    <ul className="w-full space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex h-11 items-center rounded-lg text-sm font-medium transition-colors ${isActive
                                                ? "bg-[#2A2020] text-[#C96B62]"
                                                : "text-[#999994] hover:bg-[#1D1D1D] hover:text-[#E7E5E1]"
                                            }`
                                        }
                                    >
                                        <div className="flex h-full w-12 shrink-0 items-center justify-center">
                                            <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                                        </div>

                                        <span
                                            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${mode === "hover"
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

                    <div ref={asideOptionsRef}
                        className="relative  w-min">
                        <button
                            onClick={() => setShowAsideOptions((current) => !current)} title="Control Sidebar"
                            className="flex h-11 w-12 items-center justify-center rounded-md text-[#999994] transition-colors hover:bg-zinc-800 hover:text-[#E7E5E1] cursor-pointer"
                        >
                            <PanelLeft
                                size={18}
                                strokeWidth={1.8}
                                className="shrink-0"
                            />
                        </button>

                        {showAsideOptions && (
                            <div
                                className="absolute bottom-full left-0 mb-2 w-36 rounded border border-[#2B2B2B] bg-[#151515] text-xs shadow-lg">
                                <div className="px-3 py-1.5 text-[10px] text-[#999994] uppercase tracking-wider font-semibold">
                                    Control Sidebar
                                </div>

                                <div className="border-t border-[#2B2B2B]" />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setAsideMode("hover");
                                        setShowAsideOptions(false);
                                    }}
                                    className={`w-full px-3 py-1.5 text-left transition-colors cursor-pointer ${mode === "hover"
                                        ? "bg-[#2A2020] text-[#C96B62] font-medium"
                                        : "text-[#999994] hover:bg-[#1D1D1D] hover:text-[#E7E5E1]"
                                        }`}
                                >
                                    Hover
                                </button>

                                <div className="border-t border-[#2B2B2B]" />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setAsideMode("open");
                                        setShowAsideOptions(false);
                                    }}
                                    className={`w-full px-3 py-1.5 text-left transition-colors cursor-pointer ${mode === "open"
                                        ? "bg-[#2A2020] text-[#C96B62] font-medium"
                                        : "text-[#999994] hover:bg-[#1D1D1D] hover:text-[#E7E5E1]"
                                        }`}
                                >
                                    Fixa
                                </button>
                            </div>
                        )}
                    </div>

                </nav>
            </aside>

            {isMenuOpen && (
                <aside className="fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 border-r border-[#2B2B2B] bg-[#151515] md:hidden">
                    <nav className="p-4">
                        <ul className="space-y-1">
                            {navigationItems.map((item) => {
                                const Icon = item.icon

                                return (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            onClick={onClose}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                                    ? "bg-[#2A2020] text-[#C96B62]"
                                                    : "text-[#999994] hover:bg-[#1D1D1D] hover:text-[#E7E5E1]"
                                                }`
                                            }
                                        >
                                            <Icon
                                                size={19}
                                                strokeWidth={1.8}
                                            />

                                            <span>
                                                {item.label}
                                            </span>
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </aside>
            )}
        </>
    )
}

export default Sidebar