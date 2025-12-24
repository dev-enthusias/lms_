export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="ui-block ui-text-grey-500 ui-text-[0.9375rem] ui-md:text-base ui-leading-[120%] ui-tracking-[0.2px]">
      {children}
    </label>
  );
}
