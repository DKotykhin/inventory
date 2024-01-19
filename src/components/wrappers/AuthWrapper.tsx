import React, { ReactNode } from 'react';

export const AuthWrapper = ({
    children,
}: {
    children: ReactNode;
}) => {
    return (
        <section className="flex justify-center w-full">
            <div className="flex justify-center max-w-[1440px] w-full mt-2 md:mt-4">
                <div className='flex flex-col items-center gap-5 max-w-[500px] px-4 py-8 m-4 w-full border rounded-2xl border-grey-50 shadow-lg bg-white'>
                    {children}
                </div>
            </div>
        </section>
    );
};
