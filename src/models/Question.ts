import Comment from './Comment';

class Question {
  date: number;
  id: string;
  authorId: string;
  author: string;
  question: string;
  upvotes: number;
  comments: Comment[];

  constructor(
    date: number,
    id: string,
    authorId: string,
    author: string,
    question: string,
    upvotes: number,
  ) {
    this.date = date;
    this.id = id;
    this.authorId = authorId;
    this.author = author;
    this.question = question;
    this.upvotes = upvotes;
    this.comments = [];
  }
}

export default Question;
