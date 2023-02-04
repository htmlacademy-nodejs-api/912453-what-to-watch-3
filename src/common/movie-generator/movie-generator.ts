import {MovieGeneratorInterface} from './movie-generator.interface.js';
import {MockData} from '../../types/mock-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import dayjs from 'dayjs';

export class MovieGenerator implements MovieGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(1, 1000), 'day').toISOString();
    const genres = getRandomItems(this.mockData.genres).join(',');
    const releaseYear = generateRandomValue(1950, 2022);
    const rating = generateRandomValue(1, 10, 1);
    const previewFilePath = getRandomItem(this.mockData.previews);
    const movieFilePath = getRandomItem(this.mockData.videos);
    const actors = getRandomItems(this.mockData.actors);
    const director = getRandomItem(this.mockData.directors);
    const durationInMinutes = generateRandomValue(60, 220);
    const commentCount = generateRandomValue(0, 30);
    const userName = getRandomItem(this.mockData.userNames);
    const userEmail = getRandomItem(this.mockData.userEmails);
    const userAvatar = getRandomItem(this.mockData.userAvatars);
    const userPassword = `qwerty${generateRandomValue(1000, 2022)}`;
    const posterFilePath = getRandomItem(this.mockData.posters);
    const backgroundImageFilePath = getRandomItem(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem(this.mockData.colors);

    return [
      title, description, postDate, genres, releaseYear, rating, previewFilePath, movieFilePath, actors, director, durationInMinutes,
      commentCount, userName, userEmail, userAvatar, userPassword, posterFilePath, backgroundImageFilePath, backgroundColor]
      .join('\t');
  }

}
