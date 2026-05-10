interface VoteArrowIconProps {
  direction: "up" | "down";
  className?: string;
}

export function VoteArrowIcon({
  direction,
  className,
}: VoteArrowIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`${direction === "down" ? "rotate-180" : ""} ${className ?? ""}`}
      fill="currentColor"
    >
      <path d="M10 2.5 2.75 10h4.5v7.5h5.5V10h4.5Z" />
    </svg>
  );
}
