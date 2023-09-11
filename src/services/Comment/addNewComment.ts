import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../../models/Comment';
import { ContentDataProps } from '../../types';

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
  const usersData: ContentDataProps = JSON.parse(
    await readFile('./src/data/users.json', 'utf-8'),
  );
  const questionsData: ContentDataProps = JSON.parse(
    await readFile('./src/data/questions.json', 'utf-8'),
  );

  const { users } = usersData;
  const { questions } = questionsData;

  const questionIndex = questions.findIndex(
    (question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error('Question does not exist');
  }

  const userIndex = users.findIndex((user) => user.id === authorId);
  const authorName = users[userIndex].name;

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

  questions[questionIndex].comments.push(newComment);

  await writeFile(
    './src/data/questions.json',
    JSON.stringify(questionsData, null, 2),
    { encoding: 'utf-8' },
  );
};

export default addNewComment;
