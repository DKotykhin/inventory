import React from 'react';

import { Order } from '@prisma/client';
import { OrderItem } from './OrderItem';

export const OrderList: React.FC<{ orders: Order[], currentPage: number }> = ({ orders, currentPage }) => {

    return orders?.length ? (
        <div className='flex flex-col items-center gap-2 mt-8'>
            {orders?.map((order: Order) => (
                <div key={order.id} className='w-full'>
                    <OrderItem order={{ ...order, items: [] }} currentPage={currentPage} />
                </div>
            ))}
        </div>
    ) : (
        <div className='flex flex-col items-center gap-4 mt-10 text-grey-800 text-xl'>
            <p className='text-4xl'>🥹</p>
            <p>У вас нет ещё приходов</p>
        </div>
    );
};
