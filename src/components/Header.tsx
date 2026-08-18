import { BookOpen, Clock3, Flame, Menu, X } from "lucide-react"
interface HeaderProps {
    isMenuOpen: boolean;
    onMenuToggle: () => void;
}

function Header({ isMenuOpen, onMenuToggle }: HeaderProps) {
    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    })

    return (
        <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[#2B2B2B] bg-[#151515]">
            <div className=" flex h-full  items-center justify-between px-5 lb:px-6">

                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5">
                        <svg
                            viewBox="0 0 64 64"
                            className="h-6 w-6 shrink-0 text-[#B85C55]"
                            fill="currentColor"
                            aria-label="English Journey"
                            role="img"
                        >
                            <path d="M32 3 27 17 18 10 20 23 7 20 17 31 5 37 22 39 16 53 29 46 32 61 35 46 48 53 42 39 59 37 47 31 57 20 44 23 46 10 37 17 32 3Z" />
                        </svg>

                        <h1 className="truncate text-base font-bold tracking-tight text-[#E7E5E1] sm:text-lg">
                            English Journey
                        </h1>
                    </div>

                    <div className="hidden h-5 w-px bg-[#2B2B2B] sm:block" />
                    <span className="hidden whitespace-nowrap text-sm text-[#999994] sm:block">
                        {formattedDate}
                    </span>

                </div>
                <div className="items-center gap-6 hidden md:flex">
                    <div className="flex items-center gap-6">

                        <div className="flex items-center gap-2.5">
                            <Flame size={17} strokeWidth={1.8} className="text-[#B85C55]" />
                            <span className="text-sm text-[#999994]">
                                7 days
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Clock3 size={17} strokeWidth={1.8} className="text-[#637982]" />
                            <span className="text-sm text-[#999994]">
                                42 min
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <BookOpen size={17} strokeWidth={1.8} className="text-[#B58A55]" />
                            <span className="text-sm text-[#999994]">
                                3 / 4
                            </span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#2B2B2B]" />
                    <span className="fi fi-ca" title="Canada" />

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#343434] bg-[#1D1D1D] text-sm font-semibold text-[#C96B62]">
                        J
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onMenuToggle}
                    className="rounded-lg p-2 text-[#999994] transition-colors hover:bg-[#1D1D1D] hover:text-[#E7E5E1] md:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? (
                        <X size={20} />
                    ) : (
                        <Menu size={20} />
                    )}
                </button>

            </div>

        </header>
    )
}

export default Header