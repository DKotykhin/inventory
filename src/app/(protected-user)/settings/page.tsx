import React from 'react';
import { Metadata } from 'next';

import { settingsPageMetaData } from '@/metadata/metadata';
import { UserTable } from './components/UserTable';
import { UserActions } from './components/UserActions';

export const metadata: Metadata = settingsPageMetaData;

const SettingsPage = () => {
    return (
        <div className='flex flex-col items-center gap-4 mt-10'>
            <h1 className='text-xl text-grey-800 font-semibold'>Settings Page</h1>
            <UserTable />
            <UserActions />
        </div>
    );
};

export default SettingsPage;