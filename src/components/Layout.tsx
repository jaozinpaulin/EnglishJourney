import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [asideMode, setAsideMode] = useState<"hover" | "open">("open");

    return (
        <div className="min-h-screen bg-[#151515] text-[#E7E5E1]">
            <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((prev) => !prev)} />

            <div className="flex pt-16 md:pt-0">
                <Sidebar isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} mode={asideMode} setAsideMode={setAsideMode} />

                <main
                    className={`min-w-0 flex-1 p-4 md:p-6 ${asideMode === "hover" ? "md:ml-16" : "md:ml-56"}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}