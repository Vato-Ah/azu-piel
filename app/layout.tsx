import type { Metadata } from "next";
import { Inter, Yellowtail } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Azu-Piel | Artículos de cuero artesanales",
  description:
    "Artículos de cuero hechos a mano en Cotacachi, Ecuador: carteras, cinturones, bolsos y chaquetas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${yellowtail.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}