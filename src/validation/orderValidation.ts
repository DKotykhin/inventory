import { z } from 'zod';

import { ApiError } from '@/handlers/apiError';
import { dateField, textField, textFieldRequired } from '@/validation/_fields';

export const createOrderValidationSchema = z.object({
    title: textFieldRequired,
    description: textField,
    date: dateField,
});
export type CreateOrderTypes = z.infer<typeof createOrderValidationSchema>;
export const signUpValidate = async (validateData: CreateOrderTypes) => {
    try {
        return await createOrderValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};
