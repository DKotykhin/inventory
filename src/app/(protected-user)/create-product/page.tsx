import React from 'react';

import Link from 'next/link';
import { Metadata } from 'next';

import { createProductPageMetaData } from '@/metadata/metadata';
import { CreateProductForm } from './components/CreateProductForm';

export const metadata: Metadata = createProductPageMetaData;

const CreateProductPage = () => {

    return (
        <div className='flex flex-col items-center gap-4 mt-10'>
            <h1 className='text-xl text-grey-800'>Create Product Page</h1>
            <CreateProductForm />
            <Link href={'/'} className='text-xl text-green uppercase hover:underline'>
                Return to orders
            </Link>
        </div>
    );
};

export default CreateProductPage;