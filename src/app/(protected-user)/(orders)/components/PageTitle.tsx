"use client";

import React, { useState, useTransition } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

import { Mode, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { Order } from '@prisma/client';
import { CreateOrderTypes, createOrderValidationSchema } from '@/validation/orderValidation';
import { AddOrder } from './AddOrder';
import { useRouter } from 'next/navigation';

interface CreateOrderFormValidationTypes {
    defaultValues: CreateOrderTypes;
    resolver: Resolver<any>;
    mode: Mode;
}

const CreateOrderFormValidation: CreateOrderFormValidationTypes = {
    defaultValues: {
        title: '',
        description: '',
        date: new Date(),
    },
    resolver: zodResolver(createOrderValidationSchema),
    mode: 'onChange',
};

export const PageTitle: React.FC<{ orders: Order[] }> = ({ orders }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateOrderTypes>(CreateOrderFormValidation);

    const onSubmit: SubmitHandler<CreateOrderTypes> = async (formData) => {
        // console.log('data: ', formData);
        setIsModalOpen(false);
        reset();
        startTransition(async () => {
            await axios({
                method: 'POST',
                url: '/api/order/create-order',
                headers: {
                    "Content-Type": "application/json",
                },
                data: formData,
            }
            ).then((res) => {
                toast.success(res.data.message);
                router.refresh();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
        });
    };

    return (
        <div className='flex items-center gap-4 font-medium text-3xl text-grey-800'>
            <button
                onClick={() => setIsModalOpen(true)}
                className='flex justify-center items-center text-white border-2 border-grey-200 rounded-full bg-green p-3 h-10 text-lg shadow-lg hover:bg-green/80'
            >
                +
            </button>
            <h1>Приходы / </h1>
            <p>{orders.length}</p>
            {isModalOpen &&
                <AddOrder
                    cancelClick={() => {
                        setIsModalOpen(false);
                        reset();
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                    control={control}
                    errors={errors}
                />
            }
        </div>
    );
};
