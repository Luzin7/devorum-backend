class Question {
  date: number;
  id: string;
  author: string;
  question: string;
  upvotes: number;
  comments: string[];

  constructor(
    date: number,
    id: string,
    author: string,
    question: string,
    upvotes: number,
  ) {
    this.date = date;
    this.id = id;
    this.author = author;
    this.question = question;
    this.upvotes = upvotes;
    this.comments = [];
  }
}

export default Question;
