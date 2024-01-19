import React from 'react';
import { Metadata } from 'next';

import { AuthWrapper } from '@/components/wrappers/AuthWrapper';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { forgotPasswordPageMetaData } from '@/metadata/metadata';
import { AuthFormHeader } from '@/components/AuthFormHeader';

export const metadata: Metadata = forgotPasswordPageMetaData;

const ForgotPasswordPage = () => {
    return (
        <AuthWrapper>
            <AuthFormHeader title='Forgot password' />
            <ForgotPasswordForm />
        </AuthWrapper>
    );
};

export default ForgotPasswordPage;