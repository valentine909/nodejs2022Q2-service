import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { IAlbum } from './interface/album.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const album = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(album);
  }

  async findAll(): Promise<IAlbum[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<IAlbum> {
    return await this.albumRepository.findOne({ where: { id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      return;
    }
    const updatedAlbum = Object.assign(album, updateAlbumDto);
    return await this.albumRepository.save(updatedAlbum);
  }

  async delete(id: string): Promise<number> {
    const { affected } = await this.albumRepository.delete(id);
    return affected;
  }

  async nullArtist(id: string) {
    const albums = await this.findAll();
    const promisesToProcess = albums
      .filter((album) => album.artistId === id)
      .map((album) => this.update(album.id, { artistId: null }));
    await Promise.all(promisesToProcess);
  }
}
