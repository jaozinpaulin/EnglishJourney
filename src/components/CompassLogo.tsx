interface CompassLogoProps {
    className?: string;
}

export function CompassLogo({ className = "h-8 w-8" }: CompassLogoProps) {
    return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
            >
                {/* 1. Anel externo com rotação lenta e sutil */}
                <style>{`
                    @keyframes spin-orbit {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .logo-orbit {
                        transform-origin: 50px 50px;
                        animation: spin-orbit 40s linear infinite;
                    }
                `}</style>

                {/* Órbita externa com nós planetários */}
                <g className="logo-orbit">
                    <circle
                        cx="50"
                        cy="50"
                        r="47"
                        stroke="#2B2B2B"
                        strokeWidth="1"
                        strokeDasharray="3 6"
                    />
                    <circle cx="50" cy="3" r="2.2" fill="#E07A70" />
                    <circle cx="97" cy="50" r="1.5" fill="#777770" />
                </g>

                {/* 2. Pontas Secundárias (Diagonais) - Expandidas */}
                <polygon points="50,50 68,32 50,45" fill="#4A3231" />
                <polygon points="50,50 68,32 55,50" fill="#2A1B1A" />

                <polygon points="50,50 68,68 55,50" fill="#4A3231" />
                <polygon points="50,50 68,68 50,55" fill="#2A1B1A" />

                <polygon points="50,50 32,68 50,55" fill="#4A3231" />
                <polygon points="50,50 32,68 45,50" fill="#2A1B1A" />

                <polygon points="50,50 32,32 45,50" fill="#4A3231" />
                <polygon points="50,50 32,32 50,45" fill="#2A1B1A" />

                {/* 3. Pontas Cardeais Principais (N, S, E, W) - Ocupando todo o espaço */}
                {/* Norte */}
                <polygon points="50,50 50,4 56,44" fill="#E07A70" />
                <polygon points="50,50 50,4 44,44" fill="#8C443D" />

                {/* Sul */}
                <polygon points="50,50 50,96 44,56" fill="#E07A70" />
                <polygon points="50,50 50,96 56,56" fill="#8C443D" />

                {/* Leste */}
                <polygon points="50,50 96,50 56,44" fill="#E07A70" />
                <polygon points="50,50 96,50 56,56" fill="#8C443D" />

                {/* Oeste */}
                <polygon points="50,50 4,50 44,56" fill="#E07A70" />
                <polygon points="50,50 4,50 44,44" fill="#8C443D" />

                {/* 4. Núcleo central */}
                <circle cx="50" cy="50" r="5.5" fill="#121212" stroke="#C96B62" strokeWidth="1.8" />
                <circle cx="50" cy="50" r="2.2" fill="#E07A70" />
            </svg>
        </div>
    );
}