"use client";

import React, { useTransition } from 'react';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
        formState: { errors },
    } = useForm<{
        email: string;
    }>(ForgotPasswordFormValidation);

    const onSubmit = async (formData: {
        email: string;
    }) => {
        const { email } = formData;
        startTransition(async () => {
            // try {
            //     const res = await resetPassword({ email });
            //     // console.log(res);
            //     router.push(`/${lang}/send-email-message`);
            // } catch (error: any) {
            //     toast.error(error.message);
            // }
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
            <button
                type='submit'
                className={isPending ? 'btn-green opacity-70 mt-6' : 'btn-green mt-6'}
                disabled={isPending}
            >
                <Image
                    src={'/icons/email.svg'}
                    alt={'lock'}
                    width={22}
                    height={22}
                />
                <span>Send Reset Link</span>
            </button>
            <p className='w-full text-center text-grey-800 text-[14px] mt-4'>
                Return to
                <Link href={`/sign-in`} className='text-green'> Login page</Link>
            </p>
        </form>
    );
};

export { ForgotPasswordForm };