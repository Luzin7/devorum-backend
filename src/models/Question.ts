class Questions {
  id: number;
  author: string;
  date: number;
  upvotes: number;
  question: object[];

  constructor(
    id: number,
    author: string,
    date: number,
    upvotes: number,
    question: object[],
  ) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.upvotes = upvotes;
    this.question = question;
  }
}

export default Questions;
