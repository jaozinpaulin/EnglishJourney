interface CompassRoseProps {
    className?: string;
}

export function CompassRose({ className = "" }: CompassRoseProps) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full select-none"
            >
                <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-subtle {
            0%, 100% { opacity: 0.85; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          .animate-spin-compass {
            transform-origin: center;
            animation: spin-slow 90s linear infinite;
          }
          .animate-pulse-center {
            transform-origin: center;
            animation: pulse-subtle 4s ease-in-out infinite;
          }
        `}</style>

                {/* 1. Anel externo com rotação lenta */}
                <g className="animate-spin-compass">
                    <circle
                        cx="200"
                        cy="200"
                        r="180"
                        stroke="#262626"
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                    />
                    <circle cx="200" cy="200" r="140" stroke="#2A2A2A" strokeWidth="1.5" />
                    <circle cx="200" cy="200" r="70" stroke="#333333" strokeWidth="1" />

                    {/* Marcadores e eixos diagonais */}
                    <line x1="65" y1="65" x2="335" y2="335" stroke="#222222" strokeWidth="1" />
                    <line x1="335" y1="65" x2="65" y2="335" stroke="#222222" strokeWidth="1" />
                </g>

                {/* 2. Eixos fixos */}
                <line x1="200" y1="10" x2="200" y2="390" stroke="#2B2B2B" strokeWidth="1" />
                <line x1="10" y1="200" x2="390" y2="200" stroke="#2B2B2B" strokeWidth="1" />

                {/* 3. Pontos Cardeais menores (NE, SE, SW, NW) */}
                <polygon points="200,200 270,130 200,185" fill="#3D2928" />
                <polygon points="200,200 270,130 215,200" fill="#2E1E1D" />

                <polygon points="200,200 270,270 215,200" fill="#3D2928" />
                <polygon points="200,200 270,270 200,215" fill="#2E1E1D" />

                <polygon points="200,200 130,270 200,215" fill="#3D2928" />
                <polygon points="200,200 130,270 185,200" fill="#2E1E1D" />

                <polygon points="200,200 130,130 185,200" fill="#3D2928" />
                <polygon points="200,200 130,130 200,185" fill="#2E1E1D" />

                {/* 4. Pontas Cardeais principais com pulsação suave (N, S, E, W) */}
                <g className="animate-pulse-center">
                    {/* Norte */}
                    <polygon points="200,200 200,40 215,185" fill="#C96B62" />
                    <polygon points="200,200 200,40 185,185" fill="#8C443D" />

                    {/* Sul */}
                    <polygon points="200,200 200,360 185,215" fill="#C96B62" />
                    <polygon points="200,200 200,360 215,215" fill="#8C443D" />

                    {/* Leste */}
                    <polygon points="200,200 360,200 215,185" fill="#C96B62" />
                    <polygon points="200,200 360,200 215,215" fill="#8C443D" />

                    {/* Oeste */}
                    <polygon points="200,200 40,200 185,215" fill="#C96B62" />
                    <polygon points="200,200 40,200 185,185" fill="#8C443D" />
                </g>

                {/* 5. Tipografia dos pontos */}
                <text
                    x="200"
                    y="28"
                    fill="#C96B62"
                    fontSize="15"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    N
                </text>
                <text
                    x="200"
                    y="388"
                    fill="#777770"
                    fontSize="15"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    S
                </text>
                <text
                    x="385"
                    y="205"
                    fill="#777770"
                    fontSize="15"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    E
                </text>
                <text
                    x="15"
                    y="205"
                    fill="#777770"
                    fontSize="15"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    W
                </text>

                {/* 6. Núcleo central */}
                <circle
                    cx="200"
                    cy="200"
                    r="14"
                    fill="#171717"
                    stroke="#C96B62"
                    strokeWidth="2"
                />
                <circle cx="200" cy="200" r="5" fill="#C96B62" />
            </svg>
        </div>
    );
} 