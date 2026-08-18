import { BookOpen, ChartNoAxesColumn, Headphones, LayoutDashboard, Mic, SpellCheck, } from "lucide-react"
import { NavLink } from "react-router-dom"

interface NavigationItem {
    label: string
    path: string
    icon: typeof LayoutDashboard
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

function Sidebar() {
    return (
        <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 border-r border-[#2B2B2B] bg-[#151515] lg:block">
            <nav className="p-4">
                <ul className="space-y-1">
                    {navigationItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive
                                            ? "bg-[#2A2020] text-[#C96B62]"
                                            : "text-[#999994] hover:bg-[#1D1D1D] hover:text-[#E7E5E1]"
                                        }`
                                    }
                                >
                                    <Icon
                                        size={18}
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
    )
}

export default Sidebar