import { Dancing_Script, Playfair_Display, Open_Sans, Play } from 'next/font/google';

export const dancing = Dancing_Script({ subsets: ['vietnamese'] });

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal', 'italic']
});

export const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500']
});

export const play = Play({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'] // Added required weight property
});