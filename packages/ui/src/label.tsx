import { cn } from "../../utils/cn";

export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "ui-block ui-text-grey-500 ui-text-[0.9375rem] ui-md:text-base ui-leading-[120%] ui-tracking-[0.2px]",
        className
      )}
    >
      {children}
    </label>
  );
}
