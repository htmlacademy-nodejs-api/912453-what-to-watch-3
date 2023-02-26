export const COMMENT_DEFAULT = {
  COMMENTS_COUNT: 50
};

export const COMMENT_VALIDATION = {
  MESSAGE: {
    MinLength: 5,
    MaxLength: 1024,
    MessageValid: 'Comment must be 5-1024 characters long',
    MessageRequired: 'Message required'
  },
  RATING: {
    Min: 1,
    Max: 10,
    MessageValid: 'Rating must be an integer from 1 to 10',
    MessageRequired: 'Rating required'
  },
  USER_ID: {
    MessageValid: 'UserId must be a valid MongoId'
  },
  MOVIE_ID: {
    MessageValid: 'MovieId must be a valid MongoId'
  }
};
