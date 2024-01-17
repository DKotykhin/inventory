"use client";

import React, { useTransition } from 'react';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

import { Mode, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';

import { EmailInput, PasswordInput, TextInput } from '@/components/inputs/_index';
import { SignUpTypes, signUpValidationSchema } from '@/validation/userValidation';

interface IRegisterFormValidation {
    defaultValues: SignUpTypes;
    resolver: Resolver<any>;
    mode: Mode;
}

const RegisterFormValidation: IRegisterFormValidation = {
    defaultValues: {
        userName: '',
        email: '',
        password: '',
    },
    resolver: zodResolver(signUpValidationSchema),
    mode: 'onChange',
};

export const SignUpForm = () => {

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignUpTypes>(RegisterFormValidation);

    const onSubmit: SubmitHandler<SignUpTypes> = async (formData) => {
        // console.log('data: ', formData);
        startTransition(async () => {
            await axios({
                method: 'POST',
                url: '/api/auth/sign-up',
                headers: {
                    "Content-Type": "application/json",
                },
                data: formData,
            })
                .then((res) => {
                    // console.log(res.data);
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
            <TextInput
                control={control}
                name='userName'
                placeholder='Type your name...'
                error={errors.userName}
                label='Your name'
            />
            <EmailInput
                control={control}
                name='email'
                placeholder='Type your email...'
                error={errors.email}
                label='Your email'
            />
            <PasswordInput
                control={control}
                name='password'
                placeholder='Type your password...'
                error={errors.password}
                label='Create password'
            />
            <Button
                type='submit'
                color='primary'
                variant='shadow'
                className={isPending ? 'opacity-70 mt-6' : 'mt-6'}
                isDisabled={isPending}
            >
                <Image
                    src={'/icons/user-pen.svg'}
                    alt={'pen'}
                    width={18}
                    height={18}
                />
                Sign Up
            </Button>
            <p className='w-full text-center text-grey-800 text-[14px] mt-4'>
                Already have an account?&nbsp;
                <Link href={'/sign-in'} className='text-green'>Sign in</Link> as a user
            </p>
        </form>
    );
};
