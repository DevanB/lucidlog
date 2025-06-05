import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
