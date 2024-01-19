"use client";

import React from 'react';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CreateProductPage = () => {

    const searchParams = useSearchParams();

    const search = searchParams.get('orderId');

    return (
        <div className='flex flex-col items-center gap-4 mt-10'>
            <h1 className='text-xl text-grey-800'>Create Product Page</h1>
            <p>Order ID: {search}</p>
            <Link href={'/'} className='text-xl text-green uppercase hover:underline'>
                Return to orders
            </Link>
        </div>
    );
};

export default CreateProductPage;