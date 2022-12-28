import {FileReaderInterface} from './file-reader.interface.js';
import {readFileSync} from 'fs';
import {Movie} from '../../types/movie.type.js';
import {Genre} from '../../types/genre.enum.js';
import * as crypto from 'crypto';

export class TsvFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  private csvToArray(row: string): string[] {
    return row.split(',').map((value) => value.trim());
  }

  public toArray(): Movie[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, genres,
        releaseYear, rating, previewFilePath, movieFilePath,
        actors, director, durationInMinutes, commentCount,
        userName, userEmail, userAvatar, userPassword,
        posterFilePath, backgroundImageFilePath, backgroundColor]) => ({
        _id: crypto.randomUUID(),
        title,
        description,
        postDate: new Date(postDate),
        genre: this.csvToArray(genres).map((item) => item as Genre),
        releaseYear: Number.parseInt(releaseYear, 10),
        rating: Number.parseInt(rating, 10),
        previewFilePath,
        movieFilePath,
        actors: this.csvToArray(actors),
        director,
        durationInMinutes: Number.parseInt(durationInMinutes, 10),
        commentsCount: Number.parseInt(commentCount, 10),
        user: {
          _id: crypto.randomUUID(),
          name: userName,
          email: userEmail,
          avatar: userAvatar,
          password: userPassword
        },
        posterFilePath,
        backgroundImageFilePath,
        backgroundColor
      }));
  }
}
