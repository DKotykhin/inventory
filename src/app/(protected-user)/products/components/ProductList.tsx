import React from 'react';

import { Guarantee, Order, Price, Product } from '@prisma/client';
import { ProductItem } from './ProductItem';

export interface ProductFullProps extends Product {
    orders: Order,
    price: Price[],
    guarantee: Guarantee,
}
interface ProductListProps {
    products: ProductFullProps[];
    currentPage: number;
}

export const ProductList: React.FC<ProductListProps> = ({ products, currentPage }) => {

    // console.log('products: ', products);

    return products?.length ? (
        <div className='flex flex-col items-center gap-2 mt-8'>
            {products?.map((product: ProductFullProps) => (
                <div key={product.id} className='w-full'>
                    <ProductItem product={product} currentPage={currentPage} />
                </div>
            ))}
        </div>
    ) : (
        <div className='flex flex-col items-center gap-4 mt-10 text-grey-800 text-xl'>
            <p className='text-4xl'>🥹</p>
            <p>У вас нет ещё продуктов</p>
        </div>
    );
};
