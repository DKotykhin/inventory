"use client";

import React, { useState } from 'react';

import { ModalWrapper } from '@/components/ModalWrapper';
import { ConfirmPasswordForm } from './ConfirmPasswordForm';
import { UpdatePasswordForm } from './UpdatePasswordForm';

interface ChangePasswordModalProps {
    cancelClick: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ cancelClick }) => {

    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

    return (
        <ModalWrapper cancelClick={cancelClick}>
            {!isPasswordConfirmed ?
                <ConfirmPasswordForm
                    passwordConfirmed={() => setIsPasswordConfirmed(true)}
                    cancelClick={cancelClick}
                />
                :
                <UpdatePasswordForm cancelClick={cancelClick} />
            }
        </ModalWrapper>
    );
};
