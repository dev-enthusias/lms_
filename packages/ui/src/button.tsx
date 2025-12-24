export function Button({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      className={`ui:w-full ui:bg-primary ui:text-white ui:h-14 ui:rounded-xl ui:border-none ui:px-4 ui:py-3 ui:disabled:bg-grey-100 ui:disabled:text-grey-200 ui:font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
