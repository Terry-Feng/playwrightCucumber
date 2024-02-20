import * as fs from 'fs';
import * as util from 'util';

function getRandomDate(): { year: string; month: string; date: string } {
  const startDate = new Date('1970-01-01').getTime();
  const endDate = new Date('2000-01-01').getTime();
  const randomTime = Math.random() * (endDate - startDate) + startDate;

  const randomDate = new Date(randomTime);

  const year = randomDate.getFullYear().toString();
  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const date = randomDate.getDate().toString().padStart(2, '0');

  return { year, month, date };
}

function getRandomAlphabets(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    result += alphabet[randomIndex];
  }

  return result;
}

function getRandomIntWithDigits(digits: number): number {
  if (digits <= 0) {
    throw new Error('Digits must be greater than 0');
  }

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const readFile = util.promisify(fs.readFile);
//const writeFile = util.promisify(fs.writeFile);

async function areFilesIdentical(file1Path: string, file2Path: string): Promise<boolean> {
  try {
    const [file1Content, file2Content] = await Promise.all([
      readFile(file1Path, 'utf-8'),
      readFile(file2Path, 'utf-8'),
    ]);

    const normalize = (str: string) =>
      str
        .replace(/\r/g, '') // Normalize line endings to '\r'
        .replace(/\n/g, '') // Normalize line endings to '\n'
        .replace(/,/g, '') // Replace all , to avoid the prettier issue
        .replace(/\s+/g, '') // Replace all white spaces
        .trim(); // Trim leading/trailing white spaces

    // Debug: Write normalized content to files
    //await writeFile('normalizedFile1.txt', normalize(file1Content), 'utf-8');
    //await writeFile('normalizedFile2.txt', normalize(file2Content), 'utf-8');

    const isIdentical = normalize(file1Content) === normalize(file2Content);
    console.log(`Are files identical? ${isIdentical}`);
    return isIdentical;
  } catch (err) {
    console.error(`An error occurred: ${err}`);
    return false;
  }
}

export {
  getRandomDate,
  getRandomAlphabets,
  getRandomIntWithDigits,
  areFilesIdentical,
};
