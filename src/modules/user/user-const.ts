export const USER_VALIDATION = {
  NAME: {
    MessageValid: 'Name must be 1-15 characters long',
    MessageRequired: 'Name required',
    Min: 1,
    Max: 15
  },
  PASSWORD: {
    MessageValid: 'Password must be 6-12 characters long',
    MessageRequired: 'Password required',
    Min: 6,
    Max: 12
  },
  EMAIL: {
    MessageValid: 'Email must be a valid address',
    MessageRequired: 'Email required'
  },
  AVATAR: {
    MessageValid: 'Must be a link to *.jpg or *.png file'
  }
};

export const JWT_ALGORITM = 'HS256';
