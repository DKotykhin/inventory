"use client";

import Image from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import { useUserStore } from '@/stores/userStore';
import { cn } from '@/utils/cn';

const navLinks = [
    {
        name: 'Приход',
        url: '/',
    },
    {
        name: 'Группы',
        url: '/groups',
    },
    {
        name: 'Продукты',
        url: '/products',
    },
    {
        name: 'Пользователи',
        url: '/users',
    },
    {
        name: 'Настройки',
        url: '/settings',
    },
];

export const SideBar = () => {

    const pathname = usePathname();
    const { userData, removeUser } = useUserStore();
    const router = useRouter();

    const logoutClick = () => {
        removeUser();
        Cookies.remove('token');
        router.push('/sign-in');
    };

    return (
        <div className='w-[200px] h-screen bg-white flex flex-col justify-between items-center shadow-lg pt-32 pb-8'>
            <div className='flex flex-col items-center gap-16'>
                <div className=' flex justify-center items-center bg-grey-200 rounded-full relative w-20'>
                    <Image
                        src={userData.avatar ? userData.avatar : '/icons/user.svg'}
                        alt={'user'}
                        width={80}
                        height={80}
                        priority
                        className={cn(
                            'rounded-full w-20 h-20',
                            userData.avatar ? '' : 'p-4')}
                    />
                    <Image
                        src={'/icons/settings.svg'}
                        alt={'settings'}
                        width={36}
                        height={36}
                        className='absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg cursor-pointer'
                    />
                </div>
                <nav>
                    <ul className='flex flex-col gap-6 text-center'>
                        {navLinks.map((link) => (
                            <li key={link.url} className='text-grey-700 uppercase text-sm font-medium'>
                                <Link href={link.url}>
                                    <span className={link.url === pathname ? 'border-green/80 border-b-2' : ''}>
                                        {link.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <button className='flex items-center gap-2 p-1' onClick={logoutClick}>
                <Image
                    src={'/icons/logout.svg'}
                    alt={'logout'}
                    width={20}
                    height={20}                    
                />
                <span className='text-red'>Выйти</span>                
            </button>
        </div>
    );
};
