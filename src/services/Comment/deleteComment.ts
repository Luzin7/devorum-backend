import { readFile, writeFile } from 'fs/promises';
import Question from '../../models/Question';
import Comment from '../../models/Comment';

const deleteComment = async (
  commentId: string,
  questionId: string,
): Promise<void> => {
  const questions = await readFile('./src/data/questions.json', 'utf-8');
  const questionsData = JSON.parse(questions);

  const questionIndex = questionsData.findIndex(
    (question: Question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error('Question does not exist');
  }

  const commentIndex = questionsData[questionIndex].comments.findIndex(
    (comment: Comment) => comment.id === commentId,
  );

  if (commentIndex === -1) {
    throw new Error('Comment does not exist for this question');
  }

  questionsData[questionIndex].comments.splice(commentIndex, 1);

  await writeFile(
    './src/data/questions.json',
    JSON.stringify(questionsData, null, 2),
    { encoding: 'utf-8' },
  );
};

export default deleteComment;
