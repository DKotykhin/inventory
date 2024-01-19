"use client";

import React, { useState, useTransition } from 'react';
import Image from "next/image";

import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Cookies from 'js-cookie';
import { useSWRConfig } from 'swr';

import { WarningModal } from '@/components/WarningModal';
import { OrderFullProps } from './OrderList';
import { CurrencyTypes } from '@prisma/client';
import { cn } from '@/utils/cn';

interface OrderItemProps {
    order: OrderFullProps;
    currentPage: number;
    openOrderClick: (order: OrderFullProps) => void;
    isOrderOpen: boolean;    
    showSideButton: boolean;
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

// async function fetchDeleteOrder(url: string, { arg }: { arg: { token: string, id: string } }) {
//     await fetch(url, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${arg.token}`
//         },
//         body: JSON.stringify(arg.id)
//     });
// }

export const OrderItem: React.FC<OrderItemProps> = ({ order, currentPage, openOrderClick, isOrderOpen, showSideButton }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const cookies = Cookies.get('token');
    const { mutate } = useSWRConfig();

    const deleteOrderClick = async (id: string) => {
        // console.log('delete product: ', id);
        startTransition(async () => {

            // await mutate(`/api/order/get-all-orders?limit=4&page=${currentPage}`,
            //     fetchDeleteOrder('/api/order/delete-order', { arg: { token: cookies || '', id } }));

            await axios({
                method: 'DELETE',
                url: '/api/order/delete-order',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies}`
                },
                data: id,
            }
            ).then((res) => {
                mutate(`/api/order/get-all-orders?limit=4&page=${currentPage}`);
                toast.success(res.data.message);
                setIsModalOpen(false);
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        });
    };

    const sumUSD = order?.items
        .map(item => item.price)
        .flat()
        .filter(item => item.symbol === CurrencyTypes.USD)
        .reduce((acc, item) => acc + item.value, 0);
    const sumUAH = order?.items
        .map(item => item.price)
        .flat()
        .filter(item => item.symbol === CurrencyTypes.UAH)
        .reduce((acc, item) => acc + item.value, 0);

    return (
        <div className={cn(
            'flex justify-between items-center border border-grey-200 py-4 gap-4 bg-white text-grey-500 rounded relative',
            isOrderOpen ? 'pl-6 pr-10' : 'px-6'
        )}>
            {!isOrderOpen &&
                <div className='flex'>
                    <p className='w-[250px]'>{order?.title}</p>
                    <p className='w-[250px]'>{order?.description}</p>
                </div>
            }
            <Image
                src={'/icons/list.svg'}
                alt={'list'}
                width={36}
                height={36}
                className='cursor-pointer border border-grey-200 rounded-full p-1 hover:border-grey-400'
                onClick={() => openOrderClick(order)}
            />
            <div className='w-[90px]'>
                <p className='text-grey-800'>{order?.items.length}</p>
                <p>{displayProductName(order.items.length.toString())}</p>
            </div>
            <p>{order?.date ? format(order.date, 'dd / MMM / yyyy', { locale: ru }) : '-'}</p>
            {!isOrderOpen &&
                <>
                    <div className='flex flex-col text-right w-[90px]'>
                        <p className='text-grey-800'>{sumUAH ? sumUAH.toFixed(2) + ' ₴' : '-'}</p>
                        <p className='text-sm'>{sumUSD ? sumUSD.toFixed(2) + ' $' : '-'}</p>
                    </div>
                    <Image
                        src={'/icons/delete.svg'}
                        alt={'delete'}
                        width={16}
                        height={16}
                        className='cursor-pointer'
                        onClick={() => setIsModalOpen(true)}
                    />
                </>
            }
            {isOrderOpen && showSideButton &&
                <div className='bg-grey-300 h-full w-[30px] absolute top-0 right-0 flex justify-center items-center'>
                    <Image
                        src={'/icons/right-next.svg'}
                        alt={'next'}
                        width={22}
                        height={22}
                    />
                </div>
            }
            {isModalOpen &&
                <WarningModal
                    title={'Удалить приход?'}
                    description={'Приход будет удален безвозвратно'}
                    cancelClick={() => setIsModalOpen(false)}
                    confirmClick={() => deleteOrderClick(order.id)}
                    isPending={isPending}
                />
            }
        </div>
    );
};
