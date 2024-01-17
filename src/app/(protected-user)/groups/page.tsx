import React from 'react';
import { Metadata } from 'next';

import { groupsPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = groupsPageMetaData;

const GroupsPage = () => {
    return (
        <main>
            <h1 className="">Groups Page</h1>
        </main>
    );
};

export default GroupsPage;