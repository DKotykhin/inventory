"use client";

import React, { useState, useTransition } from 'react';
import Image from "next/image";

import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import { useSWRConfig } from 'swr';

import { Product } from '@prisma/client';
import { WarningModal } from '@/components/WarningModal';

interface ProductItemProps {
    product: Product;
    currentPage: number;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, currentPage }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const cookies = Cookies.get('token');
    const { mutate } = useSWRConfig();

    const deleteProductClick = async (id: string) => {
        console.log('delete product: ', id);
        // startTransition(async () => {

        //     // await mutate(`/api/order/get-all-orders?limit=5&page=${currentPage}`,
        //     //     fetchDeleteOrder('/api/order/delete-order', { arg: { token: cookies || '', id } }));

        //     await axios({
        //         method: 'DELETE',
        //         url: '/api/product/delete-product',
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${cookies}`
        //         },
        //         data: id,
        //     }
        //     ).then((res) => {
        //         mutate(`/api/product/get-all-products?limit=5&page=${currentPage}`);
        //         toast.success(res.data.message);
        //         setIsModalOpen(false);
        //     }).catch((err) => {
        //         toast.error(err.response.data.message);
        //     });
        // });
    };

    return (
        <div className=
            'flex justify-between items-center border border-grey-200 py-4 px-6 gap-2 bg-white text-grey-500 rounded'
        >
            <Image
                src={'/icons/bag-check.svg'}
                alt={'list'}
                width={36}
                height={36}                
            />

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
