// Generates a random number between two values
function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export default generateRandomNumber;
