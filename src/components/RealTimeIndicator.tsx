"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const RealTimeIndicator = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        setCurrentTime(new Date());
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return currentTime ? (
        <div className='flex flex-col text-sm text-grey'>
            <h3>{format(currentTime, 'eeee', { locale: ru })}</h3>
            <div className='flex gap-4'>
                <p>{format(currentTime, 'dd MMM yyyy', { locale: ru })}</p>
                <div className='flex gap-1'>
                    <Image
                        src={'/icons/time.svg'}
                        alt={'time'}
                        width={15}
                        height={15}
                        className='w-4 h-auto'
                    />
                    {format(currentTime, 'H:mm')}
                </div>

            </div>
        </div>
    ) : null;
};
