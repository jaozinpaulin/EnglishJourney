import { useState } from "react"
import type { ReactNode } from "react";

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

interface LayoutProps {
    children: ReactNode
}


function Layout({ children }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#151515] text-[#E7E5E1]">
            <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((prev) => !prev)} />

            <div className="flex pt-16">
                <Sidebar isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

                <main className="min-w-0 flex-1 p-6 md:ml-16 lg:ml-64">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout