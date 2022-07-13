import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class TrackService {
  private _tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const track = new Track(id, createTrackDto);
    this._tracks.push(track);
    return track;
  }

  findAll() {
    return this._tracks;
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const element = this._tracks.find((track) => track.id === id);
    if (element) {
      return element;
    }
    throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const index = this._tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    }
    this._tracks[index] = new Track(id, {
      ...this._tracks[index],
      ...updateTrackDto,
    });
    return this._tracks[index];
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    this._tracks = this._tracks.filter((track) => track.id !== id);
  }
}
