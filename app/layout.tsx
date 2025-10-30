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
  title: {
    default: "Inmobiliaria Scotto | Propiedades en Alta Gracia, Córdoba",
    template: "%s | Inmobiliaria Scotto Alta Gracia"
  },
  description: "Inmobiliaria Scotto - Especialistas en propiedades en Alta Gracia. Compra, venta y alquiler de casas, departamentos y terrenos. Asesoramiento profesional en bienes raíces.",
  keywords: [
    "inmobiliaria scotto",
    "inmobiliaria alta gracia", 
    "propiedades alta gracia",
    "casas en venta alta gracia",
    "alquiler alta gracia",
    "departamentos alta gracia",
    "terrenos alta gracia",
    "inmobiliaria córdoba",
    "martillero alta gracia",
    "bienes raíces alta gracia",
    "Eduardo Raul Scotto"
  ].join(", "),
  authors: [{ name: "Inmobiliaria Scotto" }],
  creator: "Inmobiliaria Scotto",
  publisher: "Inmobiliaria Scotto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://inmobiliariascotto.com.ar'), // Reemplaza con tu dominio real
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://inmobiliariascotto.com.ar',
    title: 'Inmobiliaria Scotto | Propiedades en Alta Gracia, Córdoba',
    description: 'Especialistas en propiedades en Alta Gracia. Compra, venta y alquiler de casas, departamentos y terrenos.',
    siteName: 'Inmobiliaria Scotto',
    images: [
      {
        url: '/images/og-image.jpg', // Asegúrate de crear esta imagen
        width: 1200,
        height: 630,
        alt: 'Inmobiliaria Scotto - Propiedades en Alta Gracia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inmobiliaria Scotto | Propiedades en Alta Gracia, Córdoba',
    description: 'Especialistas en propiedades en Alta Gracia. Compra, venta y alquiler.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agrega aquí tu Google Search Console cuando la tengas
    // google: 'tu-codigo-de-verificacion',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://inmobiliariascotto.com.ar" />
        <meta name="geo.region" content="AR-X" />
        <meta name="geo.placename" content="Alta Gracia, Córdoba" />
        <meta name="geo.position" content="-31.652966;-64.428268" />
        <meta name="ICBM" content="-31.652966, -64.428268" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5VRL83D8BV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5VRL83D8BV');
            `,
          }}
        />
      </head>
      <body className={`${audiowide.variable} antialiased`}>
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