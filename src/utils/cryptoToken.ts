import crypto from 'crypto';

import { ApiError } from '@/handlers/apiError';

export const cryptoToken = () => {
    const buffer = crypto.randomBytes(16);
    if (!buffer) throw ApiError.internalError('Something get wrong');
    const token = buffer.toString('hex');
    return token;
};
