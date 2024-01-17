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
        <main className='px-16 py-10'>
            <OrderPageTitle totalCount={data.totalCount} currentPage={currentPage} />
            <OrderList orders={data.orders} currentPage={currentPage} />
            <div className=' fixed bottom-8 left-1/2'>
                <Pagination
                    total={data.totalPages}
                    initialPage={1}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showControls
                    showShadow
                />
            </div>
        </main>
    ) : <Spinner />;
};
