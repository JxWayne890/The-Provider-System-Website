export default function Logo({ className = "" }) {
    return (
        <svg
            viewBox="0 0 500 240"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(250, 120)" textAnchor="middle">
                {/* "The" - Script style */}
                <text y="-60" fontSize="70" fill="#0B3060" fontStyle="italic" style={{ fontFamily: 'serif' }}>The</text>

                {/* "PROVIDER" - Bold Serif */}
                <text y="20" fontSize="95" fill="#0B3060" fontWeight="900" style={{ fontFamily: 'serif' }}>PROVIDER</text>

                {/* "SYSTEM" - Vibrant Orange Gold */}
                <text y="95" fontSize="75" fill="#FF9F1C" fontWeight="900" letterSpacing="8" style={{ fontFamily: 'sans-serif' }}>SYSTEM</text>
            </g>
        </svg>
    );
}
