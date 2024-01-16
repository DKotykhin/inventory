import jwt from 'jsonwebtoken';

import { ApiError } from '@/handlers/apiError';

export const checkAuth = (authToken: string) => {
    if (!authToken) {
        throw ApiError.unauthorized('No authorization data');
    }
    try {
        const token = authToken.split(' ')[1];
        const { id, role }: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY!);

        return { id, role };
    } catch {
        throw ApiError.unauthorized('Authorization error');
    }
};
