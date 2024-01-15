import { z } from 'zod';

import { ApiError } from '@/handlers/apiError';
import { email, password, userName } from '@/validation/_fields';

export const signUpValidationSchema = z.object({
    userName,
    email,
    password,
});
export type SignUpTypes = z.infer<typeof signUpValidationSchema>;
export const signUpValidate = async (validateData: SignUpTypes) => {
    try {
        return await signUpValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};

export const signInValidationSchema = z.object({
    email,
    password,
});
export type SignInTypes = z.infer<typeof signInValidationSchema>;
export const signInValidate = async (validateData: SignInTypes) => {
    try {
        return await signInValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};

export const emailValidationSchema = z.object({
    email,
});
export const emailValidate = async (validateData: { email: string }) => {
    try {
        return await emailValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};

export const userNameValidationSchema = z.object({
    userName,
});
export const userNameValidate = async (validateData: { userName: string }) => {
    try {
        return await userNameValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};

export const passwordValidationSchema = z.object({
    password,
});
export const passwordValidate = async (validateData: { password: string }) => {
    try {
        return await passwordValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};

export const changePasswordValidationSchema = z
    .object({
        password,
        newPassword: password,
    })
    .refine((data) => data.password !== data.newPassword, {
        path: ['newPassword'],
        message: 'The same password',
    });
export type ChangePasswordTypes = z.infer<typeof changePasswordValidationSchema>;
export const changePasswordValidate = async (validateData: ChangePasswordTypes) => {
    try {
        return await changePasswordValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};

export const setNewPasswordValidationSchema = z
    .object({
        password,
        confirmPassword: password,
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Password don't match",
    });
export type SetNewPasswordTypes = z.infer<typeof setNewPasswordValidationSchema>;