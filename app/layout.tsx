import "./globals.css";
import type { Metadata } from "next";
import { Audiowide } from "next/font/google";
import WhatsappFlyButton from "./components/WhatsappFlyButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Providers } from "./providers";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

export const metadata: Metadata = {
  title: "Inmobiliaria y Martillero Eduardo Raul Scotto | Alta Gracia, Córdoba",
  description:
    "Servicios inmobiliarios y de martillero en Alta Gracia, Córdoba. Propiedades y vehículos a la venta.",
  keywords:
    "inmobiliaria, martillero, Alta Gracia, Córdoba, Argentina, propiedades, vehículos, autos, Eduardo Raul Scotto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${audiowide.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
            <WhatsappFlyButton />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
