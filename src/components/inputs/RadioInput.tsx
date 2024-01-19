import React from 'react';

import { Control, Controller } from "react-hook-form";
import { RadioGroup, Radio } from "@nextui-org/react";

import { CurrencyTypes } from '@prisma/client';

interface IRadioInput {
    name: string;
    control: Control<any>;
}

export const RadioInput: React.FC<IRadioInput> = ({ name, control }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <RadioGroup
                    label="Select default currency"
                    orientation="horizontal"
                    className='text-[14px] text-grey-500'
                    {...field}
                >
                    <Radio value={CurrencyTypes.USD}>
                        <p className='text-[14px] text-grey-500'>USD</p>
                    </Radio>
                    <Radio value={CurrencyTypes.UAH}>
                        <p className='text-[14px] text-grey-500'>UAH</p>
                    </Radio>
                </RadioGroup>
            )}
        />
    );
};
