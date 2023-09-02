class Question {
  id: string;
  author: string;
  questionText: string;
  date: number;
  upvotes: number;
  comment: object[];

  constructor(
    id: string,
    author: string,
    date: number,
    upvotes: number,
    comment: object[],
  ) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.upvotes = upvotes;
    this.comment = comment;
  }
}

export default Question;
