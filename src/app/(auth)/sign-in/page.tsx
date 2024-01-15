import React from 'react';
import { Metadata } from 'next';

import { SignInForm } from './components/SignInForm';
import { AuthFormHeader } from '@/components/AuthFormHeader';
import { AuthWrapper } from '@/components/AuthWrapper';
import { signInPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = signInPageMetaData;

const SignInPage = () => {
    return (
        <AuthWrapper>
            <AuthFormHeader title='Create an account' />
            <SignInForm />
        </AuthWrapper>

    );
};

export default SignInPage;