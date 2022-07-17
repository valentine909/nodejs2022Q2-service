import { Injectable } from '@nestjs/common';
import { errorControlledDeleteFromFavs } from '../utils/helpers';
import { Favourites } from './entities/favs.entity';

@Injectable()
export class FavsService {
  private readonly _favourites: Favourites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll(): Favourites {
    return this._favourites;
  }

  addTrack(id: string) {
    if (!this._favourites.tracks.includes(id)) {
      this._favourites.tracks.push(id);
    }
  }

  removeTrack(id: string, shouldThrowError = true) {
    this._favourites.tracks = errorControlledDeleteFromFavs(
      this._favourites.tracks,
      id,
      shouldThrowError,
    );
  }

  addAlbum(id: string) {
    if (!this._favourites.albums.includes(id)) {
      this._favourites.albums.push(id);
    }
  }

  removeAlbum(id: string, shouldThrowError = true) {
    this._favourites.albums = errorControlledDeleteFromFavs(
      this._favourites.albums,
      id,
      shouldThrowError,
    );
  }

  addArtist(id: string) {
    if (!this._favourites.artists.includes(id)) {
      this._favourites.artists.push(id);
    }
  }

  removeArtist(id: string, shouldThrowError = true) {
    this._favourites.artists = errorControlledDeleteFromFavs(
      this._favourites.artists,
      id,
      shouldThrowError,
    );
  }
}
