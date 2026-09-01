import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [asideMode, setAsideMode] = useState<"hover" | "open">("open");

    // Limpa o hash residual (#) da URL vindo do redirect do OAuth/Supabase
    useEffect(() => {
        const hash = window.location.hash;
        const isOAuthHash =
            hash.includes("access_token") ||
            hash.includes("error_description") ||
            hash === "#" ||
            hash === "";

        // Só limpa se for o hash do OAuth ou o '#' solto residual
        if (window.location.href.includes("#") && isOAuthHash) {
            const cleanUrl = window.location.href.split("#")[0];
            window.history.replaceState(null, "", cleanUrl);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#151515] text-[#E7E5E1]">
            <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((prev) => !prev)} />

            <div className="flex pt-16 md:pt-0">
                <Sidebar
                    isMenuOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    mode={asideMode}
                    setAsideMode={setAsideMode}
                />

                <main
                    className={`min-w-0 flex-1 p-4 md:p-6 ${asideMode === "hover" ? "md:ml-16" : "md:ml-56"}`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}