"use client";

import React from 'react';

import { useSearchParams } from 'next/navigation';

export const CreateProductForm = () => {

    const searchParams = useSearchParams();
    const search = searchParams.get('orderId');

    return (
        <div>
            <p>Order ID: {search}</p>
        </div>
    );
};
