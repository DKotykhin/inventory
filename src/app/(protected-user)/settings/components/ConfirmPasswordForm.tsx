"use client";

import React, { useTransition } from 'react';

import Image from "next/image";
import { Button } from '@nextui-org/react';

import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Mode, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { passwordValidationSchema } from '@/validation/userValidation';
import { PasswordInput } from '@/components/inputs/_index';

interface ConfirmPasswordFormValidationTypes {
    defaultValues: {
        password: string;
    };
    resolver: Resolver<any>;
    mode: Mode;
}

const ConfirmPasswordFormValidation: ConfirmPasswordFormValidationTypes = {
    defaultValues: {
        password: '',
    },
    resolver: zodResolver(passwordValidationSchema),
    mode: 'onChange',
};

interface ConfirmPasswordFormProps {
    passwordConfirmed: () => void;
    cancelClick: () => void;
}

export const ConfirmPasswordForm: React.FC<ConfirmPasswordFormProps> = ({ passwordConfirmed, cancelClick }) => {

    const [isPending, startTransition] = useTransition();
    const cookies = Cookies.get('token');

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ password: string }>(ConfirmPasswordFormValidation);

    const onSubmit: SubmitHandler<{ password: string }> = async (formData) => {
        // console.log('data: ', formData);
        startTransition(async () => {
            await axios({
                method: 'POST',
                url: '/api/user/confirm-password',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies}`
                },
                data: formData,
            })
                .then((res) => {
                    reset();
                    toast.success(res.data.message);
                    passwordConfirmed();
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        });
    };

    return (
        <form className='w-full flex flex-col gap-4 px-0 md:px-6' onSubmit={handleSubmit(onSubmit)}>
            <p className='text-grey-800 text-2xl text-center font-medium'>Current password</p>
            <PasswordInput
                control={control}
                name='password'
                placeholder='Type your password...'
                error={errors.password}
                label='Password'
            />
            <div className='flex gap-4 justify-center'>
                <Button
                    type='button'
                    variant='shadow'
                    className='mt-6'
                    onClick={() => cancelClick()}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    type='submit'
                    color='primary'
                    variant='shadow'
                    className={isPending ? 'opacity-70 mt-6 w-full' : 'mt-6 w-full'}
                    isDisabled={isPending}
                >
                    <Image
                        src={'/icons/key.svg'}
                        alt={'key'}
                        width={18}
                        height={18}
                    />
                    <span>Confirm password</span>
                </Button>
            </div>
        </form>
    );
};
