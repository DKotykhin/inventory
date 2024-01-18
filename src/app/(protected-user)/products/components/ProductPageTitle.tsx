import React from 'react';
import { SelectType } from './SelectType';

interface ProductPageTitleProps {
    totalCount: number;
    productTypeList: { type: string; }[];
    productTypeOnChange: (value: string) => void;
    productType: string;
}

export const ProductPageTitle: React.FC<ProductPageTitleProps> = ({ totalCount, productTypeList, productTypeOnChange, productType }) => {

    return (
        <div className='flex justify-between items-center gap-4 font-medium text-3xl text-grey-800'>
            <div className='flex items-center gap-4'>
                <h1>Продукты / </h1>
                <p>{totalCount}</p>
            </div>
            <SelectType
                productTypeList={productTypeList?.map((item) => item.type)}
                productTypeOnChange={productTypeOnChange}
                productType={productType}
            />
        </div>
    );
};
