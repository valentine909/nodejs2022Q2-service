import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  Inject,
  forwardRef,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { validateFavExists } from '../utils/helpers';
import { Routes } from '../utils/constants';
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
  findAll() {
    const favs = this.favsService.findAll();
    type keys = keyof typeof favs;
    const response = {
      artists: [],
      albums: [],
      tracks: [],
    };
    const services = {
      artists: this.artistService,
      albums: this.albumService,
      tracks: this.trackService,
    };
    Object.keys(favs).map((entity: keys) => {
      favs[entity].map((id) => {
        response[entity].push(services[entity].findOne(id));
      });
    });
    return response;
  }

  @Post(`${Routes.track}/:id`)
  @HttpCode(201)
  async createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ITrack> {
    const track = (await validateFavExists(this.trackService, id)) as ITrack;
    this.favsService.addTrack(id);
    return track;
  }

  @Delete(`${Routes.track}/:id`)
  @HttpCode(204)
  removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favsService.removeTrack(id);
  }

  @Post(`${Routes.album}/:id`)
  @HttpCode(201)
  async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IAlbum> {
    const album = (await validateFavExists(this.albumService, id)) as IAlbum;
    this.favsService.addAlbum(id);
    return album;
  }

  @Delete(`${Routes.album}/:id`)
  @HttpCode(204)
  removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favsService.removeAlbum(id);
  }

  @Post(`${Routes.artist}/:id`)
  @HttpCode(201)
  async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IArtist> {
    const artist = (await validateFavExists(this.artistService, id)) as IArtist;
    this.favsService.addArtist(id);
    return artist;
  }

  @Delete(`${Routes.artist}/:id`)
  @HttpCode(204)
  removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favsService.removeArtist(id);
  }
}
