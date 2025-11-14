import React from "react";

function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-10 box-border font-sans"
      role="main"
      aria-labelledby="nf-title"
      
    >
      <div
        className="flex flex-col md:flex-row gap-9 md:gap-9 items-center w-full max-w-[980px] p-9 md:p-9 rounded-xl border backdrop-blur-md"
        aria-hidden={false}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          borderColor: "rgba(255,255,255,0.06)",
          boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
        }}
      >
        <svg
          className="flex-none w-40 md:w-[220px] h-40 md:h-[220px] origin-center"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Illustration of a folded page with a sad face"
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stopColor="#9fb8ff" />
              <stop offset="1" stopColor="#ff9ac1" />
            </linearGradient>
            <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="12"
                floodColor="#0b1728"
                floodOpacity="0.6"
              />
            </filter>
          </defs>

          <g transform="translate(16,8)" filter="url(#f1)">
            <rect x="10" y="10" width="152" height="180" rx="12" fill="url(#g1)" />
            <path d="M26 26h88v28H26z" fill="rgba(255,255,255,0.12)" />
            <path d="M26 70h120v6H26z" fill="rgba(255,255,255,0.08)" />
            <g transform="translate(38,92)">
              <ellipse cx="44" cy="46" rx="32" ry="22" fill="#071033" opacity="0.08" />
              <circle cx="20" cy="8" r="8" fill="#071033" opacity="0.12" />
              <circle cx="68" cy="8" r="8" fill="#071033" opacity="0.12" />
              <path
                d="M16 26c10 12 36 12 46 0"
                stroke="#071033"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
            </g>

            <text
              x="135"
              y="45"
              fill="#ffffff"
              fontSize="20"
              fontWeight="700"
              textAnchor="end"
              opacity="0.9"
            >
              Not Found
            </text>
          </g>

          <g transform="translate(0,0)" opacity="0.6">
            <circle cx="160" cy="28" r="6" fill="#ffd6e6" />
            <circle cx="180" cy="60" r="4" fill="#cfe8ff" />
            <circle cx="160" cy="100" r="3" fill="#e8d6ff" />
          </g>
        </svg>

        <div className="flex-1">
          <h1 id="nf-title" className="m-0 text-[56px] md:text-[72px] leading-tight">
            404
          </h1>
          <h2 className="mt-1 mb-3 text-[20px] font-semibold">Page not found</h2>
          <p className="mb-5 max-w-[520px] leading-relaxed">
            The page you are looking for doesn't exist or has been moved. Try returning home or go back
            to where you came from.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              title="Go to homepage"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold bg-linear-to-r from-white/40 to-white/80 no-underline"
            >
              Go home
            </a>

            <button
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border font-semibold transition-transform hover:-translate-y-1"
              onClick={() => {
                if (window.history.length > 1) window.history.back();
                else (window.location.href = "/");
              }}
              aria-label="Go back"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
