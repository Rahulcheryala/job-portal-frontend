export default function RecruiterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="flex ps-[4.5rem] max-[450px]:ps-0">{children}</div>
    </main>
  );
}
