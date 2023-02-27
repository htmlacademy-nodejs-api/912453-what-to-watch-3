export const DEFAULT = {
  MOVIES_COUNT: 60,
  RATING_ACCURACY: 1
};

export const MOVIE_VALIDATION = {
  TITLE: {
    MessageValid: 'Title must be 2-100 characters long',
    MessageRequired: 'Title required',
    Min: 2,
    Max: 100
  },
  DESCRIPTION: {
    MessageValid: 'Description must be 2-100 characters long',
    MessageRequired: 'Description required',
    Min: 20,
    Max: 1024
  },
  POSTDATE: {
    MessageValid: 'Post date must be a valid ISO format',
    MessageRequired: 'Post date required'
  },
  GENRE: {
    MessageValid: 'Genre must be one of: comedy, crime, documentary, drama, horror, family, romance, scifi or thriller',
    MessageRequired: 'Genre required'
  },
  RELEASE_YEAR: {
    MessageRequired: 'Release year required',
    MessageValid: 'Release year is an integer value'
  },
  PREVIEW_VIDEO: {
    MessageValid: 'Preview video is a string value of filepath',
    MessageRequired: 'Preview video filepath required'
  },
  VIDEO: {
    MessageValid: 'Video is a string value of filepath',
    MessageRequired: 'Video filepath required'
  },
  ACTORS: {
    MessageValid: 'Must be an array of strings',
    MessageRequired: 'Actors array required'
  },
  DIRECTOR: {
    MessageValid: 'Director must be 2-100 characters long.',
    MessageRequired: 'Director required',
    Min: 2,
    Max: 100
  },
  DURATION: {
    MessageValid: 'Duration in minutes must be a number',
    MessageRequired: 'Duration required'
  },
  POSTER: {
    MessageValid: 'Must be a link to *.jpg file',
    MessageRequired: 'Poster image required'
  },
  BG_IMAGE: {
    MessageValid: 'Must be a link to *.jpg file',
    MessageRequired: 'Background image required'
  },
  BG_COLOR: {
    MessageValid: 'Must be a valid hex color code',
    MessageRequired: 'Background color required'
  },
  PROMO: {
    MessageValid: 'Must be "true" or "false"'
  }
};
