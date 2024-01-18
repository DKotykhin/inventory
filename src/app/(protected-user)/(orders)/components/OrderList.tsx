import React from 'react';

import { Order, Price, Product } from '@prisma/client';
import { OrderItem } from './OrderItem';

export interface OrderFullProps extends Order {
    items: ExtendedProduct[];
}
interface ExtendedProduct extends Product {
    price: Price[];
}
interface OrderListProps {
    orders: OrderFullProps[];
    currentPage: number;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, currentPage }) => {

    return orders?.length ? (
        <div className='flex flex-col items-center gap-2 mt-8'>
            {orders?.map((order: OrderFullProps) => (
                <div key={order.id} className='w-full'>
                    <OrderItem order={order} currentPage={currentPage} />
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
