import React from "react";

import Image from "next/image";
import Link from "next/link";

export const Error: React.FC = () => {

    return (
        <div className='w-full flex flex-col items-center gap-4 mt-12'>
            <Image
                src={'/sorry.jpeg'}
                alt="error"
                width={300}
                height={300}
                priority
            />
            <div className='flex flex-col items-center gap-6 mt-10'>
                <p className='text-lg text-grey'>
                    Page not found...
                </p>
                <Link href={`/`} className='text-2xl text-mint uppercase font-medium hover:underline'>
                    Main Page
                </Link>
            </div>
        </div>
    );
};

