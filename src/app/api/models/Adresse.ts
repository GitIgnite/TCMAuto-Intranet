export class Adresse {

  adresse?: string;
  numero?: string;
  rue?: string;
  codePostal?: string;
  ville?: string;


  constructor(adresse?: string, numero?: string, rue?: string, codePostal?: string, ville?: string) {
    this.adresse = adresse;
    this.numero = numero;
    this.rue = rue;
    this.codePostal = codePostal;
    this.ville = ville;
  }
}
