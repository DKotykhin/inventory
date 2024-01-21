import { genSalt, hashSync, compare } from 'bcryptjs';

import { ApiError } from '@/handlers/apiError';

export class PasswordHash {
  private static index = 5;

  static create = async (password: string) => {
    const salt = await genSalt(this.index);
    const passwordHash = hashSync(password, salt);
    return passwordHash;
  };

  static compare = async (
    password: string,
    passwordHash: string,
    message: string,
  ) => {
    const isValidPass = await compare(password, passwordHash);
    if (!isValidPass) {
      throw ApiError.badRequest(message);
    }
    return isValidPass;
  };

  static same = async (
    password: string,
    passwordHash: string,
    message: string,
  ) => {
    const isValidPass = await compare(password, passwordHash);
    if (isValidPass) {
      throw ApiError.badRequest(message);
    }
    return isValidPass;
  };
}
