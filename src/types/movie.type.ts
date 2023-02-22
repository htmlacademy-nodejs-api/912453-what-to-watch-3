import {Genre} from './genre.enum.js';
import {User} from './user.type.js';

export type Movie = {
  // _id: string;
  title: string;
  description: string;
  postDate: Date;
  genre: Genre;
  releaseYear: number;
  rating: number;
  previewFilePath: string;
  movieFilePath: string;
  actors: string[];
  director: string;
  durationInMinutes: number;
  commentsCount: number;
  user: User;
  posterFilePath: string;
  backgroundImageFilePath: string;
  backgroundColor: string;
}
