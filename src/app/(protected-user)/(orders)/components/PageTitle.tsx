"use client";

import React from 'react';

import { Order } from '@prisma/client';

export const PageTitle: React.FC<{ orders: Order[] }> = ({ orders }) => {

    const createOrderClick = () => {
        console.log('create order');
    };

    return (
        <div className='flex items-center gap-4 font-medium text-3xl text-grey-800'>
            <button
                onClick={createOrderClick}
                className='flex justify-center items-center text-white border-2 border-grey-200 rounded-full bg-green p-3 h-10 text-lg shadow-lg hover:bg-green/80'
            >
                +
            </button>
            <h1>Приходы / </h1>
            <p>{orders.length}</p>
        </div>
    );
};
