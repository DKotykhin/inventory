import React from 'react';
import { Metadata } from 'next';

import { groupsPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = groupsPageMetaData;

const GroupsPage = () => {
    return (
        <div className='flex justify-center mt-10'>
            <h1 className='text-xl text-grey-800 mb-4'>Groups Page</h1>
        </div>
    );
};

export default GroupsPage;