import {Movie} from '../types/movie.type.js';
import crypto from 'crypto';
import {Genre} from '../types/genre.enum.js';

export const createMovie = (row: string): Movie => {

  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, genres,
    releaseYear, rating, previewFilePath, movieFilePath,
    actors, director, durationInMinutes, commentCount,
    userName, userEmail, userAvatar,
    posterFilePath, backgroundImageFilePath, backgroundColor] = tokens;

  return {
    // _id: crypto.randomUUID(),
    title,
    description,
    postDate: new Date(postDate),
    genre: genres.split(',').map((item) => item as Genre),
    releaseYear: Number.parseInt(releaseYear, 10),
    rating: Number.parseInt(rating, 10),
    previewFilePath,
    movieFilePath,
    actors: actors.split(','),
    director,
    durationInMinutes: Number.parseInt(durationInMinutes, 10),
    commentsCount: Number.parseInt(commentCount, 10),
    user: {
      name: userName,
      email: userEmail,
      avatar: userAvatar,
    },
    posterFilePath,
    backgroundImageFilePath,
    backgroundColor
  };
};

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
