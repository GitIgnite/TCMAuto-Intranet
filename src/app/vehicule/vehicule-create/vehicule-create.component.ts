import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModeleService} from '../../api/services/modele.service';
import {VehiculeService} from '../../api/services/vehicule.service';
import {ClientService} from 'src/app/api/services/client.service';
import {BoiteVitesseEnum, ContratEnum, FactureIntermediationEnum} from 'src/app/common/enum/VehiculeEnum';
import {MandatFormKey} from 'src/app/common/form/keys/mandat-form-key';
import {VehiculeFormKey} from 'src/app/common/form/keys/vehicule-form-key';
import {Mandat} from 'src/app/api/models/Mandat';
import {Marque} from 'src/app/api/models/Marque';
import {Vehicule} from 'src/app/api/models/Vehicule';
import {CategorieService} from "../../api/services/categorie.service";
import {EnergieService} from "../../api/services/energie.service";
import {Modele} from "../../api/models/Modele";
import {Categorie} from "../../api/models/Categorie";
import {Energie} from "../../api/models/Energie";
import {Client} from "../../api/models/Client";
import {DatePipe} from "@angular/common";
import {map} from "rxjs/operators";
import {MandatService} from "../../api/services/mandat.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-vehicule-create',
  templateUrl: './vehicule-create.component.html',
  styleUrls: ['./vehicule-create.component.scss']
})
export class VehiculeCreateComponent implements OnInit, AfterViewInit {

  createVehiculeForm! : FormGroup;
  vehiculeFormKey = VehiculeFormKey;
  mandatFormKey = MandatFormKey;
  vehiculeToEdit!: Vehicule;
  isVehiculeToEdit = false;
  mandatToEdit!: Mandat;
  clients: any [] = [];
  marques : Marque [] = [];
  modeles : Modele [] = [];
  categories : Categorie [] = [];
  energies : Energie [] = [];
  pays : any [] = [];
  factureIntermediationSelected = FactureIntermediationEnum.ACHETEUR;
  contratSelected = ContratEnum.INTERMEDIATION;

  //Enum
  contratEnum = ContratEnum;
  boiteVitesseEnum = BoiteVitesseEnum;
  factureIntermediationEnum = FactureIntermediationEnum;
  $mandatObs: Observable<Mandat> = new Subject();


  constructor(private readonly fb: FormBuilder,
              private vehiculeService: VehiculeService,
              public dialogRef: MatDialogRef<VehiculeCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private clientService: ClientService,
              private modeleService: ModeleService,
              private categorieService: CategorieService,
              private energieService: EnergieService,
              private mandatService: MandatService,
              private datepipe: DatePipe
              ) {}

  ngOnInit(): void {
    if(this.data && this.data.vehicule) {
      this.vehiculeToEdit = this.data.vehicule;
      if(this.vehiculeToEdit && this.vehiculeToEdit.id) {
        this.$mandatObs =  this.mandatService.getMandatByVehicule(this.vehiculeToEdit.id);
      }
      this.isVehiculeToEdit =true;
    }
    this.getClients();
    this.initDonneesListeDeroulante();
    this.initBuildCreateVehiculeForm();

  }

  ngAfterViewInit(): void {
    // Rétablissement des données pour une modification du véhicule
    if(this.data && this.data.vehicule) {
      this.editVehiculeFormUpdate();
      this.getMandat()
    }
  }

  initBuildCreateVehiculeForm(): void {
    this.createVehiculeForm = this.fb.group( {
      [this.vehiculeFormKey.VEHICULE] : this.buildFormVehicule(),
      [this.vehiculeFormKey.MANDAT] : this.buildFormMandat()
    })
  }

  buildFormVehicule() : FormGroup {
    return this.fb.group( {
         [this.vehiculeFormKey.MODELE_VEHICULE] : [null,[Validators.required]],
         [this.vehiculeFormKey.MARQUE_VEHICULE] : [null,[Validators.required]],
         [this.vehiculeFormKey.VENDEUR] : [null, [Validators.required]],
         [this.vehiculeFormKey.PRIX_VENTE] : [null, [Validators.required]],
         [this.vehiculeFormKey.PRIX_VENTE_MARCHE] : [null, [Validators.required]],
         [this.vehiculeFormKey.BAREME_PRIX_INTERMEDIAIRE] : [null, [Validators.required]],
         [this.vehiculeFormKey.KILOMETRAGE] : [null],
         [this.vehiculeFormKey.IMMATRICULATION] : [null, [Validators.required]],
         [this.vehiculeFormKey.NUMERO_SERIE] : [null, [Validators.required]],
         [this.vehiculeFormKey.DATE_MISE_CIRCULATION] : [null, [Validators.required]],
         [this.vehiculeFormKey.VERSION] : [null, [Validators.required]],
         [this.vehiculeFormKey.COULEUR_EXT] : [null, [Validators.required]],
         [this.vehiculeFormKey.CONTRAT] : [ContratEnum.INTERMEDIATION],
         [this.vehiculeFormKey.CATEGORIE] : [null],
         [this.vehiculeFormKey.BOITE_VITESSE] : [BoiteVitesseEnum.MANUELLE],
         [this.vehiculeFormKey.NB_VITESSE] : [null],
         [this.vehiculeFormKey.COULEUR_INT] : [null],
         [this.vehiculeFormKey.COULEUR_INT_DETAIL] : [null],
         [this.vehiculeFormKey.COULEUR_EXT_DETAIL] : [null],
         [this.vehiculeFormKey.CO2] : [null],
         [this.vehiculeFormKey.NB_PORTE] : [null],
         [this.vehiculeFormKey.NB_MAIN] : [null],
         [this.vehiculeFormKey.PNEU] : [null],
         [this.vehiculeFormKey.ENERGIE] : [null],
         [this.vehiculeFormKey.ORIGINE] : [null],
         [this.vehiculeFormKey.PUISSANCE_FISCALE] : [null],
         [this.vehiculeFormKey.PUISSANCE_REEL] : [null],
         [this.vehiculeFormKey.NB_PLACE] : [null]
       })
  }

  buildFormMandat() : FormGroup {
    return this.fb.group( {
      [this.mandatFormKey.ACHETEUR] : [null],
      [this.mandatFormKey.DATE_SIGNATURE_MANDAT] : [null],
      [this.mandatFormKey.ORIGINE_MANDAT] : [null],
      [this.mandatFormKey.LIEU_SIGNATURE] : [null],
      [this.mandatFormKey.KM_ENTREE_MANDAT] : [null],
      [this.mandatFormKey.CLIENT_FACTURE] : [FactureIntermediationEnum.ACHETEUR],
      [this.mandatFormKey.GARANTIE_1] : [null],
      [this.mandatFormKey.GARANTIE_2] : [null],
      [this.mandatFormKey.DUREE_GARANTIE_1] : [null]
    })
  }

  /**
   * Methode utilisée lors de la modification d'un véhicule pour mettre une valeur par défaut pour les différents champs.
   */
  editVehiculeFormUpdate(): void {
    if(this.vehiculeToEdit) {
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.VENDEUR)?.setValue(this.getClientById(this.vehiculeToEdit?.client?.id));
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.DATE_MISE_CIRCULATION)?.setValue(this.vehiculeToEdit.dateMiseCirculation ? this.datepipe.transform(this.vehiculeToEdit.dateMiseCirculation, 'yyyy-MM-dd') : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.KILOMETRAGE)?.setValue(this.vehiculeToEdit.kilometrage ? this.vehiculeToEdit.kilometrage : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.PRIX_VENTE)?.setValue(this.vehiculeToEdit.prixVente ? this.vehiculeToEdit.prixVente : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.NUMERO_SERIE)?.setValue(this.vehiculeToEdit.numeroSerie ? this.vehiculeToEdit.numeroSerie : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.VERSION)?.setValue(this.vehiculeToEdit.versionVehicule ? this.vehiculeToEdit.versionVehicule : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.COULEUR_INT)?.setValue(this.vehiculeToEdit.couleurInt ? this.vehiculeToEdit.couleurInt : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.COULEUR_INT_DETAIL)?.setValue(this.vehiculeToEdit.couleurIntDetail ? this.vehiculeToEdit.couleurIntDetail : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.COULEUR_EXT)?.setValue(this.vehiculeToEdit.couleurExt ? this.vehiculeToEdit.couleurExt : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.COULEUR_EXT_DETAIL)?.setValue(this.vehiculeToEdit.couleurExtDetail ? this.vehiculeToEdit.couleurExtDetail : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.NB_VITESSE)?.setValue(this.vehiculeToEdit.nbVitesse ? this.vehiculeToEdit.nbVitesse : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.CONTRAT)?.setValue(this.vehiculeToEdit.contrat ? this.vehiculeToEdit.contrat : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.CO2)?.setValue(this.vehiculeToEdit.co2 ? this.vehiculeToEdit.co2 : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.NB_PORTE)?.setValue(this.vehiculeToEdit.nbPorte ? this.vehiculeToEdit.nbPorte : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.NB_MAIN)?.setValue(this.vehiculeToEdit.nbMain ? this.vehiculeToEdit.nbMain : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.NB_PLACE)?.setValue(this.vehiculeToEdit.nbPlace ? this.vehiculeToEdit.nbPlace : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.PNEU)?.setValue(this.vehiculeToEdit.pneu ? this.vehiculeToEdit.pneu : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.PUISSANCE_FISCALE)?.setValue(this.vehiculeToEdit.puissanceFiscale ? this.vehiculeToEdit.puissanceFiscale : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.PUISSANCE_REEL)?.setValue(this.vehiculeToEdit.puissanceReel ? this.vehiculeToEdit.puissanceReel : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.CONTRAT)?.setValue(null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.ORIGINE)?.setValue(this.vehiculeToEdit.origine ? this.vehiculeToEdit.origine : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.BAREME_PRIX_INTERMEDIAIRE)?.setValue(this.vehiculeToEdit.baremePrixIntermediation ? this.vehiculeToEdit.baremePrixIntermediation : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.PRIX_VENTE_MARCHE)?.setValue(this.vehiculeToEdit.prixVenteMarche ? this.vehiculeToEdit.prixVenteMarche : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.IMMATRICULATION)?.setValue(this.vehiculeToEdit.immatriculation ? this.vehiculeToEdit.immatriculation : null);

      // IMPORTANT -- Le reste des données concerne les listes : elles sont définis dans chaque chargement des listes

      if(this.vehiculeToEdit?.boiteVitesse) {
        const boiteVitesse = this.vehiculeToEdit.boiteVitesse as BoiteVitesseEnum;
        this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.BOITE_VITESSE)?.setValue(boiteVitesse);
      }

      if(this.vehiculeToEdit?.contrat) {
        const contrat = this.vehiculeToEdit.contrat as ContratEnum;
        this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.CONTRAT)?.setValue(contrat);
      }
    }
  }
  editMandatFormUpdate(): void {
    if(this.mandatToEdit) {
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.ACHETEUR)?.setValue(this.getClientById(this.mandatToEdit?.acheteur?.id));
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.DATE_SIGNATURE_MANDAT)?.setValue(this.mandatToEdit.dateSignature ? this.datepipe.transform(this.mandatToEdit.dateSignature, 'yyyy-MM-dd') : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.ORIGINE_MANDAT)?.setValue(this.mandatToEdit.origineMandat ? this.mandatToEdit.origineMandat : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.LIEU_SIGNATURE)?.setValue(this.mandatToEdit.lieuSignature ? this.mandatToEdit.lieuSignature : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.KM_ENTREE_MANDAT)?.setValue(this.mandatToEdit.kmEntreeMandat ? this.mandatToEdit.kmEntreeMandat : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.GARANTIE_1)?.setValue(this.mandatToEdit.garantie1 ? this.mandatToEdit.garantie1 : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.GARANTIE_2)?.setValue(this.mandatToEdit.garantie2 ? this.mandatToEdit.garantie2 : null);
      this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.DUREE_GARANTIE_1)?.setValue(this.mandatToEdit.dureeGarantie1 ? this.mandatToEdit.dureeGarantie1 : null);

      if(this.mandatToEdit.clientFacture) {
        const factureIntermediation = this.mandatToEdit.clientFacture as FactureIntermediationEnum;
        this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.CLIENT_FACTURE)?.setValue(factureIntermediation);
      }
    }
  }

  getMandat(): void {
      this.$mandatObs.pipe().subscribe(mandat => {
        this.mandatToEdit = mandat;
        if(mandat && this.createVehiculeForm && this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)) {
          this.editMandatFormUpdate();
        }
      });
  }

  initDonneesListeDeroulante(): void {
    this.modeleService.getMarqueAll().pipe().subscribe( marques => {
      this.marques = marques;

      if(this.vehiculeToEdit) {
        this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.MARQUE_VEHICULE)?.setValue(this.getMarqueById(this.vehiculeToEdit?.marque?.id));
        this.getModeleByMarque(this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.MARQUE_VEHICULE)?.value);
      }
    })

    this.categorieService.getCategories().pipe().subscribe(categories => {
      this.categories = categories;

      if(this.vehiculeToEdit) {
        this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.CATEGORIE)?.setValue(this.getCategorieById(this.vehiculeToEdit?.categorie?.id));
      }
    })

    this.energieService.getEnergies().pipe().subscribe(energies => {
      this.energies = energies;

      if(this.vehiculeToEdit) {
        this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.ENERGIE)?.setValue(this.getEnergieById(this.vehiculeToEdit?.energie?.id));
      }
    })

  }

  createVehicule(): void {
    let vehicule : Vehicule = this.createVehiculeForm?.get(VehiculeFormKey.VEHICULE)?.value;
    let mandat: Mandat = this.createVehiculeForm?.get(VehiculeFormKey.MANDAT)?.value;

    let type ='SAVE';

    if(this.vehiculeToEdit) {
      vehicule.id = this.vehiculeToEdit.id;
      type = 'EDIT';
    } else {
      type = 'SAVE';
    }

    this.vehiculeService.createVehicule(vehicule).pipe(
      map(vehicule => {
        if(mandat) {
          mandat.vehicule = vehicule;
          this.mandatService.createMandat(mandat).subscribe();
        }
        return vehicule;
      })
    ).subscribe(vehicule => {
      this.vehiculeToEdit = vehicule;
      this.dialogRef.close({
        type:type,
        vehicule: vehicule
      })
    })
  }

  getClients() : void {
    this.clientService.getAll().pipe().subscribe( clients => {
      this.clients = clients;

      if(this.vehiculeToEdit) {
        this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.VENDEUR)?.setValue(this.getClientById(this.vehiculeToEdit?.client?.id));
      }
      if(this.mandatToEdit) {
        this.createVehiculeForm.get(this.vehiculeFormKey.MANDAT)?.get(this.mandatFormKey.ACHETEUR)?.setValue(this.getClientById(this.mandatToEdit?.acheteur?.id));
      }
    })
  }

  getModeleByMarque( marque: Marque) {
    this.modeleService.getModeleByMarqueId(marque.id).pipe().subscribe( modeles => {
      this.modeles = modeles;

      if(this.vehiculeToEdit) {
        this.createVehiculeForm.get(this.vehiculeFormKey.VEHICULE)?.get(this.vehiculeFormKey.MODELE_VEHICULE)?.setValue(this.getModeleById(this.vehiculeToEdit?.modele?.id));
      }

    })
  }

  annulerCreationVehicule(): void {
    this.dialogRef.close()
  }

  isFactureIntermediationSelected(value: string): boolean {
    return value == this.factureIntermediationSelected;
  }

  isContratSelected(value: string): boolean {
    return value == this.contratSelected;
  }

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //---------------- Fonction recupe données Edit vehicule ---------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------

  getClientById(id: string | undefined): Client {
    return id ? this.clients.find(client => id === client.id) : null;
  }

  getMarqueById(id: string | undefined): Marque | undefined | null {
    return id ? this.marques.find(marque => id === marque.id) : null;
  }

  getModeleById(id: string | undefined): Modele | undefined | null {
    return id ? this.modeles.find(modele => id === modele.id) : null;
  }

  getCategorieById(id: string | undefined): Categorie | undefined | null {
    return id ? this.categories.find(categorie => id === categorie.id) : null;
  }

  getEnergieById(id: string | undefined): Energie | undefined | null {
    return id ? this.energies.find(energie => id === energie.id) : null;
  }
}
