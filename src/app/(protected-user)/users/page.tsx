import React from 'react';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

import { checkAuth } from '@/utils/checkAuth';
import { RoleTypes } from '@prisma/client';
import { usersPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = usersPageMetaData;

const UsersPage = () => {

    const token = cookies().get("token")?.value;
    const { role } = checkAuth(`Bearer ${token}`);

    return role === RoleTypes.ADMIN || role === RoleTypes.SUBADMIN ? (
        <div className='text-center mt-8'>
            <h1>Users Page</h1>
            <p>Admin Access</p>
            <p>Role: {role}</p>
        </div>
    ) : (
        <div className='text-center mt-8'>
            <h1 className='text-xl text-grey-800 mb-4 font-semibold'>You need admin access for watching users profiles</h1>
            <p className='text-grey'>You current role: {role}</p>          
        </div>
    );
};

export default UsersPage;