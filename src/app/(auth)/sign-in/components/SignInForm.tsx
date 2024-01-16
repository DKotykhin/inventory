"use client";

import React, { useTransition } from 'react';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mode, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { SignInTypes, signInValidationSchema } from '@/validation/userValidation';
import { useUserStore } from '@/stores/userStore';
import { EmailInput, PasswordInput } from '@/components/inputs/_index';

interface ISignInFormValidation {
    defaultValues: SignInTypes;
    resolver: Resolver<any>;
    mode: Mode;
}

const SignInFormValidation: ISignInFormValidation = {
    defaultValues: {
        email: '',
        password: '',
    },
    resolver: zodResolver(signInValidationSchema),
    mode: 'onChange',
};

export const SignInForm = () => {

    const [isPending, startTransition] = useTransition();
    const { addUser } = useUserStore();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignInTypes>(SignInFormValidation);

    const onSubmit: SubmitHandler<SignInTypes> = async (formData) => {
        // console.log('data: ', formData);
        startTransition(async () => {
            await axios({
                method: 'POST',
                url: '/api/auth/sign-in',
                headers: {
                    "Content-Type": "application/json",
                },
                data: formData,
            })
                .then((res) => {
                    // console.log(res.data.token);
                    reset();
                    Cookies.set('token', res.data?.token, {
                        expires: 2,
                    });
                    addUser(res.data.user);
                    router.push('/');
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
            <PasswordInput
                control={control}
                name='password'
                placeholder='Type your password...'
                error={errors.password}
                label='Password'
            />
            <div className='w-full text-right'>
                <Link href={'/forgot-password'} className='text-[14px] text-green'>
                    Forgot password?
                </Link>
            </div>
            <button
                type='submit'
                className={isPending ? 'btn-green opacity-70 mt-6' : 'btn-green mt-6'}
                disabled={isPending}
            >
                <Image
                    src={'/icons/lock.svg'}
                    alt={'lock'}
                    width={18}
                    height={18}
                />
                <span>Sign in</span>
            </button>
            <p className='w-full text-center text-grey-800 text-[14px] mt-4'>
                Don&apos;t have an account?&nbsp;
                <Link href={'/sign-up'} className='text-green'>Sign up</Link> as a new user
            </p>
        </form>
    );
};
