import React from 'react';

import Image from "next/image";
import Link from "next/link";

import { RealTimeIndicator } from './RealTimeIndicator';

export const Header = () => {
    return (
        <header className="flex justify-center w-full bg-white shadow-lg h-16 z-10 absolute top-0">
            <div className="flex justify-between items-center max-w-[1440px] w-full px-4 md:px-8">
                <div className="flex items-center gap-3">
                    <Image
                        src={'/logo.png'}
                        alt={'logo'}
                        width={25}
                        height={25}
                    />
                    <Link href={'/'} className='text-green text-2xl font-semibold tracking-wider'>
                        Inventory
                    </Link>
                </div>
                <RealTimeIndicator />
            </div>
        </header>
    );
};
