import React from 'react';
import { cookies } from 'next/headers';

import { checkAuth } from '@/utils/checkAuth';
import { RoleTypes } from '@prisma/client';

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
            <h1>Users Page</h1>
            <p>User Access</p>
            <p>Role: {role}</p>
        </div>
    );
};

export default UsersPage;