import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import {
  findElementById,
  idFilter,
  removeElement,
  validateUUID,
} from '../utils/helpers';

@Injectable()
export class AlbumService {
  private _albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const id = uuidv4();
    const album = new Album(id, createAlbumDto);
    this._albums.push(album);
    return album;
  }

  findAll(): Album[] {
    return this._albums;
  }

  findOne(id: string): Album {
    validateUUID(id);
    const { element } = findElementById(this._albums, id);
    return element;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    validateUUID(id);
    const { index } = findElementById(this._albums, id);
    this._albums[index] = new Album(id, {
      ...this._albums[index],
      ...updateAlbumDto,
    });
    return this._albums[index];
  }

  remove(id: string): void {
    validateUUID(id);
    this._albums = removeElement(this._albums, id, idFilter);
  }
}
