import { db } from '@/lib/db';
import { ApiError } from '@/handlers/apiError';

export const findUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: { email },
            include: {
                emailConfirm: {
                    select: {
                        verified: true,
                    },
                },
            },
        });
        return user;
    } catch (error) {
        throw ApiError.notFound("Can't find user");
    }
};

export const findUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id },
            include: {
                emailConfirm: {
                    select: {
                        verified: true,
                    },
                },
            },
        });
        if (!user?.emailConfirm?.verified) {
            throw ApiError.badRequest('Email not verified');
        }

        return user;
    } catch (error) {
        throw ApiError.notFound("Can't find user");
    }
};
