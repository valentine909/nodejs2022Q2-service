import { HttpException, HttpStatus } from '@nestjs/common';
import { Messages } from './constants';

export const validatePassword = (serverSide, clientSide) => {
  if (serverSide !== clientSide) {
    throw new HttpException(Messages.WRONG_PASSWORD, HttpStatus.FORBIDDEN);
  }
};
