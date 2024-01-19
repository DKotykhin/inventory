"use client";

import React, { useState } from 'react';

import { Order, Price, Product } from '@prisma/client';
import { cn } from '@/utils/cn';

import { OrderItem } from './OrderItem';
import { SideProductList } from './SideProductList';

export interface OrderFullProps extends Order {
    items: ExtendedProduct[];
}
export interface ExtendedProduct extends Product {
    price: Price[];
}
interface OrderListProps {
    orders: OrderFullProps[];
    currentPage: number;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, currentPage }) => {

    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [orderContent, setOrderContent] = useState({} as OrderFullProps);

    const openOrderClick = (order: OrderFullProps) => {
        setIsOrderOpen(true);
        setOrderContent(order);
    };

    return orders?.length ? (
        <div className='flex gap-4'>
            <div className={cn(
                'flex flex-col items-center gap-2 mt-8',
                isOrderOpen ? 'w-[500px]' : 'w-full'
            )}>
                {orders?.map((order: OrderFullProps) => (
                    <div key={order.id} className='w-full'>
                        <OrderItem
                            order={order}
                            currentPage={currentPage}
                            openOrderClick={openOrderClick}
                            isOrderOpen={isOrderOpen}
                            showSideButton={order.id === orderContent?.id}
                        />
                    </div>
                ))}
            </div>
            {isOrderOpen &&
                <SideProductList
                    orderContent={orderContent}
                    productCloseClick={() => setIsOrderOpen(false)}
                />
            }
        </div>
    ) : (
        <div className='flex flex-col items-center gap-4 mt-10 text-grey-800 text-xl'>
            <p className='text-4xl'>🥹</p>
            <p>У вас нет ещё приходов</p>
        </div>
    );
};
