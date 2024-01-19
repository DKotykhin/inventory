import { Checkbox } from '@nextui-org/react';
import React from 'react';

import { Control, Controller } from "react-hook-form";

interface ICheckBoxInput {
    name: string;
    control: Control<any>;
    label: string;
}

export const CheckBoxInput: React.FC<ICheckBoxInput> = ({ control, name, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Checkbox {...field} defaultSelected>
                    <p className='text-[14px] text-grey-500'>{label}</p>
                </Checkbox>
            )}
        />
    );
};
