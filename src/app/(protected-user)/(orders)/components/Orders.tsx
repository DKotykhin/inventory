"use client";

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from "@nextui-org/react";
import useSWR from 'swr';

import { fetcher } from '@/lib/SWRFetcher';
import { Spinner } from '@/components/Spinner';

import { OrderPageTitle } from './OrderPageTitle';
import { OrderList } from './OrderList';

export const Orders = () => {

    const searchParams = useSearchParams();
    const search = searchParams.get('page');
    const [currentPage, setCurrentPage] = useState(search ? Number(search) : 1);

    const { data } = useSWR(
        `/api/order/get-all-orders?limit=4&page=${currentPage}`,
        fetcher,
    );

    const router = useRouter();
    useEffect(() => {
        router.replace(`/?page=${currentPage}`);
    }, [currentPage, router]);

    return data ? (
        <div className='h-[calc(100vh-64px)] flex flex-col justify-between px-16 py-10 overflow-y-scroll'>
            <div className='grow'>
                <OrderPageTitle totalCount={data.totalCount} currentPage={currentPage} />
                <OrderList orders={data.orders} currentPage={currentPage} />
            </div>
            <div className='flex justify-center mt-10'>
                <Pagination
                    total={data.totalPages}
                    initialPage={1}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showControls={Boolean(data.totalPages > 1)}
                    showShadow
                />
            </div>
        </div>
    ) : <Spinner />;
};
