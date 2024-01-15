"use client";

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    
    return (
        <div className='w-[200px] h-full bg-white flex flex-col items-center shadow-lg fixed top-16 left-0'>
            <div className='bg-grey-200 rounded-full p-4 m-16'>
                <Image
                    src={'/icons/user.svg'}
                    alt={'user'}
                    width={40}
                    height={40}
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
    );
};
