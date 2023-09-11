import { readFile, writeFile } from 'fs/promises';
import Question from '../../models/Question';
import { ContentDataProps } from '../../types';

const deleteComment = async (
  commentId: string,
  questionId: string,
): Promise<void> => {
  const questionsData: ContentDataProps = JSON.parse(
    await readFile('./src/data/questions.json', 'utf-8'),
  );

  const { questions } = questionsData;

  const questionIndex = questions.findIndex(
    (question: Question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error('Question does not exist');
  }

  const commentIndex = questions[questionIndex].comments.findIndex(
    (comment) => comment.id === commentId,
  );

  if (commentIndex === -1) {
    throw new Error('Comment does not exist for this question');
  }

  questions[questionIndex].comments.splice(commentIndex, 1);

  await writeFile(
    './src/data/questions.json',
    JSON.stringify(questionsData, null, 2),
    { encoding: 'utf-8' },
  );
};

export default deleteComment;
