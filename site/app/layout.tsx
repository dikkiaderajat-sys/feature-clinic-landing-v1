import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({variable:'--font-inter',subsets:['latin'],display:'swap'});
export const metadata: Metadata = {
  title: 'Clinic WhatsApp Booking Automation | Datautomasi',
  description: 'Otomatisasi booking klinik melalui WhatsApp untuk cek jadwal, booking, reschedule, pembatalan, dan pencatatan data pasien secara lebih cepat dan profesional.',
  robots: {index:false,follow:false},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="id"><body className={inter.variable}>{children}</body></html>;
}
