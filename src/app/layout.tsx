import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url || ""],
    // },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <head>
        <link
          rel="shortcut icon"
          href="https://scontent.fdac22-2.fna.fbcdn.net/v/t39.30808-6/347637180_1690058611414478_8310985686478147867_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEPXfAXA187PD0br0v-xA3b3Q36cBLigkLdDfpwEuKCQufjBgsqQ8kdQUEMVv0gK9CW0WONbhDBnWlIdJDIyMdY&_nc_ohc=Vny7OtIpZ8kQ7kNvgGFbl76&_nc_ht=scontent.fdac22-2.fna&oh=00_AYBWnPvrPd3A0y9oiI5R7Cq1QidgyJa5GGtZl-t4fDmkpg&oe=6686C18C"
          type="image/x-icon"
        />
      </head>
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header />
        {children}
        <Footer />
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
