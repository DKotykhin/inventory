import React from 'react';
import { Metadata } from 'next';

import { Products } from './components/Products';
import { productsPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = productsPageMetaData;

const ProductsPage = async () => {

    return <Products />;
};

export default ProductsPage;