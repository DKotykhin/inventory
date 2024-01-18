"use client";

import React, { useState } from 'react';

import { Pagination } from "@nextui-org/react";
import useSWR from 'swr';

import { fetcher } from '@/lib/SWRFetcher';
import { Spinner } from '@/components/Spinner';
import { OrderPageTitle } from './OrderPageTitle';
import { OrderList } from './OrderList';

export const Orders = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data } = useSWR(
        `/api/order/get-all-orders?limit=5&page=${currentPage}`,
        fetcher
    );

    return data ? (
        <div className='h-[calc(100vh-64px)] flex flex-col justify-between px-16 py-10'>
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
