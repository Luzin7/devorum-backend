class Comment {
  date: number;
  id: string;
  authorId: string;
  author: string;
  comment: string;
  upvotes: number;

  constructor(
    date: number,
    id: string,
    authorId: string,
    author: string,
    comment: string,
  ) {
    this.date = date;
    this.id = id;
    this.authorId = authorId;
    this.author = author;
    this.comment = comment;
    this.upvotes = 0;
  }
}

export default Comment;
