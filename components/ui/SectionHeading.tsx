import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-16 max-w-xl",
        center && "mx-auto text-center"
      )}
    >
      <div
        className={cn(
          "mb-4 inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-[var(--blue-2)]",
          center && "justify-center"
        )}
      >
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--blue-2)] shadow-[0_0_10px_var(--glow)]" />
        {eyebrow}
      </div>
      <h2 className="font-heading text-[clamp(1.9rem,3vw+1rem,2.7rem)] font-semibold leading-tight text-[var(--text-1)]">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-[1.05rem] text-[var(--text-2)]">{description}</p>
      )}
    </div>
  );
}
