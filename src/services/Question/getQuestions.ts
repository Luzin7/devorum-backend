import { readFile } from 'fs/promises';

const getQuestions = async (): Promise<void> => {
  const questions = await readFile('./src/data/questions.json', 'utf-8');
  const questionsData = JSON.parse(questions);

  return questionsData;
};

export default getQuestions;
