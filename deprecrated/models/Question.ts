class Question {
  create_at: number;
  id: string;
  author_id: string;
  author_name: string;
  title: string;
  question: string;

  constructor(
    create_at: number,
    id: string,
    author_id: string,
    author_name: string,
    title: string,
    question: string,
  ) {
    this.create_at = create_at;
    this.id = id;
    this.author_id = author_id;
    this.author_name = author_name;
    this.title = title;
    this.question = question;
  }
}

export default Question;
