import {
    BookOpen,
    Clock3,
    Flame,
} from "lucide-react"

function Header() {
    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    })

    return (
        <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[#2B2B2B] bg-[#151515]">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">

                {/* Brand + Date */}
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3">
                        <span className="text-lg text-[#B85C55]">
                            ✦
                        </span>

                        <h1 className="text-lg font-bold tracking-tight text-[#E7E5E1]">
                            English Journey
                        </h1>
                    </div>

                    <div className="h-5 w-px bg-[#2B2B2B]" />

                    <span className="text-sm text-[#999994]">
                        {formattedDate}
                    </span>
                </div>

                {/* Study information */}
                <div className="flex items-center gap-6">

                    <div className="flex items-center gap-6">

                        {/* Streak */}
                        <div className="flex items-center gap-2.5">
                            <Flame
                                size={17}
                                strokeWidth={1.8}
                                className="text-[#B85C55]"
                            />

                            <span className="text-sm text-[#999994]">
                                7 days
                            </span>
                        </div>

                        {/* Study time */}
                        <div className="flex items-center gap-2.5">
                            <Clock3
                                size={17}
                                strokeWidth={1.8}
                                className="text-[#637982]"
                            />

                            <span className="text-sm text-[#999994]">
                                42 min
                            </span>
                        </div>

                        {/* Daily progress */}
                        <div className="flex items-center gap-2.5">
                            <BookOpen
                                size={17}
                                strokeWidth={1.8}
                                className="text-[#B58A55]"
                            />

                            <span className="text-sm text-[#999994]">
                                3 / 4
                            </span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />

                    {/* Canada */}
                    <span
                        className="fi fi-ca"
                        title="Canada"
                    />

                    {/* Profile */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#343434] bg-[#1D1D1D] text-sm font-semibold text-[#C96B62]">
                        J
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header