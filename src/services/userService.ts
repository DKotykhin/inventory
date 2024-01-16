import { User } from '@prisma/client';
import { db } from '@/lib/db';

import { ApiError } from '@/handlers/apiError';

import { VerifyEmailTemplate } from '@/components/emailTemplates';
import { checkAuth, cryptoToken, findUserByEmail, findUserById, jwtToken, mailSender, PasswordHash } from '@/utils/_index';
import { SignInTypes, signInValidate, SignUpTypes, signUpValidate } from '@/validation/userValidation';

class UserService {
    async signUp(signUpData: SignUpTypes) {
        await signUpValidate(signUpData);
        const { email, password, userName } = signUpData;
        const candidate = await db.user.findUnique({
            where: { email },
        });
        if (candidate?.id) {
            throw ApiError.badRequest(`User ${email} already exist`);
        }
        const passwordHash = await PasswordHash.create(password);
        const token = cryptoToken();

        const user = await db.user.create({
            data: {
                email,
                userName,
                passwordHash,
                emailConfirm: {
                    create: {
                        token,
                        expiredAt: new Date(Date.now() + 1000 * 60 * 60),
                    },
                },
            },
        });
        if (!user?.id) {
            throw ApiError.internalError('Database error');
        }
        await mailSender({
            to: email,
            subject: 'Verify Email',
            react: VerifyEmailTemplate({ token }),
        });
        const { id, createdAt, role } = user;
        const message = `User ${userName} successfully created`;

        return { user: { id, email, userName, role, createdAt, message } };
    }

    async verifyEmail({ token }: { token: string }): Promise<{ status: Boolean }> {
        if (!token) {
            throw ApiError.badRequest('Token is required');
        }

        const mail = await db.emailConfirm.findFirst({
            where: { token, expiredAt: { gt: new Date() } },
            include: {
                user: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!mail?.id) {
            throw ApiError.badRequest('Invalid token');
        }

        if (mail.verified) return { status: true };
        else {
            try {
                await db.emailConfirm.update({
                    where: { id: mail.id },
                    data: {
                        token: null,
                        expiredAt: null,
                        verified: true,
                    },
                });
            } catch (error) {
                throw ApiError.badRequest('Email not verified');
            }
            return { status: true };
        }
    }

    async signIn(data: SignInTypes): Promise<{ user: User; token: string }> {
        const { email, password } = await signInValidate(data);
    
        const user = await findUserByEmail(email);
    
        if (!user?.emailConfirm?.verified) {
            const token = cryptoToken();
            await mailSender({
                to: email,
                subject: 'Verify Email',
                react: VerifyEmailTemplate({ token }),
            });
            await db.user.update({
                where: { email },
                data: {
                    emailConfirm: {
                        update: {
                            token,
                            expiredAt: new Date(Date.now() + 1000 * 60 * 60),
                        },
                    },
                },
            });
            throw ApiError.badRequest('Email not verified. Check your email');
        }
    
        if (user?.passwordHash === null) {
            throw ApiError.badRequest('Incorrect login or password');
        }
        await PasswordHash.compare(password, user.passwordHash, 'Incorrect login or password');
    
        const token = jwtToken(user.id, user.role);
        const { userName, id, role, createdAt, avatar } = user;
    
        return {
            user: {
                id,
                userName,
                email,
                role,
                createdAt,
                avatar,
                passwordHash: null,
            },
            token,
        };
    }

    async getUserByToken(token: string): Promise<any> {
        const { id } = checkAuth(token);
        const user = await findUserById(id);

        const { userName, email, role, createdAt, avatar } = user;

        return { id, userName, email, role, createdAt, avatar, passwordHash: null };
    }
}

const userService = new UserService();

export default userService;
