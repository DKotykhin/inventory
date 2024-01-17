import React from 'react';
import { Metadata } from 'next';

import { settingsPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = settingsPageMetaData;

const SettingsPage = () => {
    return (
        <div>Settings Page</div>
    );
};

export default SettingsPage;