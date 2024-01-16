import { ReactNode } from "react";

import { AuthProvider } from '@/components/AuthProvider';

export default function UserLayout({
    children,
}: {
    children: ReactNode
}) {

    return (
        <div className='mt-16'>
            <AuthProvider>
                {children}
            </AuthProvider>
        </div>
    );
}