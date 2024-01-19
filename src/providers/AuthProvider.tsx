"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import axios from 'axios';

import { useUserStore } from '@/stores/userStore';
import { Spinner } from '../components/Spinner';

export const AuthProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const { addUser, userData } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/sign-in');
        }
        axios({
            method: 'GET',
            url: '/api/auth/get-by-token',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                addUser(res.data.user);
                // router.push('/');
            })
            .catch((error) => {
                router.push('/sign-in');
            });
    }, [addUser, router]);

    return userData?.id ? (
        <div>
            {children}
        </div>
    ) : <Spinner />;
};