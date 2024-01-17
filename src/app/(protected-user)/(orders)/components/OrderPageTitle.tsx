"use client";

import React, { useState } from 'react';

import { useSWRConfig } from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mode, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateOrderTypes, createOrderValidationSchema } from '@/validation/orderValidation';
import { AddOrder } from './AddOrder';

interface OrderPageTitleProps {
    totalCount: number;
    currentPage: number;
}

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

export const OrderPageTitle: React.FC<OrderPageTitleProps> = ({ totalCount, currentPage }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate } = useSWRConfig();

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
            mutate(`/api/order/get-all-orders?limit=5&page=${currentPage}`);
        })
            .catch((err) => {
                toast.error(err.response.data.message);
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
            <p>{totalCount}</p>
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
