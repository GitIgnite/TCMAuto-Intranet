import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vehicule} from "../../api/models/Vehicule";
import {VehiculeService} from "../../api/services/vehicule.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../../common/form/keys/message-keys";

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './vehicule-resultat-recherche.component.html',
  styleUrls: ['./vehicule-resultat-recherche.component.scss']
})
export class VehiculeResultatRechercheComponent implements OnInit {

  @Input()
  vehicules: Vehicule[] = [];

  @Input()
  afficherDetail: boolean = false;

  @Output() afficherDetailEmit = new EventEmitter<Vehicule>();

  messageFormKeys = MessageKeys;

  constructor(private vehiculeService: VehiculeService,
              private readonly _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public afficherDetailVehicule(vehicule: Vehicule) {
    this.afficherDetailEmit.emit(vehicule);
  }

  public deleteVehicule(vehiculeToDelete: Vehicule) {
    if (vehiculeToDelete && vehiculeToDelete.id) {
      let confirmSupprimer = window.confirm("Etes-vous sûr de vouloir supprimer le véhicule?");
      if (confirmSupprimer) {
        this.vehiculeService.deleteVehicule(vehiculeToDelete.id).subscribe(() => {
          let vehiculeFound = this.vehicules.findIndex(vehicule => vehicule.id == vehiculeToDelete.id);
          if (vehiculeFound) {
            this.vehicules.splice(vehiculeFound, 1);
          }
          this._snackBar.open(this.messageFormKeys.DELETE_VEHICULE, 'OK');
        });
      }
    }
  }
}
