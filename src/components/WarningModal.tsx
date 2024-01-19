"use client";

import React from 'react';

import Image from "next/image";
import { Button } from '@nextui-org/react';
import { ModalWrapper } from './wrappers/ModalWrapper';

interface WarningModalProps {
    title: string;
    description: string;
    confirmClick: () => void;
    cancelClick: () => void;
    isPending?: boolean;
}

export const WarningModal: React.FC<WarningModalProps> = ({ title, description, cancelClick, confirmClick, isPending }) => {
    return (
        <ModalWrapper cancelClick={cancelClick}>
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
        </ModalWrapper>
    );
};
