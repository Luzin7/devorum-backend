import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import Question from '../../models/Question';
import User from '../../models/User';
import Comment from '../../models/Comment';

type CommentProps = {
  comment: string;
  authorId: string;
  questionId: string;
};

const addNewComment = async ({
  comment,
  authorId,
  questionId,
}: CommentProps): Promise<void> => {
  const questions = await readFile('./src/data/questions.json', 'utf-8');
  const users = await readFile('./src/data/users.json', 'utf-8');
  const usersData = JSON.parse(users);

  const questionsData = JSON.parse(questions);

  const questionIndex = questionsData.findIndex(
    (question: Question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error('Question does not exist');
  }

  const authorName = usersData.find((user: User) => user.id === authorId).name;

  if (authorName === undefined) {
    throw new Error('User does not exists');
  }

  const newCommentId = uuidv4();
  const currentTime = new Date().getTime();

  const newComment = new Comment(
    currentTime,
    newCommentId,
    authorId,
    authorName,
    comment,
  );

  questionsData[questionIndex].comments.push(newComment);

  await writeFile(
    './src/data/questions.json',
    JSON.stringify(questionsData, null, 2),
    { encoding: 'utf-8' },
  );
};

export default addNewComment;
