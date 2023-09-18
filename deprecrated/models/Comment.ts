class Comment {
  created_at: number;
  id: string;
  author_id: string;
  author_name: string;
  question_id: string;
  comment: string;

  constructor(
    created_at: number,
    id: string,
    author_id: string,
    author_name: string,
    comment: string,
    question_id: string,
  ) {
    this.created_at = created_at;
    this.id = id;
    this.author_id = author_id;
    this.author_name = author_name;
    this.question_id = question_id;
    this.comment = comment;
  }
}

export default Comment;
