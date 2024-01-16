import { ReactNode } from "react";
import { cookies } from 'next/headers';

import userService from '@/services/userService';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
    children,
}: {
    children: ReactNode
}) {
    const token = cookies().get("token")?.value;
    let user = null;
    try {
        user = await userService.getUserByToken(`Bearer ${token}`);
    } catch (error) { }

    return user ? redirect('/') : <div>{children}</div>;

}