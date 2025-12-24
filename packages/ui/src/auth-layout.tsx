export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="ui:bg-[url(/classroom.jpg)] ui:px-2.5 ui:min-h-screen ui:flex ui:items-center ui:justify-center ui:bg-cover ui:bg-no-repeat ui:relative">
      <div className="ui:absolute ui:inset-0 ui:h-full ui:w-full ui:bg-black/80 ui:backdrop-blur" />
      {children}
    </main>
  );
}
