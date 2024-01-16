"use client";

import { useState } from 'react';
import Image from "next/image";

import Cookies from "js-cookie";
import axios from "axios";

import { useUserStore } from '@/stores/userStore';
import { cn } from '@/utils/cn';

export const Avatar = () => {

    const { userData, changeUrl } = useUserStore();
    const [avatarLoading, setAvatarLoading] = useState(false);

    const onChange = async (e: any) => {
        setAvatarLoading(true);
        const formData = new FormData();
        formData.append("avatar", e.target.files[0], e.target.files[0].name);
        const token = Cookies.get("token");
        const config = {
            method: "POST",
            url: "/api/user/upload-avatar",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        };
        try {
            const user = await axios(config);
            changeUrl(user.data.avatar);
            setAvatarLoading(false);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className=' flex justify-center items-center bg-grey-200 rounded-full relative w-20'>
            <Image
                src={avatarLoading ? '/spinner.svg' : userData.avatar ? userData.avatar : '/icons/user.svg'}
                alt={'user'}
                width={80}
                height={80}
                priority
                className={cn(
                    'rounded-full w-20 h-20',
                    userData.avatar ? '' : 'p-4')}
            />
            <label htmlFor='avatar' onChange={onChange}>
                <Image
                    src={'/icons/settings.svg'}
                    alt={'settings'}
                    width={36}
                    height={36}
                    className='absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg cursor-pointer'
                />
                <input
                    type='file'
                    id='avatar'
                    name="avatar"
                    accept="image/*"
                    hidden
                />
            </label>
        </div>
    );
};
