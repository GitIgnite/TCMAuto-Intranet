export class Client {
  id?: string;
  nom?: string;
  prenom?: string;
  dateNaissance?: string | null;
  telephone?: string;
  email?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  note?: string;
  numPieceIdentite?: string;


  constructor(id?: string, nom?: string, prenom?: string, dateNaissance?: string, telephone?: string, email?: string, adresse?: string, ville?: string, codePostal?: string, note?: string, numPieceIdentite?: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
    this.telephone = telephone;
    this.email = email;
    this.adresse = adresse;
    this.ville = ville;
    this.codePostal = codePostal;
    this.note = note;
    this.numPieceIdentite = numPieceIdentite;
  }

  public static dataFormToModel(init?: Partial<Client>): Client {
    let client: Client = Object.assign(new Client(), init);
    client.nom = client && client.nom ? client.nom.trim().toUpperCase(): '';
    client.ville = client && client.ville ? client.ville.trim().toUpperCase(): '';
    client.numPieceIdentite = client && client.numPieceIdentite ? client.numPieceIdentite.trim().toUpperCase(): '';
    return client;
  }
}
