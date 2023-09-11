class User {
  date: number;
  id: string;
  name: string;
  password: string;
  salt: string;
  contact: string;
  questions?: string[];

  constructor(
    date: number,
    id: string,
    name: string,
    password: string,
    contact: string,
    salt: string = '',
  ) {
    this.date = date;
    this.id = id;
    this.name = name;
    this.password = password;
    this.salt = salt;
    this.contact = contact;
    this.questions = [];
  }
}

export default User;
