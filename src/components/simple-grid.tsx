export function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-32 grid grid-cols-1 gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
}
