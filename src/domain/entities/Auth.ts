export class UserRecord {
  username: string;
  password?: string;
  publicKey: string;
  createdAt: string;

  constructor(username: string, password: string, publicKey = '') {
    this.username = username;
    this.password = password;
    this.publicKey = publicKey;
    this.createdAt = new Date().toLocaleString();
  }
}
