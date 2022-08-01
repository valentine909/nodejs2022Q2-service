import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ITrack } from './interface/track.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return await this.trackRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<ITrack> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      return track;
    }
    const updatedTrack = Object.assign(track, updateTrackDto);
    return await this.trackRepository.save(updatedTrack);
  }

  async delete(id: string): Promise<number> {
    const { affected } = await this.trackRepository.delete(id);
    if (affected === 0) {
      return affected;
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
