const LABEL: Record<string, string> = {
  LOCKED: "verrouillé",
  AVAILABLE: "à faire",
  IN_PROGRESS: "en cours",
  COMPLETED: "validé",
  MASTERED: "validé",
};

const CLASS: Record<string, string> = {
  LOCKED: "status-locked bg-status-locked",
  AVAILABLE: "status-available bg-status-available",
  IN_PROGRESS: "status-in-progress bg-status-in-progress",
  COMPLETED: "status-completed bg-status-completed",
  MASTERED: "status-completed bg-status-completed",
};

export function SkillStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-xs font-medium ${CLASS[status] ?? CLASS.AVAILABLE}`}
    >
      {LABEL[status] ?? status}
    </span>
  );
}
