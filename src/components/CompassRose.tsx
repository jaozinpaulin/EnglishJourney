interface CompassRoseProps {
    className?: string;
}

export function CompassRose({ className = "" }: CompassRoseProps) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 800 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full select-none"
            >
                <defs>
                    <linearGradient id="needle-primary" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E07A70" />
                        <stop offset="100%" stopColor="#C96B62" />
                    </linearGradient>

                    <linearGradient id="needle-shade" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8C443D" />
                        <stop offset="100%" stopColor="#5E2B26" />
                    </linearGradient>

                    <linearGradient id="secondary-primary" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4A3231" />
                        <stop offset="100%" stopColor="#352221" />
                    </linearGradient>

                    <linearGradient id="secondary-shade" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2A1B1A" />
                        <stop offset="100%" stopColor="#1E1413" />
                    </linearGradient>
                </defs>

                <style>{`
                    @keyframes spin-cw {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes spin-ccw {
                        from { transform: rotate(360deg); }
                        to { transform: rotate(0deg); }
                    }
                    @keyframes pulse-soft {
                        0%, 100% { transform: scale(1); opacity: 0.9; }
                        50% { transform: scale(1.025); opacity: 1; }
                    }
                    .anim-orbit-far {
                        transform-origin: 400px 400px;
                        animation: spin-cw 80s linear infinite;
                    }
                    .anim-orbit-mid {
                        transform-origin: 400px 400px;
                        animation: spin-ccw 50s linear infinite;
                    }
                    .anim-orbit-inner {
                        transform-origin: 400px 400px;
                        animation: spin-cw 28s linear infinite;
                    }
                    .anim-spin-cw {
                        transform-origin: 400px 400px;
                        animation: spin-cw 75s linear infinite;
                    }
                    .anim-spin-ccw {
                        transform-origin: 400px 400px;
                        animation: spin-ccw 45s linear infinite;
                    }
                    .anim-pulse {
                        transform-origin: 400px 400px;
                        animation: pulse-soft 4s ease-in-out infinite;
                    }
                `}</style>

                <circle
                    cx="400"
                    cy="400"
                    r="375"
                    stroke="#222222"
                    strokeWidth="1.2"
                    strokeDasharray="10 20"
                />
                <g className="anim-orbit-far">
                    <g transform="translate(400, 25)">
                        <circle cx="0" cy="0" r="8.5" fill="#C96B62" />
                        <ellipse rx="17" ry="6" stroke="#E07A70" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(-25)" />
                    </g>
                    <circle cx="775" cy="400" r="5.5" fill="#777770" />
                    <circle cx="135" cy="665" r="4" fill="#444440" />
                </g>

                <circle
                    cx="400"
                    cy="400"
                    r="285"
                    stroke="#2E201F"
                    strokeWidth="1.2"
                    strokeDasharray="8 14"
                />
                <g className="anim-orbit-mid">
                    <g transform="translate(140, 290)">
                        <circle cx="0" cy="0" r="7" fill="#E07A70" />
                        <circle cx="0" cy="0" r="12" stroke="#E07A70" strokeOpacity="0.3" strokeWidth="1" />
                    </g>
                    <circle cx="660" cy="510" r="5" fill="#999994" />
                </g>

                <circle
                    cx="400"
                    cy="400"
                    r="215"
                    stroke="#2B2B2B"
                    strokeWidth="1.2"
                    strokeDasharray="5 10"
                />
                <g className="anim-orbit-inner">
                    <circle cx="400" cy="185" r="6" fill="#C96B62" />
                    <circle cx="185" cy="400" r="4" fill="#666660" />
                </g>

                <g className="anim-spin-cw">
                    <circle
                        cx="400"
                        cy="400"
                        r="160"
                        stroke="#2A2A2A"
                        strokeWidth="1.5"
                        strokeDasharray="4 8"
                    />
                    <circle cx="400" cy="400" r="130" stroke="#1F1F1F" strokeWidth="1" />

                    <circle cx="400" cy="240" r="2.5" fill="#555550" />
                    <circle cx="400" cy="560" r="2.5" fill="#555550" />
                    <circle cx="560" cy="400" r="2.5" fill="#555550" />
                    <circle cx="240" cy="400" r="2.5" fill="#555550" />
                </g>

                <g className="anim-spin-ccw">
                    <circle
                        cx="400"
                        cy="400"
                        r="105"
                        stroke="#C96B62"
                        strokeOpacity="0.25"
                        strokeWidth="1"
                        strokeDasharray="2 10"
                    />
                    <line x1="290" y1="290" x2="510" y2="510" stroke="#222222" strokeWidth="1" />
                    <line x1="510" y1="290" x2="290" y2="510" stroke="#222222" strokeWidth="1" />
                </g>

                <line x1="400" y1="240" x2="400" y2="560" stroke="#2B2B2B" strokeWidth="1" />
                <line x1="240" y1="400" x2="560" y2="400" stroke="#2B2B2B" strokeWidth="1" />

                <g>
                    <polygon points="400,400 460,340 400,387" fill="url(#secondary-primary)" />
                    <polygon points="400,400 460,340 413,400" fill="url(#secondary-shade)" />

                    <polygon points="400,400 460,460 413,400" fill="url(#secondary-primary)" />
                    <polygon points="400,400 460,460 400,413" fill="url(#secondary-shade)" />

                    <polygon points="400,400 340,460 400,413" fill="url(#secondary-primary)" />
                    <polygon points="400,400 340,460 387,400" fill="url(#secondary-shade)" />

                    <polygon points="400,400 340,340 387,400" fill="url(#secondary-primary)" />
                    <polygon points="400,400 340,340 400,387" fill="url(#secondary-shade)" />
                </g>

                <g className="anim-pulse">
                    <polygon points="400,400 400,260 414,386" fill="url(#needle-primary)" />
                    <polygon points="400,400 400,260 386,386" fill="url(#needle-shade)" />

                    <polygon points="400,400 400,540 386,414" fill="url(#needle-primary)" />
                    <polygon points="400,400 400,540 414,414" fill="url(#needle-shade)" />

                    <polygon points="400,400 540,400 414,386" fill="url(#needle-primary)" />
                    <polygon points="400,400 540,400 414,414" fill="url(#needle-shade)" />

                    <polygon points="400,400 260,400 386,414" fill="url(#needle-primary)" />
                    <polygon points="400,400 260,400 386,386" fill="url(#needle-shade)" />
                </g>

                <text
                    x="400"
                    y="246"
                    fill="#E07A70"
                    fontSize="14"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    N
                </text>
                <text
                    x="400"
                    y="566"
                    fill="#777770"
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    S
                </text>
                <text
                    x="566"
                    y="405"
                    fill="#777770"
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    E
                </text>
                <text
                    x="234"
                    y="405"
                    fill="#777770"
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    W
                </text>

                <circle cx="400" cy="400" r="14" fill="#121212" stroke="#C96B62" strokeWidth="2" />
                <circle cx="400" cy="400" r="5.5" fill="#E07A70" />
            </svg>
        </div>
    );
}