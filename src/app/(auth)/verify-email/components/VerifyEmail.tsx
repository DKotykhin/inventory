"use client";

import React, { useEffect, useState, useTransition } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import axios from 'axios';

import { Spinner } from '@/components/Spinner';
import { AuthWrapper } from '@/components/wrappers/AuthWrapper';

export const VerifyEmail = ({ token }: { token?: string }) => {

    const [error, setError] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        if (token) {
            startTransition(async () => {
                await axios({
                    method: 'POST',
                    url: '/api/auth/verify-email',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: { token },
                })
                    .then((res) => {
                        toast.success(res.data.message);
                        router.push('/');
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                        setError(true);
                    });
            });
        }
    }, [router, token]);

    if (error) {
        return (
            <AuthWrapper>
                <p className='text-green text-5xl'>Oops...</p>
                <p className='text-grey-500 text-2xl mb-4'>Something went wrong</p>
                <div className='text-center'>
                    <Link href={`/sign-in`} className='text-green text-2xl hover:underline'>
                        Sign in
                    </Link>
                    <p>with correct credentials</p>
                </div>
                <p>- or -</p>
                <div className='text-center'>
                    <Link href={`/sign-up`} className='text-green text-2xl hover:underline'>
                        Sign up
                    </Link>
                    <p>with new ones</p>
                </div>                
            </AuthWrapper>
        );
    }

    return isPending ?
        <div className='w-full h-full flex justify-center items-center my-12'>
            <Spinner />
        </div>
        :
        null;
};
