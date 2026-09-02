export function ProgressBar({
  value,
  className = "",
  color = "accent",
}: {
  value: number;
  className?: string;
  color?: "accent" | "success";
}) {
  const colorClass = color === "success" ? "bg-success" : "bg-accent";

  return (
    <div className={`progress-bar ${className}`}>
      <div
        className={`progress-bar-fill ${colorClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
