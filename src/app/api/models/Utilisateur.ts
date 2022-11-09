export class Utilisateur {
  id?: string;
  username?: string;
  email?: string;
  roles?: any[];


  constructor(id?: string, username?: string, email?: string, roles ?: any[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

}
