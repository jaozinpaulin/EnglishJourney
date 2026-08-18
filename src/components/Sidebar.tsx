import { BookOpen, ChartNoAxesColumn, Headphones, LayoutDashboard, Mic, SpellCheck, } from "lucide-react"
import { NavLink } from "react-router-dom"

interface NavigationItem {
    label: string
    path: string
    icon: typeof LayoutDashboard
}
interface SidebarProps {
    isMenuOpen: boolean;
    onClose: () => void;
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

function Sidebar({ isMenuOpen, onClose }: SidebarProps) {

    return (
        <>
            <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-16 border-r border-[#2B2B2B] bg-[#151515] md:block lg:w-64">
                <nav className="p-3 lg:p-4">
                    <ul className="space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon

                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:px-4 ${isActive
                                                ? "bg-[#2A2020] text-[#C96B62]"
                                                : "text-[#999994] hover:bg-[#1D1D1D] hover:text-[#E7E5E1]"
                                            }`
                                        }
                                    >
                                        <Icon
                                            size={18}
                                            strokeWidth={1.8}
                                            className="shrink-0"
                                        />

                                        <span className="hidden lg:block">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
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