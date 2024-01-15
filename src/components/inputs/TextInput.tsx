import React, { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

import { cn } from '@/utils/cn';

interface ITextInput {
    name: string;
    control: Control<any>;
    label?: string | ReactNode;
    placeholder?: string;
    defaultValue?: string;
    error?: FieldError;
}

export const TextInput: React.FC<ITextInput> = ({
    name,
    control,
    label,
    placeholder,
    error,
    defaultValue = "",
}) => {
    return (
        <div className='w-full'>
            <label className='text-[14px] text-grey-500'>{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder={placeholder}
                        className={cn(
                            "w-full h-12 text-[14px] text-black px-3 py-2 rounded-md border",
                            error ? "border-red" : "border-grey-100"
                        )}
                    />
                )}
            />
            <p className='text-[14px] text-red'>{error?.message}</p>
        </div>
    );
};

