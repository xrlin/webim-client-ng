export class User {
  id: number;
  name: string;
  avatar: string;

  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.name = obj && obj.name;
    this.avatar = obj && obj.avatarURL;
  }
}
