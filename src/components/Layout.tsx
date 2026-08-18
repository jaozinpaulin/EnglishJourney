import type { ReactNode } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-[#151515] text-[#E7E5E1]">
            <Header />

            <div className="flex pt-16">
                <Sidebar />

                <main className="min-w-0 flex-1 p-6 lg:ml-64">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout