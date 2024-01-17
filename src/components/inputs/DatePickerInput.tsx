import React from 'react';

import DatePicker from 'react-datepicker';
import { Controller, Control } from "react-hook-form";

interface DatePickerProps {
    control: Control<any>;
    placeholder: string;
    name: string;
}

export const DatePickerInput: React.FC<DatePickerProps> = ({control, placeholder, name}) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        selected={field.value}
                        placeholderText={placeholder}
                        onChange={(date) => field.onChange(date)}
                        className='w-full h-10 text-[14px] text-black px-3 py-2 rounded-md border border-grey-100'
                    />
                )}
            />
        </div>
    );
};
