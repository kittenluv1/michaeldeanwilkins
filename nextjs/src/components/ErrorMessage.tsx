export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-100 items-center justify-center p-6 text-center text-red-600 text-2xl">
      {children}
    </div>
  );
}
