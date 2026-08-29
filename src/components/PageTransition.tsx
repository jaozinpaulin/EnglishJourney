import { useLocation } from "react-router-dom";

type PageTransitionProps = {
    children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();

    return (
        <div
            key={location.pathname}
            className="animate-page-enter"
        >
            {children}
        </div>
    );
}
