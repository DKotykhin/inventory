"use client";

import React, { useTransition } from 'react';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Mode, Resolver, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { emailValidationSchema } from '@/validation/userValidation';
import { EmailInput } from '@/components/inputs/_index';

interface ForgotPasswordFormValidationTypes {
    defaultValues: {
        email: string;
    };
    resolver: Resolver<any>;
    mode: Mode;
}

const ForgotPasswordFormValidation: ForgotPasswordFormValidationTypes = {
    defaultValues: {
        email: '',
    },
    resolver: zodResolver(emailValidationSchema),
    mode: 'onChange',
};

const ForgotPasswordForm = () => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{
        email: string;
    }>(ForgotPasswordFormValidation);

    const onSubmit = async (formData: {
        email: string;
    }) => {
        startTransition(async () => {
            await axios({
                method: 'POST',
                url: '/api/auth/reset-password',
                headers: {
                    "Content-Type": "application/json",
                },
                data: formData,
            })
                .then((res) => {
                    // console.log(res.data.token);
                    reset();
                    router.push('/send-email-message');
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        });
    };

    return (
        <form className='w-full flex flex-col gap-2 px-0 md:px-6' onSubmit={handleSubmit(onSubmit)}>
            <EmailInput
                control={control}
                name='email'
                placeholder='Type your email...'
                error={errors.email}
                label='Email'
            />
            <Button
                type='submit'
                color='primary'
                variant='shadow'
                className={isPending ? 'opacity-70 mt-6' : 'mt-6'}
                isDisabled={isPending}
            >
                <Image
                    src={'/icons/email.svg'}
                    alt={'lock'}
                    width={22}
                    height={22}
                />
                <span>Send Reset Link</span>
            </Button>
            <p className='w-full text-center text-grey-800 text-[14px] mt-4'>
                Return to
                <Link href={`/sign-in`} className='text-green'> Sign in </Link>page
            </p>
        </form>
    );
};

export { ForgotPasswordForm };