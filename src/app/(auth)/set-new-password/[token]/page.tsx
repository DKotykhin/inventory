import React from 'react';

import { Metadata } from 'next';

import { SetNewPasswordForm } from '../components/SetNewPasswordForm';
import { AuthWrapper } from '@/components/wrappers/AuthWrapper';
import { setNewPasswordPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = setNewPasswordPageMetaData;

const TokenPage = ({
    params,
}: {
    params: {
        token: string;
    };
}) => {
    return (
        <AuthWrapper>
            <p className='text-[24px] font-semibold'>
                Set new password
            </p>
            <SetNewPasswordForm token={params?.token} />
        </AuthWrapper>


    );
};

export default TokenPage;