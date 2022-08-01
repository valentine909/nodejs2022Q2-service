import { Injectable } from '@nestjs/common';
import { IFavs } from './interface/favs.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouritesEntity } from './entities/favs.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavouritesEntity)
    private favRepository: Repository<FavouritesEntity>,
  ) {}

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

  async removeTrack(id: string) {
    const favs = await this.findAll();
    const filteredArray = favs.tracks.filter((trackId) => trackId !== id);
    if (filteredArray.length === favs.tracks.length) {
      return null;
    }
    favs.tracks = filteredArray;
    await this.favRepository.save(favs);
  }

  async addAlbum(id: string) {
    const favs = await this.findAll();
    if (!favs.albums.includes(id)) {
      favs.albums.push(id);
    }
    await this.favRepository.save(favs);
  }

  async removeAlbum(id: string) {
    const favs = await this.findAll();
    const filteredArray = favs.albums.filter((albumId) => albumId !== id);
    if (filteredArray.length === favs.albums.length) {
      return null;
    }
    favs.albums = filteredArray;
    await this.favRepository.save(favs);
  }

  async addArtist(id: string) {
    const favs = await this.findAll();
    if (!favs.artists.includes(id)) {
      favs.artists.push(id);
    }
    await this.favRepository.save(favs);
  }

  async removeArtist(id: string) {
    const favs = await this.findAll();
    const filteredArray = favs.artists.filter((artistId) => artistId !== id);
    if (filteredArray.length === favs.artists.length) {
      return null;
    }
    favs.artists = filteredArray;
    await this.favRepository.save(favs);
  }
}
