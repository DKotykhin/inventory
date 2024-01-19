import React from 'react';
import { Metadata } from 'next';

import { AuthWrapper } from '@/components/wrappers/AuthWrapper';
import { sendEmailMessagePageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = sendEmailMessagePageMetaData;

const SendEmailPage = () => {
    return (
        <AuthWrapper>
            <p className='text-4xl'>👍</p>
            <h2 className='text-4xl text-green'>
                Link sent to your email!
            </h2>
            <p className='text-grey-500 text-xl'>Check your email</p>            
        </AuthWrapper>
    );
};

export default SendEmailPage;