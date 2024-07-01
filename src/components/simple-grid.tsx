export function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-32 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
