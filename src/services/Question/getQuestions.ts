import { readFile } from 'fs/promises';
import { ContentDataProps } from '../../types';

const getQuestions = async (): Promise<ContentDataProps> => {
  const questionsData: ContentDataProps = JSON.parse(
    await readFile('./src/data/questions.json', 'utf-8'),
  );

  return questionsData;
};

export default getQuestions;
