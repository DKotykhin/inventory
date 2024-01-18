"use client";

import Image from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import { useUserStore } from '@/stores/userStore';
import { Avatar } from './Avatar';

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
    const { removeUser } = useUserStore();
    const router = useRouter();

    const logoutClick = () => {
        removeUser();
        Cookies.remove('token');
        router.push('/sign-in');
    };

    return (
        <div className='w-[200px] bg-white flex flex-col justify-between items-center shadow-lg pt-32 pb-8'>
            <div className='flex flex-col items-center gap-16'>
                <Avatar />
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
            <button className='flex items-center gap-2 p-1 mt-4' onClick={logoutClick}>
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
