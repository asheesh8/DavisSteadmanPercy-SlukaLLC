import { getSettings } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();
  return (
    <>
      <Navbar logo={settings.logo} firmName={settings.firmName} phone={settings.phone} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <Chatbot phone={settings.phone} />
    </>
  );
}
