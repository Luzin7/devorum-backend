class Users {
  date: number;
  id: number;
  name: string;
  password: string;
  contact: string;
  question: [];

  constructor(
    date: number,
    id:number,
    name:string,
    password: string,
    contact: string,
    question: []
    ) {
      this.date = date,
      this.id = id,
      this.name = name,
      this.password = password,
      this.contact = contact,
      this.question =[]
  }
};

export default Users;