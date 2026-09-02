/**
 * Abstract geometric logo — near-black, premium, minimal.
 */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className="text-[#111111]"
    >
      {/* Organic-geometric mark: overlapping leaf/arcs */}
      <path
        d="M14 2C20 6 24 10 24 15.5C24 21 19.5 26 14 26C8.5 26 4 21 4 15.5C4 10 8 6 14 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M14 8V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M14 15C11.5 13.5 9.5 13 7 13.5"
        stroke="#12B76A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const BRAND_NAME = "Curricula";

export const isGoogleConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
  !process.env.GOOGLE_CLIENT_ID.startsWith("your-") &&
  process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.GOOGLE_CLIENT_SECRET.startsWith("your-"),
);
