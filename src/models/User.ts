class User {
  date: string;
  id: string;
  name: string;
  password: string;
  contact: string;
  question: string[];

  constructor(
    date: string,
    id: string,
    name: string,
    password: string,
    contact: string,
    question: string[],
  ) {
    this.date = date;
    this.id = id;
    this.name = name;
    this.password = password;
    this.contact = contact;
    this.question = question;
  }
}

export default User;
