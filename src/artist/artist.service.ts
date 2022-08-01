import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IArtist } from './interface/artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll(): Promise<IArtist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<IArtist> {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<IArtist> {
    const artist = await this.findOne(id);
    if (!artist) {
      return artist;
    }
    const updatedArtist = Object.assign(artist, updateArtistDto);
    return await this.artistRepository.save(updatedArtist);
  }

  async delete(id: string): Promise<number> {
    const { affected } = await this.artistRepository.delete(id);
    if (affected === 0) {
      return affected;
    }
  }
}
