import React from 'react';

import { Control } from "react-hook-form";

import { TextInput, AreaInput, DatePickerInput } from '@/components/inputs/_index';
import { Button, Modal } from '@nextui-org/react';
import { ModalWrapper } from '@/components/wrappers/ModalWrapper';

interface AddOrderProps {
    cancelClick: () => void;
    onSubmit: () => void;
    control: Control<any>;
    errors: any;
}

export const AddOrder: React.FC<AddOrderProps> = ({ cancelClick, control, errors, onSubmit }) => {

    return (
        <ModalWrapper cancelClick={cancelClick}>
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
                    <Button type='button' variant='bordered' onClick={cancelClick}>Отмена</Button>
                    <Button type='submit' variant='shadow' color='primary'>Подтвердить</Button>
                </div>
            </form>
        </ModalWrapper>
    );
};
