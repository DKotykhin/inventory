import React from 'react';
import { Metadata } from 'next';

import { VerifyEmail } from '../components/VerifyEmail';
import { verifyEmailPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = verifyEmailPageMetaData;

const VerifyEmailPage = ({
  params,
}: {
  params: {
      token: string;
  };
}) => {
  return (
    <VerifyEmail token={params?.token}/>
  );
};

export default VerifyEmailPage;