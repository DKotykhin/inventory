"use client";

import React, { useState } from 'react';

import { Pagination } from "@nextui-org/react";
import useSWR from 'swr';

import { fetcher } from '@/lib/SWRFetcher';
import { Spinner } from '@/components/Spinner';
import { ProductPageTitle } from './ProductPageTitle';
import { ProductList } from './ProductList';

export const Products = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [productType, setProductType] = useState('All');

    const { data } = useSWR(
        `/api/product/get-all-products?limit=4&page=${currentPage}&type=${productType}`,
        fetcher
    );

    return data ? (
        <div className='h-[calc(100vh-64px)] flex flex-col px-16 py-10'>
            <div className='grow'>
                <ProductPageTitle
                    totalCount={data.totalCount}
                    productType={productType}
                    productTypeList={data.productTypeList}
                    productTypeOnChange={(value: string) => setProductType(value)}
                />
                <ProductList
                    products={data.products}
                    currentPage={currentPage}
                    productType={productType}
                />
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
