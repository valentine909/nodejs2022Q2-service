import { validate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Messages } from './constants';
import { User } from '../user/entities/user.entity';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

interface IElement {
  element: any;
  index: number;
}

export const validateUUID = (id: string): void | never => {
  if (!validate(id)) {
    throw new HttpException(Messages.INVALID_ID, HttpStatus.BAD_REQUEST);
  }
};

export const findElementById = (
  array: Array<any>,
  id: string,
): IElement | never => {
  const index = array.findIndex((element: any) => element.id === id);
  if (index !== -1) {
    return { element: array[index], index: index };
  }
  throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
};

export const removeElement = (array: any, id: string): Array<any> | never => {
  const filteredArray = array.filter((element) => element.id !== id);
  if (filteredArray.length === array.length) {
    throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
  return filteredArray;
};

export const removePassword = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  return rest;
};

export const validatePassword = (serverSide, clientSide) => {
  if (serverSide !== clientSide) {
    throw new HttpException(Messages.WRONG_PASSWORD, HttpStatus.FORBIDDEN);
  }
};

export const validateFavExists = (
  service: ArtistService | TrackService | AlbumService,
  id: string,
) => {
  try {
    return service.findOne(id);
  } catch (e) {
    if (e.status === 404) {
      throw new HttpException(
        Messages.ORIGIN_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      throw e;
    }
  }
};

export const removeFavId = (
  array: string[],
  id: string,
): Array<any> | never => {
  const filteredArray = array.filter((elementId) => elementId !== id);
  if (filteredArray.length === array.length) {
    throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
  return filteredArray;
};

export const saveDeleteFromFavs = (
  array: any,
  id: string,
  shouldThrowError: boolean,
) => {
  validateUUID(id);
  let filteredArray;
  try {
    filteredArray = removeFavId(array, id);
  } catch (err) {
    if (shouldThrowError) {
      throw err;
    }
  }
  return filteredArray ? filteredArray : array;
};
