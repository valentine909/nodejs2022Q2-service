import { HttpException, HttpStatus } from '@nestjs/common';
import { Messages } from './constants';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

export const validatePassword = (serverSide, clientSide) => {
  if (serverSide !== clientSide) {
    throw new HttpException(Messages.WRONG_PASSWORD, HttpStatus.FORBIDDEN);
  }
};

export const validateFavExists = async (
  service: ArtistService | TrackService | AlbumService,
  id: string,
) => {
  try {
    return await service.findOne(id);
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

export const removeElement = (
  array: any,
  id: string,
  throwError: boolean,
): Array<any> | never => {
  const filteredArray = array.filter((element) => element !== id);
  if (filteredArray.length === array.length && throwError) {
    throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
  return filteredArray;
};
