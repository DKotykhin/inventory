import React from 'react';

interface ProductPageTitleProps {
    totalCount: number;
    currentPage: number;
}

export const ProductPageTitle: React.FC<ProductPageTitleProps> = ({ totalCount, currentPage }) => {
    return (
        <div className='flex items-center gap-4 font-medium text-3xl text-grey-800'>
            <h1>Продукты / </h1>
            <p>{totalCount}</p>
        </div>
    );
};
