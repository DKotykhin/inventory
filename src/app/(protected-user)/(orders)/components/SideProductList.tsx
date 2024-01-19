"use client";

import React, { useState, useTransition } from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useSWRConfig } from 'swr';

import { CurrencyTypes } from '@prisma/client';
import { cn } from '@/utils/cn';
import { WarningModal } from '@/components/WarningModal';

import { ExtendedProduct, OrderFullProps } from './OrderList';

interface SideProductListProps {
    orderContent: OrderFullProps;
    productCloseClick: () => void;
    currentPage: number;
}

export const SideProductList: React.FC<SideProductListProps> = ({ orderContent, productCloseClick, currentPage }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const cookies = Cookies.get('token');
    const { mutate } = useSWRConfig();
    const router = useRouter();

    const deleteProductClick = async (id: string) => {
        // console.log('delete product id: ', id);
        startTransition(async () => {
            await axios({
                method: 'DELETE',
                url: '/api/product/delete-product',
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
                productCloseClick();
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        });
    };

    return (
        <div className='flex flex-col w-full border border-grey-200 py-4 px-6 gap-2 bg-white text-grey-500 rounded mt-8 relative'>
            <p className='text-grey-800 text-xl mb-4'>{orderContent?.title}</p>
            <div className='flex items-center gap-4 mb-4'>
                <button
                    onClick={() => router.push(`/create-product?orderId=${orderContent?.id}`)}
                    className='flex justify-center items-center text-white rounded-full bg-green w-6 h-6 text-lg shadow-lg hover:bg-green/80 transition duration-300 leading-snug'
                >
                    +
                </button>
                <p className='text-green text-sm'>Добавить продукт</p>
            </div>
            <div className='flex flex-col gap-2 overflow-y-auto max-h-[200px]'>
                {orderContent?.items.length ?
                    orderContent?.items.map((product: ExtendedProduct) => (
                        <div key={product.id}>
                            <div className='flex justify-between items-center border border-grey-200 py-4 px-6 gap-4 bg-white text-grey-500 rounded'>
                                <div className={cn(
                                    'w-2 h-2 rounded-full bg-green',
                                    product?.isNew ? 'bg-green' : 'bg-grey-800'
                                )} />
                                <p className='text-grey-800 w-[240px]'>{product.type}</p>
                                <Image
                                    src={product?.photo ? product.photo : '/icons/bag-check.svg'}
                                    alt={'list'}
                                    width={36}
                                    height={36}
                                />
                                <div className='flex flex-col w-[200px]'>
                                    <span className='text-grey-800'>{product?.title}</span>
                                    <span className='text-xs'>SN {product?.serialNumber}</span>
                                </div>
                                <p className={cn('w-[48px]', product.isNew ? 'text-green' : '')}>{product?.isNew ? 'Новый' : 'Б/У'}</p>
                                <div className='flex flex-col-reverse w-[90px]'>
                                    {product?.price?.map((item, index) => (
                                        <span key={index} className={item.symbol === CurrencyTypes.USD ? 'text-xs' : 'text-grey-800'}>
                                            {item.value} {item.symbol === CurrencyTypes.USD ? '$' : 'Uah'}
                                        </span>
                                    ))}
                                </div>
                                <Image
                                    src={'/icons/delete.svg'}
                                    alt={'delete'}
                                    width={16}
                                    height={16}
                                    className='cursor-pointer'
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                            {isModalOpen &&
                                <WarningModal
                                    title={'Удалить продукт?'}
                                    description={'Продукт будет удален безвозвратно'}
                                    cancelClick={() => setIsModalOpen(false)}
                                    confirmClick={() => deleteProductClick(product.id)}
                                    isPending={isPending}
                                />
                            }
                        </div>
                    ))
                    :
                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-4xl'>🥹</p>
                        <p className='text-grey-800'>Нет продуктов</p>
                    </div>
                }
            </div>
            <button
                className='absolute -top-5 -right-5 w-10 h-10 rounded-full shadow-sm border border-grey-200 bg-white flex justify-center items-center cursor-pointer hover:bg-grey-50 transition duration-300'
                onClick={productCloseClick}
            >
                x
            </button>
        </div>
    );
};
