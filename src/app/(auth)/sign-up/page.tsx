import React from 'react';

import type { Metadata } from 'next';

import { signUpPageMetaData } from '@/metadata/metadata';
import { AuthWrapper } from '@/components/wrappers/AuthWrapper';
import { AuthFormHeader } from '@/components/AuthFormHeader';
import { SignUpForm } from './components/SignUpForm';

export const metadata: Metadata = signUpPageMetaData;

const SignUp = () => {

    return (
        <AuthWrapper>
            <AuthFormHeader title='Create an account' />
            <SignUpForm />
        </AuthWrapper>
    );
};

export default SignUp;