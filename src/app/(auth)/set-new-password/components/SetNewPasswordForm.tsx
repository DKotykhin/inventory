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

import { PasswordInput } from '@/components/inputs/_index';
import { SetNewPasswordTypes, setNewPasswordValidationSchema } from '@/validation/userValidation';

interface ISetNewPasswordFormValidation {
    defaultValues: SetNewPasswordTypes;
    resolver: Resolver<any>;
    mode: Mode;
}

const SetNewPasswordFormValidation: ISetNewPasswordFormValidation = {
    defaultValues: {
        password: '',
        confirmPassword: '',
    },
    resolver: zodResolver(setNewPasswordValidationSchema),
    mode: 'onChange',
};

export const SetNewPasswordForm = ({ token }: { token: string }) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SetNewPasswordTypes>(SetNewPasswordFormValidation);

    const onSubmit = async (formData: SetNewPasswordTypes) => {
        // console.log('data: ', formData);
        const { password } = formData;
        startTransition(async () => {
            startTransition(async () => {
                await axios({
                    method: 'POST',
                    url: '/api/auth/set-new-password',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: { token, password },
                })
                    .then(() => {
                        toast.success('New password successfully set');
                        reset();
                        router.push('/sign-in');
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                    });
            });
        });
    };

    return (
        <form className='w-full flex flex-col gap-2 px-0 md:px-6' onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
                control={control}
                name='password'
                placeholder='Type new password...'
                error={errors.password}
                label='New password'
            />
            <PasswordInput
                control={control}
                name='confirmPassword'
                placeholder='Repeat password...'
                error={errors.confirmPassword}
                label='Confirm password'
            />
            <Button
                type='submit'
                color='primary'
                variant='shadow'
                className={isPending ? 'opacity-70 mt-6' : 'mt-6'}
                isDisabled={isPending}
            >
                <Image
                    src={'/icons/key.svg'}
                    alt={'key'}
                    width={18}
                    height={18}
                />
                <span>Set new password</span>
            </Button>
            <p className='w-full text-center text-grey-800 text-[14px] mt-4'>
                Return to
                <Link href={'/sign-in'} className='text-green'> Sign in </Link>page
            </p>
        </form>
    );
};
