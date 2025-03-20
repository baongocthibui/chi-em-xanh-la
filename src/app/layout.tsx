import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import { playfair } from './fonts';
import { Mulish } from 'next/font/google';
import HeartRain from './components/HeartRain'

const muli = Mulish({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'chị em xanh lá',
  description: 'xanh la invitation website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.className} ${muli.className}`}>
      <body style={{ margin: 0 }}>
        <HeartRain />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}