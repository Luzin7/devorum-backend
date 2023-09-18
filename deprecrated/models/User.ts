class User {
  created_at: number;
  id: string;
  name: string;
  password: string;
  salt: string;
  contact: string;

  constructor(
    created_at: number,
    id: string,
    name: string,
    password: string,
    contact: string,
    salt: string = '',
  ) {
    this.created_at = created_at;
    this.id = id;
    this.name = name;
    this.password = password;
    this.salt = salt;
    this.contact = contact;
  }
}

export default User;
