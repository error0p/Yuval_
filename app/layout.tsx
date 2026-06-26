import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppCTA from '../components/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'Yuval Enterprise | Premium Home Solutions & Installations',
  description:
    'Enhancing modern living with premium uPVC Windows & Doors, Invisible Grills, Pleated Mosquito Nets, and Ceiling Cloth Hangers. Serving Siliguri, Gangtok, Sikkim, and North Bengal.',
  keywords: [
    'uPVC Windows Siliguri',
    'uPVC Doors Gangtok',
    'Invisible Grills Sikkim',
    'Mosquito Nets North Bengal',
    'Ceiling Hangers Siliguri',
    'Premium Home Solutions',
    'Yuval Enterprise',
  ],
  openGraph: {
    title: 'Yuval Enterprise | Premium Home Solutions & Installations',
    description:
      'Premium uPVC doors, windows, invisible safety grills, pleated mosquito nets, and automated utility hangers across North Bengal and Sikkim.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Yuval Enterprise',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppCTA />
      </body>
    </html>
  );
}
