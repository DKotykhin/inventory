import { z } from 'zod';

import { ApiError } from '@/handlers/apiError';
import { dateField, textField, textFieldRequired, booleanField } from '@/validation/_fields';
import { CurrencyTypes } from '@prisma/client';

export const createProductValidationSchema = z.object({
    title: textFieldRequired,
    serialNumber: textField,
    isNew: booleanField,
    type: textFieldRequired,
    specification: textField,
    order: textField,
    photo: textField,
    date: dateField,
    value_1: textFieldRequired,
    value_2: textFieldRequired,
    isDefault: z.enum([CurrencyTypes.UAH, CurrencyTypes.USD]),
    start: dateField,
    end: dateField,
});
export type CreateProductTypes = z.infer<typeof createProductValidationSchema>;
export const createProductValidate = async (validateData: CreateProductTypes) => {
    try {
        return await createProductValidationSchema.parseAsync(validateData);
    } catch (err: any) {
        throw ApiError.unprocessableEntity(err?.issues[0]?.message);
    }
};
