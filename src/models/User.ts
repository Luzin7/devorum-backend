class Users {
  date: number;
  id: number;
  name: string;
  password: string;
  contact: string;
  question: string[];

  constructor(id: number, name: string, password: string) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}

export default Users;
