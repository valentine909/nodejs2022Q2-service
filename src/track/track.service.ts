import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ITrack } from './interface/track.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from '../utils/constants';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<ITrack> {
    const track = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(track);
  }

  async findAll(): Promise<ITrack[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<ITrack> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (track) {
      return track;
    }
    throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<ITrack> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const updatedTrack = Object.assign(track, updateTrackDto);
    return await this.trackRepository.save(updatedTrack);
  }

  async delete(id: string): Promise<void> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async nullArtist(id: string): Promise<void> {
    const tracks = await this.findAll();
    const promisesToProcess = tracks
      .filter((track) => track.artistId === id)
      .map((track) => this.update(track.id, { artistId: null }));
    await Promise.all(promisesToProcess);
  }

  async nullAlbum(id: string): Promise<void> {
    const tracks = await this.findAll();
    const promisesToProcess = tracks
      .filter((track) => track.albumId === id)
      .map((track) => this.update(track.id, { albumId: null }));
    await Promise.all(promisesToProcess);
  }
}
