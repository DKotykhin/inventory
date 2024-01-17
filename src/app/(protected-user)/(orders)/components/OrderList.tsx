import React from 'react';

import { Order, Product } from '@prisma/client';
import { OrderItem } from './OrderItem';

interface OrderListProps {
    orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    return (
        <div className='flex flex-col items-center gap-2 mt-8'>
            {orders.map((order) => (
                <div key={order.id} className='w-full'>
                    <OrderItem order={{ ...order, items: [] }} />
                </div>
            ))}
        </div>
    );
};
