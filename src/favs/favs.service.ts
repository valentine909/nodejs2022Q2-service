import { Injectable } from '@nestjs/common';
import { IFavs } from './interface/favs.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouritesEntity } from './entities/favs.entity';
import { removeElement } from '../utils/helpers';

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

  async removeTrack(id: string, throwError = true) {
    const favs = await this.findAll();
    favs.tracks = removeElement(favs.tracks, id, throwError);
    await this.favRepository.save(favs);
  }

  async addAlbum(id: string) {
    const favs = await this.findAll();
    if (!favs.albums.includes(id)) {
      favs.albums.push(id);
    }
    await this.favRepository.save(favs);
  }

  async removeAlbum(id: string, throwError = true) {
    const favs = await this.findAll();
    favs.albums = removeElement(favs.albums, id, throwError);
    await this.favRepository.save(favs);
  }

  async addArtist(id: string) {
    const favs = await this.findAll();
    if (!favs.artists.includes(id)) {
      favs.artists.push(id);
    }
    await this.favRepository.save(favs);
  }

  async removeArtist(id: string, throwError = true) {
    const favs = await this.findAll();
    favs.artists = removeElement(favs.artists, id, throwError);
    await this.favRepository.save(favs);
  }
}
