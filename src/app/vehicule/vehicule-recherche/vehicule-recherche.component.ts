import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {VehiculeFormKey} from 'src/app/common/form/keys/vehicule-form-key';
import {Marque} from 'src/app/api/models/Marque';
import {ModeleService} from '../../api/services/modele.service';
import {Modele} from 'src/app/api/models/Modele';
import {VehiculeService} from "../../api/services/vehicule.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Vehicule} from "../../api/models/Vehicule";
import {ClientCreateComponent} from "../../client/client-create/client-create.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../../common/form/keys/message-keys";
import {Categorie} from "../../api/models/Categorie";
import {CategorieService} from "../../api/services/categorie.service";
import {Energie} from "../../api/models/Energie";
import {EnergieService} from "../../api/services/energie.service";
import {BoiteVitesseEnum} from "../../common/enum/VehiculeEnum";
import {VehiculePhotoService} from "../../api/services/vehiculePhoto.service";
import {VehiculePhoto} from "../../api/models/vehiculePhoto";

@Component({
  selector: 'app-vehicule-recherche',
  templateUrl: './vehicule-recherche.component.html',
  styleUrls: ['./vehicule-recherche.component.scss']
})
export class VehiculeRechercheComponent implements OnInit, OnDestroy {

  rechercheVehiculeForm!: UntypedFormGroup;
  vehiculeFormKey = VehiculeFormKey;
  marques: Marque[] = [];
  modeles: Modele[] = [];
  categories: Categorie[] = [];
  energies: Energie[] = [];
  vehicules: Vehicule[] = [];
  messageFormKeys = MessageKeys;
  boiteVitesseEnum = BoiteVitesseEnum;

  paginator!: MatPaginator;
  pageIndex: any = 0;
  pageSize: any = 5;
  length: any;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  sortBy!: Sort;
  pageSort!: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.pageSort = ms;
  }

  afficherDetail: boolean = false;
  vehiculeDetail!: Vehicule;

  constructor(private readonly fb: UntypedFormBuilder,
              private modeleService: ModeleService,
              private categorieService: CategorieService,
              private energieService: EnergieService,
              private vehiculeService: VehiculeService,
              private readonly dialog: MatDialog,
              private readonly _snackBar: MatSnackBar,
              private readonly vehiculePhotoService: VehiculePhotoService) {
  }

  ngOnInit(): void {
    this.initBuildRechercheVehiculeForm();
    this.initDonneesListeDeroulante();
    this.getVehiculesByRecherche();
    this.onChange();
  }

  ngOnDestroy() {
  }

  private initDonneesListeDeroulante(): void {
    this.modeleService.getMarqueAll().pipe().subscribe(marques => {
      this.marques = marques;
    })

    this.categorieService.getCategories().pipe().subscribe(categories => {
      this.categories = categories;
    })

    this.energieService.getEnergies().pipe().subscribe(energies => {
      this.energies = energies;
    })

  }

  onChange() {
    this.rechercheVehiculeForm.get(this.vehiculeFormKey.MARQUE_VEHICULE)?.valueChanges?.pipe().subscribe(value => {
      if (value) {
        this.getModeleByMarque(value);
      } else {
        this.modeles = [];
      }
    })
  }

  getModeleByMarque(marqueId: string) {
    this.modeleService.getModeleByMarqueId(marqueId).pipe().subscribe(modeles => {
      this.modeles = modeles;
      this.rechercheVehiculeForm.get(this.vehiculeFormKey.MODELE_VEHICULE)?.setValue(null);
    })
  }

  getVehiculesByRecherche(): void {
    let vehiculeSearchFormData: any = this.rechercheVehiculeForm.value;

    this.vehiculeService.getVehiculeByRecherche(vehiculeSearchFormData, this.sortBy, this.pageSize, this.pageIndex).pipe().subscribe(data => {
      this.vehicules = data.content;

      if(!this.paginator) {
        this.paginator = data.pageable;
      }

      this.paginator.length = data.totalElements;
      this.paginator.pageIndex = data.pageable.pageNumber;
      this.paginator.pageSize = data.pageable.pageSize;
      this.sortBy = data.pageSort;
    })
  }

  public sort(event: any) {
    this.sortBy = event;
    this.getVehiculesByRecherche();
  }

  initBuildRechercheVehiculeForm(): void {
    this.rechercheVehiculeForm = this.fb.group({
      [this.vehiculeFormKey.MODELE_VEHICULE]: [null],
      [this.vehiculeFormKey.MARQUE_VEHICULE]: [null],
      [this.vehiculeFormKey.CATEGORIE]: [null],
      [this.vehiculeFormKey.ENERGIE]: [null],
      [this.vehiculeFormKey.BOITE_VITESSE]: [null],
      [this.vehiculeFormKey.PRIX_MIN]: [null],
      [this.vehiculeFormKey.PRIX_MAX]: [null],
      [this.vehiculeFormKey.KILOMETRAGE_MIN]: [null],
      [this.vehiculeFormKey.KILOMETRAGE_MAX]: [null],
      [this.vehiculeFormKey.KILOMETRAGE_MAX]: [null]
    })
  }

  editVehicule(vehicule: Vehicule) {
    return this.dialog.open(ClientCreateComponent, {
      width: '700px',
      disableClose: false,
      data: {
        vehicule: vehicule
      }
    }).afterClosed().subscribe(result => {
      if (result && result.type && result.type === 'EDIT') {
        this._snackBar.open(this.messageFormKeys.EDIT_VEHICULE, 'OK');
        // TODO Voir s'il est nécessaire de recharcher les clients
        this.getVehiculesByRecherche();
      }
    });
  }

  reinitialiserChamps(): void {
    this.rechercheVehiculeForm.reset();
  }

  public majPaginatorRecherche(event: any) {
    this.pageIndex = event.pageIndex;

    // si on change la taille => on remet l'index à 0
    if (this.pageSize !== event.pageSize) {
      this.pageIndex = 0;
    }
    this.pageSize = event.pageSize;
    // appel de la recherche
    this.getVehiculesByRecherche();
  }

  public afficherDetailVehicule(vehicule:Vehicule) {
    this.vehiculeDetail = vehicule;
    this.afficherDetail = true;
  }

  public deleteVehicule(vehiculeToDelete:Vehicule) {
    let vehiculeFound = this.vehicules.findIndex(vehicule => vehicule.id == vehiculeToDelete.id);
    if(vehiculeFound) {
      this.vehicules.splice(vehiculeFound,1);
    }
  }

  public cacherDetail(vehiculeReturned: Vehicule) {
    this.afficherDetail = false;
    let vehiculeToUpdate = this.vehicules.find((vehicule: Vehicule) => vehicule.id == vehiculeReturned.id)
    if(vehiculeToUpdate) {
      let index = this.vehicules.indexOf(vehiculeToUpdate);
      this.vehicules[index] = vehiculeToUpdate;
    }
  }
}
