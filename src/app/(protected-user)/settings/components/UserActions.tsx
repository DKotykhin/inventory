"use client";

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { ChangePasswordModal } from './ChangePasswordModal';

export const UserActions = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className='mt-8'>
                <Button onClick={() => setIsModalOpen(true)}>
                    Change Password
                </Button>
            </div>
            {isModalOpen &&
                <ChangePasswordModal cancelClick={() => setIsModalOpen(false)} />
            }
        </>
    );
};
