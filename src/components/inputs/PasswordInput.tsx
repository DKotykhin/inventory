import React, { ReactNode, useState } from "react";

import Image from "next/image";
import { Control, Controller, FieldError } from "react-hook-form";

import { cn } from '@/utils/cn';

interface IPasswordInput {
    name: string;
    control: Control<any>;
    label?: string | ReactNode;
    placeholder?: string;
    error?: FieldError;
}

export const PasswordInput: React.FC<IPasswordInput> = ({ name, control, label, placeholder, error }) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword(!showPassword);

    return (
        <div className='w-full relative'>
            <label className='text-[14px] text-grey-500'>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={placeholder}
                        className={cn(
                            "w-full h-12 text-[14px] text-black px-3 py-2 rounded-md border",
                            error ? "border-red" : "border-grey-100"
                        )}
                    />
                )}
            />
            <p className='text-[14px] text-red'>{error?.message}</p>
            <Image
                src={showPassword ? '/icons/eye-slash.svg' : '/icons/eye.svg'}
                alt={'eye'}
                width={18}
                height={18}
                className='absolute top-10 right-3 cursor-pointer'
                onClick={handleClick}
            />

        </div>
    );
};