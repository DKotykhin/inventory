"use client";

import React from 'react';

import Image from "next/image";
import { Button } from '@nextui-org/react';

interface WarningModalProps {
    title: string;
    description: string;
    confirmClick: () => void;
    cancelClick: () => void;
    isPending?: boolean;
}

export const WarningModal: React.FC<WarningModalProps> = ({ title, description, cancelClick, confirmClick, isPending }) => {
    return (
        <div
            className='fixed top-0 left-0 w-screen h-screen bg-grey-900/70 backdrop-blur flex justify-center items-center z-50'
            onClick={cancelClick}
        >
            <div
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md'
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={'/icons/warning-circle.svg'}
                    alt={'warning'}
                    width={100}
                    height={100}
                />
                <p className='text-grey-800 text-2xl'>{title}</p>
                <p className='text-grey-400 text-sm'>{description}</p>
                <div className='border-t border-grey-200 w-full' />
                <div className='flex text-lg gap-6'>
                    <Button disabled={isPending} variant='bordered' onClick={cancelClick}>Отмена</Button>
                    <Button disabled={isPending} variant='shadow' color='primary' onClick={confirmClick}>Подтвердить</Button>
                </div>
            </div>
        </div>
    );
};
