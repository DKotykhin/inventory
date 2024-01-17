import React from 'react';

import { Control } from "react-hook-form";

import { TextInput, AreaInput, DatePickerInput } from '@/components/inputs/_index';

interface AddOrderProps {
    cancelClick: () => void;
    onSubmit: () => void;
    control: Control<any>;
    errors: any;
}

export const AddOrder: React.FC<AddOrderProps> = ({ cancelClick, control, errors, onSubmit }) => {

    return (
        <div
            className='fixed top-0 left-0 w-screen h-screen bg-grey-900/70 backdrop-blur flex justify-center items-center z-50'
            onClick={cancelClick}
        >
            <div
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md'
                onClick={(e) => e.stopPropagation()}
            >
                <p className='text-grey-800 text-2xl'>Добавить приход</p>
                <form className='flex flex-col gap-1 min-w-[500px]' onSubmit={onSubmit}>
                    <TextInput
                        control={control}
                        name='title'
                        label='Название'
                        placeholder='Введите название...'
                        error={errors.title}
                    />
                    <AreaInput
                        control={control}
                        name='description'
                        label='Описание'
                        placeholder='Введите описание...'
                        error={errors.description}
                    />
                    <DatePickerInput control={control} name='date' placeholder='Дата' />
                    <div className='flex justify-end text-lg gap-6 mt-8'>
                        <button type='button' className='btn-white' onClick={cancelClick}>Отмена</button>
                        <button type='submit' className='btn-green'>Подтвердить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
