import 'reflect-metadata';
import {Application} from './app/application.js';
import {Container} from 'inversify';
import {Component} from './types/component.types.js';
import {applicationContainer} from './app/application.container.js';
import {userContainer} from './modules/user/user.container.js';
import {movieContainer} from './modules/movie/movie.container.js';
import {commentContainer} from './modules/comment/comment.container.js';
import {watchlistContainer} from './modules/watchlist/watchlist.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    applicationContainer,
    userContainer,
    movieContainer,
    commentContainer,
    watchlistContainer
  );
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
