import {
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { Messages, Routes } from '../utils/constants';
import { ITrack } from '../track/interface/track.interface';
import { IAlbum } from '../album/interface/album.interface';
import { IArtist } from '../artist/interface/artist.interface';

@Controller(Routes.favs)
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  @Get()
  async findAll() {
    const favs = await this.favsService.findAll();
    const response = {
      artists: [],
      albums: [],
      tracks: [],
    };
    response.albums = await Promise.all(
      favs.albums.map((id) => this.albumService.findOne(id)),
    );
    response.artists = await Promise.all(
      favs.artists.map((id) => this.artistService.findOne(id)),
    );
    response.tracks = await Promise.all(
      favs.tracks.map((id) => this.trackService.findOne(id)),
    );
    return response;
  }

  @Post(`${Routes.track}/:id`)
  @HttpCode(201)
  async createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ITrack> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new HttpException(
        Messages.ORIGIN_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsService.addTrack(id);
    return track;
  }

  @Delete(`${Routes.track}/:id`)
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const response = await this.favsService.removeTrack(id);
    if (response === null) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return;
  }

  @Post(`${Routes.album}/:id`)
  @HttpCode(201)
  async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IAlbum> {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException(
        Messages.ORIGIN_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsService.addAlbum(id);
    return album;
  }

  @Delete(`${Routes.album}/:id`)
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const response = await this.favsService.removeAlbum(id);
    if (response === null) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return;
  }

  @Post(`${Routes.artist}/:id`)
  @HttpCode(201)
  async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IArtist> {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException(
        Messages.ORIGIN_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsService.addArtist(id);
    return artist;
  }

  @Delete(`${Routes.artist}/:id`)
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const response = await this.favsService.removeArtist(id);
    if (response === null) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return;
  }
}
