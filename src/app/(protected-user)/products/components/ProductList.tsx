import { Product } from '@prisma/client';
import React from 'react';

interface ProductListProps {
    products: Product[];
    currentPage: number;
}

export const ProductList: React.FC<ProductListProps> = ({ products, currentPage }) => {

    console.log('products: ', products);

    return products?.length ? (
        <div>ProductList</div>
    ) : (
        <div className='flex flex-col items-center gap-4 mt-10 text-grey-800 text-xl'>
            <p className='text-4xl'>🥹</p>
            <p>У вас нет ещё продуктов</p>
        </div>
    );
};
