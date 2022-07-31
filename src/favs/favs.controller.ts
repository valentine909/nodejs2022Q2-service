import {
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
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
    const track = (await validateFavExists(this.trackService, id)) as ITrack;
    await this.favsService.addTrack(id);
    return track;
  }

  @Delete(`${Routes.track}/:id`)
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.favsService.removeTrack(id);
  }

  @Post(`${Routes.album}/:id`)
  @HttpCode(201)
  async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IAlbum> {
    const album = (await validateFavExists(this.albumService, id)) as IAlbum;
    await this.favsService.addAlbum(id);
    return album;
  }

  @Delete(`${Routes.album}/:id`)
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.favsService.removeAlbum(id);
  }

  @Post(`${Routes.artist}/:id`)
  @HttpCode(201)
  async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IArtist> {
    const artist = (await validateFavExists(this.artistService, id)) as IArtist;
    await this.favsService.addArtist(id);
    return artist;
  }

  @Delete(`${Routes.artist}/:id`)
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.favsService.removeArtist(id);
  }
}
