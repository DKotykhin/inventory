"use client";

import React, { useState, useTransition } from 'react';
import Image from "next/image";

import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Cookies from 'js-cookie';
import { useSWRConfig } from 'swr';

import { CurrencyTypes } from '@prisma/client';
import { cn } from '@/utils/cn';
import { WarningModal } from '@/components/WarningModal';
import { ProductFullProps } from './ProductList';

interface ProductItemProps {
    product: ProductFullProps;
    currentPage: number;
    productType: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, currentPage, productType }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const cookies = Cookies.get('token');
    const { mutate } = useSWRConfig();

    const deleteProductClick = async (id: string) => {
        // console.log('delete product: ', id);
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
                mutate(`/api/product/get-all-products?limit=5&page=${currentPage}&type=${productType}`);
                toast.success(res.data.message);
                setIsModalOpen(false);
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        });
    };

    return (
        <div className=
            'flex justify-between items-center border border-grey-200 py-4 px-6 gap-1 bg-white text-grey-500 text-sm rounded'
        >
            <div className={cn(
                'w-2 h-2 rounded-full bg-green',
                product?.isNew ? 'bg-green' : 'bg-grey-800'
            )} />
            <p className='text-grey-800 w-[80px]'>{product.type}</p>
            <Image
                src={product?.photo ? product.photo : '/icons/bag-check.svg'}
                alt={'list'}
                width={36}
                height={36}
            />
            <div className='flex flex-col w-[180px]'>
                <span className='text-grey-800'>{product?.title}</span>
                <span className='text-xs'>SN {product?.serialNumber}</span>
            </div>
            <p className='w-[48px]'>{product?.isNew ? 'Новый' : 'Б/У'}</p>
            <div className='flex flex-col-reverse w-[72px]'>
                {product?.price?.map((item, index) => (
                    <span key={index} className={item.symbol === CurrencyTypes.USD ? 'text-xs' : 'text-grey-800'}>
                        {item.value} {item.symbol === CurrencyTypes.USD ? '$' : 'Uah'}
                    </span>
                ))}
            </div>
            <div className='flex flex-col w-[190px]'>
                <p className='text-grey-800'>Guarantee</p>
                <div>
                    <span>{format(product?.guarantee?.start || new Date(), 'dd MMM yyyy', { locale: ru })}</span>
                    <span className='text-xs'> - </span>
                    <span>{format(product?.guarantee?.end || new Date(), 'dd MMM yyyy', { locale: ru })}</span>
                </div>
            </div>
            <p className='w-[130px]'>{product?.specification}</p>
            <p className='w-[24px]'>{product?.order}</p>
            <p>{format(product?.date, 'dd / MMM / yyyy', { locale: ru })}</p>
            <div className='flex flex-col w-[180px]'>
                <span className='text-grey-800'>{product?.orders?.title}</span>
                <span className='text-xs'>{format(product?.orders?.date, 'dd / MMM / yyyy', { locale: ru })}</span>
            </div>
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
                    title={'Удалить продукт?'}
                    description={'Продукт будет удален безвозвратно'}
                    cancelClick={() => setIsModalOpen(false)}
                    confirmClick={() => deleteProductClick(product.id)}
                    isPending={isPending}
                />
            }
        </div>
    );
};
