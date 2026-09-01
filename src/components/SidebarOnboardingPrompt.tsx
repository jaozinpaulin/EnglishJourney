import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";

export function SidebarOnboardingPrompt() {
    return (
        <div className="mx-3 mb-3 rounded-xl border border-[#C96B62]/20 bg-[#1A1414] p-3">
            <div className="flex items-center gap-2 text-[#C96B62]">
                <Compass size={15} />
                <span className="text-xs font-bold uppercase tracking-wider">Setup Pending</span>
            </div>
            <p className="mt-1 text-[11px] leading-tight text-[#8E8E88]">
                Complete your profile to generate your custom path.
            </p>
            <Link
                to="/onboarding"
                className="mt-2.5 flex items-center justify-between rounded-lg bg-[#C96B62]/15 px-2.5 py-1.5 text-[11px] font-semibold text-[#C96B62] transition-colors hover:bg-[#C96B62] hover:text-white"
            >
                <span>Complete now</span>
                <ArrowRight size={12} />
            </Link>
        </div>
    );
}