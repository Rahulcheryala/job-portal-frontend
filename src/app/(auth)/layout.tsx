export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="h-screen bg-white w-full">{children}</main>
    </>
  );
}
