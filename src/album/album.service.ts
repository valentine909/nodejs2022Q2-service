import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { IAlbum } from './model/album.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from '../utils/constants';

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
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      return album;
    }
    throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const updatedAlbum = Object.assign(album, updateAlbumDto);
    return await this.albumRepository.save(updatedAlbum);
  }

  async delete(id: string): Promise<void> {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async nullArtist(id: string) {
    const albums = await this.findAll();
    for (const album of albums) {
      if (album.artistId === id) {
        await this.update(id, { artistId: null });
      }
    }
  }
}
