"use client";

import React, { useTransition } from 'react';

import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';

import { Mode, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';

import { CreateProductTypes, createProductValidationSchema } from '@/validation/productValidation';
import { CurrencyTypes } from '@prisma/client';
import { CheckBoxInput, DatePickerInput, TextInput } from '@/components/inputs/_index';
import { RadioInput } from '@/components/inputs/RadioInput';

interface CreateProductFormValidationTypes {
    defaultValues: CreateProductTypes;
    resolver: Resolver<any>;
    mode: Mode;
}

const CreateProductFormValidation: CreateProductFormValidationTypes = {
    defaultValues: {
        title: '',
        serialNumber: '',
        isNew: true,
        type: '',
        specification: '',
        order: '',
        photo: '',
        date: new Date(),
        value_1: '',
        value_2: '',
        isDefault: CurrencyTypes.USD,
        start: null,
        end: null,
    },
    resolver: zodResolver(createProductValidationSchema),
    mode: 'onChange',
};

export const CreateProductForm = () => {

    const searchParams = useSearchParams();
    const search = searchParams.get('orderId');

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateProductTypes>(CreateProductFormValidation);

    const onSubmit: SubmitHandler<CreateProductTypes> = async (formData) => {
        // console.log('data: ', formData);
        const { title, serialNumber, isNew, type, specification, date, start, end, isDefault, value_1, value_2 } = formData;
        const productObject = {
            orderId: search,
            productData: {
                title,
                serialNumber,
                isNew,
                type,
                specification,
                date,
            },
            guaranteeData: {
                start,
                end,
            },
            priceData: [
                {
                    value: +value_1,
                    symbol: CurrencyTypes.USD,
                    isDefault: isDefault === CurrencyTypes.USD,
                },
                {
                    value: +value_2,
                    symbol: CurrencyTypes.UAH,
                    isDefault: isDefault === CurrencyTypes.UAH,
                },
            ],
        };
        // console.log('data: ', productObject);
        startTransition(async () => {
            await axios({
                method: 'POST',
                url: '/api/product/create-product',
                headers: {
                    "Content-Type": "application/json",
                },
                data: productObject,
            })
                .then((res) => {
                    reset();
                    toast.success(res.data.message);
                    router.push(`/`);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        });
    };

    return (
        <section className="flex justify-center w-full">
            <div className="flex justify-center max-w-[1440px] w-full mt-2">
                <div className='flex flex-col items-center gap-5 max-w-[800px] p-4 m-4 w-full border rounded-2xl border-grey-50 shadow-lg bg-white'>
                    <h1 className='text-2xl font-semibold text-center'>Create Product</h1>
                    <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                            control={control}
                            name='title'
                            placeholder='Type title...'
                            error={errors.title}
                            label='Title'
                        />
                        <TextInput
                            control={control}
                            name='specification'
                            placeholder='Type specification...'
                            error={errors.specification}
                            label='Specification'
                        />
                        <div className='flex gap-4'>
                            <TextInput
                                control={control}
                                name='type'
                                placeholder='Product type...'
                                error={errors.type}
                                label='Type'
                            />
                            <TextInput
                                control={control}
                                name='serialNumber'
                                placeholder='Type serial number...'
                                error={errors.serialNumber}
                                label='Serial Number'
                            />
                        </div>
                        <div className='flex justify-between items-center gap-2'>
                            <RadioInput control={control} name='isDefault' />
                            <div className='flex gap-4 max-w-[375px]'>
                                <TextInput
                                    control={control}
                                    name='value_1'
                                    placeholder='Type price in USD...'
                                    error={errors.value_1}
                                    label='USD price'
                                />

                                <TextInput
                                    control={control}
                                    name='value_2'
                                    placeholder='Type price in UAH...'
                                    error={errors.value_2}
                                    label='UAH price'
                                />
                            </div>
                        </div>
                        <div className='flex justify-between gap-4'>
                            <div>
                                <p className='text-[14px] text-grey-500'>Date</p>
                                <DatePickerInput control={control} name='date' placeholder='Date' />
                            </div>
                            <div className='flex gap-4 max-w-[375px]'>
                                <div>
                                    <p className='text-[14px] text-grey-500'>Guarantee start</p>
                                    <DatePickerInput control={control} name='start' placeholder='Start date' />
                                </div>
                                <div>
                                    <p className='text-[14px] text-grey-500'>Guarantee end</p>
                                    <DatePickerInput control={control} name='end' placeholder='End date' />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <CheckBoxInput control={control} name='isNew' label='Is new' />
                        </div>
                        <div className='flex gap-4 justify-center mt-2'>
                            <Button
                                type='button'
                                variant='shadow'
                                onClick={() => router.push('/')}
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                type='submit'
                                color='primary'
                                variant='shadow'
                                className={isPending ? 'opacity-70' : ''}
                                isDisabled={isPending}
                            >
                                <Image
                                    src={'/icons/create.svg'}
                                    alt={'pen'}
                                    width={18}
                                    height={18}
                                />
                                Create Product
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
