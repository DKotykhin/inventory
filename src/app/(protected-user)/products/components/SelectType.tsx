import React, { useState } from 'react';

import { Select, SelectItem } from "@nextui-org/react";

interface SelectTypeProps {
    productTypeList: string[];
    productTypeOnChange: (value: string) => void;
    productType: string;
}

export const SelectType: React.FC<SelectTypeProps> = ({ productTypeList, productTypeOnChange, productType}) => {

    // const [value, setValue] = useState('All');

    const handleSelectionChange = (e: any) => {
        // setValue(e.target.value);
        productTypeOnChange(e.target.value);
    };

    return productTypeList ? (
        <div className='flex items-center gap-2 w-[300px]'>
            <p className='text-sm text-grey-500'>Тип</p>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Select
                    label="Select product type"
                    className="max-w-xs shadow-lg"
                    onChange={handleSelectionChange}
                    selectedKeys={[productType]}
                    variant='faded'
                >
                    {['All', ...productTypeList].map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    ) : null;
};
