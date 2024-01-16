"use client";

import React from 'react';
import Image from "next/image";

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Order, Product } from '@prisma/client';

interface OrderItemProps {
    order: Order & {
        items: Product[];
    }
}

const displayProductName = (value: string) => {
    if (value.endsWith('1')) {
        return 'Продукт';
    }
    if (value.endsWith('2') || value.endsWith('3') || value.endsWith('4')) {
        return 'Продукта';
    }
    else {
        return 'Продуктов';
    }
};

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {

    const openProductClick = (id: string) => {
        console.log('open product: ', id);
    };

    const deleteProductClick = (id: string) => {
        console.log('delete product: ', id);
    };

    return (
        <div className='flex justify-between items-center border border-grey-200 py-4 px-6 gap-2 bg-white text-grey-500 rounded'>
            <p className='w-[500px]'>{order.title}</p>
            <Image
                src={'/icons/list.svg'}
                alt={'list'}
                width={36}
                height={36}
                className='cursor-pointer border border-grey-200 rounded-full p-1 hover:border-grey-400'
                onClick={() => openProductClick(order.id)}
            />
            <div className='w-[90px]'>
                <p>{order.items.length}</p>
                <p>{displayProductName(order.items.length.toString())}</p>
            </div>
            <p>{format(order.date, 'dd / MMM / yyyy', { locale: ru })}</p>
            <Image
                src={'/icons/delete.svg'}
                alt={'delete'}
                width={16}
                height={16}
                className='cursor-pointer'
                onClick={() => deleteProductClick(order.id)}
            />
        </div>
    );
};
