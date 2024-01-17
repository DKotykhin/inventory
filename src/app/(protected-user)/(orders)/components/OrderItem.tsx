"use client";

import React, { useState, useTransition } from 'react';
import Image from "next/image";

import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Cookies from 'js-cookie';

import { Order, Product } from '@prisma/client';
import { WarningModal } from '@/components/WarningModal';
import { useRouter } from 'next/navigation';

interface OrderItemProps {
    order: Order & {
        items: Product[];
        };
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const cookies = Cookies.get('token');

    const openProductClick = (id: string) => {
        console.log('open product: ', id);
    };

    const deleteProductClick = async (id: string) => {
        // console.log('delete product: ', id);
        setIsModalOpen(false);
        startTransition(async () => {
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
                toast.success(res.data.message);
                router.refresh();
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        });
    };

    // const summarize = () => {
    //     const sum = order.items.map(item => item.reduce((acc, item) => acc + item.price, 0));
    // };

    return (
        <div className={isPending ? 'fixed top-0 left-0 w-screen h-screen bg-grey-100/20' : ''}>
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
                    onClick={() => setIsModalOpen(true)}
                />
                {isModalOpen &&
                    <WarningModal
                        title={'Удалить приход?'}
                        description={'Приход будет удален безвозвратно'}
                        cancelClick={() => setIsModalOpen(false)}
                        confirmClick={() => deleteProductClick(order.id)}
                    />
                }
            </div>
        </div>
    );
};
