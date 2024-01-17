import React from 'react';
import { Metadata } from 'next';

import { settingsPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = settingsPageMetaData;

const SettingsPage = () => {
    return (
        <div className='flex justify-center mt-10'>
            Settings Page
        </div>
    );
};

export default SettingsPage;