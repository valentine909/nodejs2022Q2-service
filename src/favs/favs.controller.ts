import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackService } from '../track/track.service';
import { Track } from '../track/entities/track.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { validateFavExists } from '../utils/helpers';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Routes } from '../utils/constants';

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
  createTrack(@Param('id') id: string): Track {
    const track = validateFavExists(this.trackService, id) as Track;
    this.favsService.addTrack(id);
    return track;
  }

  @Delete(`${Routes.track}/:id`)
  @HttpCode(204)
  removeTrack(@Param('id') id: string): void {
    return this.favsService.removeTrack(id);
  }

  @Post(`${Routes.album}/:id`)
  @HttpCode(201)
  createAlbum(@Param('id') id: string): Album {
    const album = validateFavExists(this.albumService, id) as Album;
    this.favsService.addAlbum(id);
    return album;
  }

  @Delete(`${Routes.album}/:id`)
  @HttpCode(204)
  removeAlbum(@Param('id') id: string): void {
    return this.favsService.removeAlbum(id);
  }

  @Post(`${Routes.artist}/:id`)
  @HttpCode(201)
  createArtist(@Param('id') id: string): Artist {
    const artist = validateFavExists(this.artistService, id) as Artist;
    this.favsService.addArtist(id);
    return artist;
  }

  @Delete(`${Routes.artist}/:id`)
  @HttpCode(204)
  removeArtist(@Param('id') id: string): void {
    return this.favsService.removeArtist(id);
  }
}
