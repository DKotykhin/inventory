import React from 'react';
import { Metadata } from 'next';

import { createProductPageMetaData } from '@/metadata/metadata';
import { CreateProductForm } from './components/CreateProductForm';

export const metadata: Metadata = createProductPageMetaData;

const CreateProductPage = () => {

    return (
        <div className='flex flex-col items-center gap-4 my-6 overflow-y-auto'>
            <CreateProductForm />
        </div>
    );
};

export default CreateProductPage;