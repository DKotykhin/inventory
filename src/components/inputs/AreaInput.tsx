import React, { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

import { cn } from '@/utils/cn';

interface IAreaInput {
    name: string;
    control: Control<any>;
    label?: string | ReactNode;
    placeholder?: string;
    error?: FieldError;
}

export const AreaInput: React.FC<IAreaInput> = ({
    name,
    control,
    label,
    placeholder,
    error
}) => {
    return (
        <div className='w-full'>
            <label className='text-[14px] text-grey-500'>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <textarea
                        {...field}
                        placeholder={placeholder}
                        className={cn(
                            "w-full h-18 text-[14px] text-black px-3 py-2 rounded-md border resize-none",
                            error ? "border-red" : "border-grey-100"
                        )}
                    />
                )}
            />
            <p className='text-[14px] text-red'>{error?.message}</p>
        </div>
    );
};
