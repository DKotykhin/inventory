"use client";

import React, { useState, useTransition } from 'react';
import Image from "next/image";

import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Cookies from 'js-cookie';
import { useSWRConfig } from 'swr';

import { Order, Product } from '@prisma/client';
import { WarningModal } from '@/components/WarningModal';

interface OrderItemProps {
    order: Order & {
        items: Product[];
    };
    currentPage: number;
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

export const OrderItem: React.FC<OrderItemProps> = ({ order, currentPage }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const cookies = Cookies.get('token');
    const { mutate } = useSWRConfig();

    const openProductClick = (id: string) => {
        console.log('open product: ', id);
    };

    const deleteOrderClick = async (id: string) => {
        // console.log('delete product: ', id);
        // setIsModalOpen(false);
        startTransition(async () => {

            // await mutate(`/api/order/get-all-orders?limit=5&page=${currentPage}`,
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
                mutate(`/api/order/get-all-orders?limit=5&page=${currentPage}`);
                toast.success(res.data.message);
                setIsModalOpen(false);
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        });
    };

    // const summarize = () => {
    //     const sum = order.items.map(item => item.reduce((acc, item) => acc + item.price, 0));
    // };

    return (
        <div className=
            'flex justify-between items-center border border-grey-200 py-4 px-6 gap-2 bg-white text-grey-500 rounded'
        >
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
                onClick={() => setIsModalOpen(true)}
            />
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
