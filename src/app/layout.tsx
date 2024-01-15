import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer, Flip } from 'react-toastify';

import { generalMetaData } from '@/metadata/metadata';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

const inter = Inter({
    weight: ['300', '400', '500', '700', '900'],
    subsets: ['latin']
});

export const metadata: Metadata = generalMetaData;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className}>
                <Header />
                <SideBar />
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar
                    transition={Flip}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='colored'
                />
            </body>
        </html>
    );
}
