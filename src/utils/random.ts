export const generateRandomValue = (min: number, max:number, digitsAfterPoint = 0): number =>
  Number((Math.random() * (max - min) + min).toFixed(digitsAfterPoint));

export const getRandomItems = <T>(array: T[], probability = 0):T[] => array.filter(() => Math.round(Math.random() + probability) === 1);

export const getRandomItem = <T>(array: T[]):T => array[generateRandomValue(0, array.length - 1)];
