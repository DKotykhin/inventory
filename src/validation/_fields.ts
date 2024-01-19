import { z } from 'zod';

export const email = z.string().trim().email({ message: 'Invalid email format' });

export const password = z
    .string()
    .trim()
    .min(8, { message: 'Minimum 8 characters to fill' })
    .max(128, { message: 'Too long password!' })
    .regex(/[A-Z]/, { message: 'At least 1 character should be an uppercase letter!' })
    .regex(/[0-9]/, { message: 'At least 1 character should be a digit!' });

export const userName = z
    .string()
    .trim()
    .min(2, { message: 'Minimum 2 characters to fill' })
    .max(50, { message: 'Maximum 50 characters to fill' });

export const textFieldRequired = z
    .string()
    .trim()
    .min(2, { message: 'Min 2 characters to fill' })
    .max(150, { message: 'Max 150 characters to fill' });

export const textField = z.string().trim().max(250, { message: 'Maximum 250 characters to fill' });

export const dateField = z.union([z.date(), z.null()]);

export const booleanField = z.boolean();

