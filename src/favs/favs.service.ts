import { Injectable } from '@nestjs/common';
import { errorControlledDeleteFromFavs } from '../utils/helpers';
import { IFavs } from './interface/favs.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouritesEntity } from './entities/favs.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavouritesEntity)
    private favRepository: Repository<FavouritesEntity>,
  ) {
    favRepository.findOne({ where: { id: 1 } }).then((favs) => {
      if (!favs) {
        favRepository
          .save({ artists: [], albums: [], tracks: [] })
          .catch((err) => console.log(err));
      }
    });
  }

  async findAll(): Promise<IFavs> {
    return await this.favRepository.findOne({
      where: { id: 1 },
    });
  }

  async addTrack(id: string) {
    const favs = await this.findAll();
    if (!favs.tracks.includes(id)) {
      favs.tracks.push(id);
      await this.favRepository.save(favs);
    }
  }

  async removeTrack(id: string, shouldThrowError = true) {
    const favs = await this.findAll();
    favs.tracks = errorControlledDeleteFromFavs(
      favs.tracks,
      id,
      shouldThrowError,
    );
    await this.favRepository.save(favs);
  }

  async addAlbum(id: string) {
    const favs = await this.findAll();
    if (!favs.albums.includes(id)) {
      favs.albums.push(id);
    }
    await this.favRepository.save(favs);
  }

  async removeAlbum(id: string, shouldThrowError = true) {
    const favs = await this.findAll();
    favs.albums = errorControlledDeleteFromFavs(
      favs.albums,
      id,
      shouldThrowError,
    );
    await this.favRepository.save(favs);
  }

  async addArtist(id: string) {
    const favs = await this.findAll();
    if (!favs.artists.includes(id)) {
      favs.artists.push(id);
    }
    await this.favRepository.save(favs);
  }

  async removeArtist(id: string, shouldThrowError = true) {
    const favs = await this.findAll();
    favs.artists = errorControlledDeleteFromFavs(
      favs.artists,
      id,
      shouldThrowError,
    );
    await this.favRepository.save(favs);
  }
}
