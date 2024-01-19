import { ReactNode } from "react";

import { AuthProvider } from '@/providers/AuthProvider';

export default function UserLayout({
    children,
}: {
    children: ReactNode
}) {

    return (
        <main className='w-full mt-16'>
            <AuthProvider>
                {children}
            </AuthProvider>
        </main>
    );
}