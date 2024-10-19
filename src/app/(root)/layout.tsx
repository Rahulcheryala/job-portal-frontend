import Footer from "@/Components/Footer";
import Sidebar from "@/Components/Sidebar";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("access_token")?.value;

  const getAccountType = () => {
    const account_type = cookies().get("account_type")?.value;
    // console.log(token);
    // console.log(account_type);
    return account_type;
  };

  const account_type = getAccountType();

  return (
    <>
      <main className="min-h-screen w-full bg-white">
        <div className="flex">
          {account_type && <Sidebar isHirer={account_type === "job_hirer"} />}
          {children}
        </div>
      </main>
      <footer className={`${token && "ps-[4.5rem]"}  max-[450px]:ps-0`}>
        <Footer />
      </footer>
    </>
  );
}
