import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import {
  findElementById,
  idFilter,
  removeElement,
  validateUUID,
} from '../utils/helpers';

@Injectable()
export class ArtistService {
  private _artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const id = uuidv4();
    const artist = new Artist(id, createArtistDto);
    this._artists.push(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this._artists;
  }

  findOne(id: string): Artist {
    validateUUID(id);
    const { element } = findElementById(this._artists, id);
    return element;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    validateUUID(id);
    const { index } = findElementById(this._artists, id);
    this._artists[index] = new Artist(id, {
      ...this._artists[index],
      ...updateArtistDto,
    });
    return this._artists[index];
  }

  remove(id: string): void {
    validateUUID(id);
    this._artists = removeElement(this._artists, id, idFilter);
  }
}
