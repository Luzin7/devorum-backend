class Questions {
  id: number;
  author: string;
  date: number;
  upvotes: number;
  question: [{}];

  constructor(id: number, author: string, date: number,
    upvotes: number, comments: [{}]) {
      this.id = id,
      this.author = author,
      this.date = date,
      this.upvotes = upvotes,
      this.question = [{}]
  }
};

export default Questions;