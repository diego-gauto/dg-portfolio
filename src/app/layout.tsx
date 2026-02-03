import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Diego Gauto | Arquitecto de Software & Especialista en IA',
  description: 'Consultoría técnica senior para empresas en LATAM y España. Diseño sistemas escalables y soluciones de IA productizables (RAG, Agentes) que resuelven problemas reales.',
  keywords: ['Arquitecto de Software', 'Especialista IA', 'Consultoría Técnica', 'LangGraph', 'RAG Empresarial', 'Next.js', 'React Server Components'],
  authors: [{ name: 'Diego Gauto' }],
  creator: 'Diego Gauto',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://diegogauto.dev',
    title: 'Diego Gauto | Arquitecto de Software & Especialista en IA',
    description: 'Transformo deuda técnica en ventaja competitiva. Consultoría senior en Arquitectura y Sistemas Agénticos.',
    siteName: 'Diego Gauto Portfolio',
    // images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Diego Gauto Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Gauto | Arquitecto de Software',
    description: 'Consultoría técnica senior. Arquitectura escalable & IA aplicada.',
    creator: '@diegogauto',
    // images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
