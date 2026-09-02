"use client";

type Props = {
  googleReady: boolean;
  onLogin: () => void;
  onSignup: () => void;
};

const BTN =
  "flex h-[52px] w-full items-center justify-center rounded-[10px] text-[15px] font-medium transition-colors";

export function AuthButtons({ googleReady, onLogin, onSignup }: Props) {
  return (
    <div className="space-y-3">
      {/* Login — soft light-gray filled → opens the email form inline */}
      <button
        type="button"
        onClick={onLogin}
        className={`${BTN} bg-[#F0F0EE] text-[#111111] hover:bg-[#E9E9E6]`}
      >
        Login
      </button>

      {/* Sign Up — white with subtle border → opens the signup form inline */}
      <button
        type="button"
        onClick={onSignup}
        className={`${BTN} border border-[#E1E1DD] bg-white text-[#111111] hover:border-[#D4D4CF]`}
      >
        Sign Up
      </button>

      {/* Google — slightly darker neutral surface */}
      <a
        href={googleReady ? "/api/auth/google" : undefined}
        aria-disabled={!googleReady}
        className={`${BTN} bg-[#E9E9E6] text-[#111111] hover:bg-[#E2E2DE] ${
          googleReady ? "" : "pointer-events-none opacity-50"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="mr-2.5">
          <path
            fill="#4285F4"
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
          />
          <path
            fill="#34A853"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z"
          />
          <path
            fill="#FBBC05"
            d="M3.97 10.72A5.41 5.41 0 013.68 9c0-.6.1-1.18.28-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.82.96 4.05l3.01-2.33z"
          />
          <path
            fill="#EA4335"
            d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 009 0 9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
          />
        </svg>
        Continue with Google
      </a>
    </div>
  );
}
