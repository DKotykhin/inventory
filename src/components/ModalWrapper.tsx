import React, { ReactNode } from 'react';

export const ModalWrapper = ({
    children,
    cancelClick,
}: {
    children: ReactNode;
    cancelClick: () => void;
}) => {
    return (
        <div
            className='fixed top-0 left-0 w-screen h-screen bg-grey-900/70 backdrop-blur flex justify-center items-center z-50'
            onClick={cancelClick}
        >
            <div
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md'
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
