import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vehicule} from "../../api/models/Vehicule";

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

  constructor() { }

  ngOnInit(): void {
  }

  public afficherDetailVehicule(vehicule: Vehicule) {
    this.afficherDetailEmit.emit(vehicule);
  }
}
