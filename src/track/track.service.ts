import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { findElementById, removeElement, validateUUID } from '../utils/helpers';

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
    validateUUID(id);
    const { element } = findElementById(this._tracks, id);
    return element;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    validateUUID(id);
    const { index } = findElementById(this._tracks, id);
    this._tracks[index] = new Track(id, {
      ...this._tracks[index],
      ...updateTrackDto,
    });
    return this._tracks[index];
  }

  remove(id: string) {
    validateUUID(id);
    this._tracks = removeElement(this._tracks, id);
  }
}
