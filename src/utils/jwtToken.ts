import jwt from 'jsonwebtoken';

import { RoleTypes } from '@prisma/client';

export const jwtToken = (_id: string, role: RoleTypes) => {
    return jwt.sign({ _id, role }, process.env.JWT_TOKEN_SECRET_KEY!, { expiresIn: '2d' });
};
