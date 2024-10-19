import { cookies } from "next/headers";

const checkToken = () => {
  const token = cookies().get("access_token")?.value;
  // console.log(token);
  return token;
};

export default function SeekerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = checkToken();

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className={`flex ${token && "ps-[4.5rem]"} max-[450px]:ps-0`}>
        {children}
      </div>
    </main>
  );
}
