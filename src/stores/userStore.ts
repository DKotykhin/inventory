import { create } from 'zustand';

import { RoleTypes, User } from '@prisma/client';

type UserStore = {
    userData: User;
    addUser: (item: User) => void;
    removeUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    userData: {
        id: '',
        createdAt: new Date(),
        userName: '',
        email: '',
        avatar: '',
        role: RoleTypes.USER,
        passwordHash: null,
    },
    addUser: (newUser: User) =>
        set(() => ({
            userData: newUser,
        })),

    removeUser: () =>
        set(() => ({
            userData: {
                id: '',
                createdAt: new Date(),
                userName: '',
                email: '',
                avatar: '',
                role: RoleTypes.USER,
                passwordHash: null,
            },
        })),
}));
