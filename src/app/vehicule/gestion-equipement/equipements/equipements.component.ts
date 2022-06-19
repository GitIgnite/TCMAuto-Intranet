import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipement } from 'src/app/api/models/Equipement';
import { GroupeEquipement } from 'src/app/api/models/GroupeEquipement';
import { VehiculeEquipement } from 'src/app/api/models/VehiculeEquipement';
import { EquipementService } from 'src/app/api/services/equipement.service';
import { VehiculeEquipementService } from 'src/app/api/services/vehiculeEquipement.service';
import { VariablesGlobales } from 'src/app/variablesGlobales';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.scss']
})

export class EquipementsComponent implements OnInit {

  @Input()
  vehiculeData: any;

  @Output() vehiculeEquipementsChange = new EventEmitter<VehiculeEquipement[]>();

  groupeEquipements: GroupeEquipement[] = [];
  vehiculeEquipements: VehiculeEquipement[] = [];
  createVehiculeEquipement: VehiculeEquipement[] = [];

  constructor(private equipementService: EquipementService, private vehiculeEquipementService: VehiculeEquipementService, private variablesGlobales: VariablesGlobales) {
   }

  ngOnInit(): void {
    this.initDonneesEquipement();
    this.initDonneesVehiculeEquipement();
  }

  initDonneesEquipement() {
    this.equipementService.getGroupeEquipementAll().pipe().subscribe(groupeEquipements => {
      this.groupeEquipements = groupeEquipements;
    })
  }

  initDonneesVehiculeEquipement() {
    this.vehiculeEquipementService.getEquipementByVehiculeId(this.vehiculeData.id).pipe().subscribe(vehiculeEquipement => {
      this.vehiculeEquipements = vehiculeEquipement;

      this.vehiculeEquipements.forEach(vehiculEquipement => {
        if (vehiculeEquipement) {
          !this.variablesGlobales.alreadyToPass && this.variablesGlobales.listEquipementchecked.push(vehiculEquipement.equipement);
        }
      });
      this.variablesGlobales.alreadyToPass = true;
    });
  }

  gestionEquipementDuVehicule(event: any, equipement: Equipement) {
    var alreadyAdd = false;
    if(this.variablesGlobales.listEquipementchecked.length != 0) {
      this.variablesGlobales.listEquipementchecked.some((el, index) => {
        el.id === equipement.id ? alreadyAdd = true : alreadyAdd = false
        if (alreadyAdd && event.source._checked === false) {
          this.variablesGlobales.listEquipementchecked.splice(index,1);
        }
      });
    }

    if (!alreadyAdd && event.source._checked === true) {
      this.variablesGlobales.listEquipementchecked.push(equipement);
    }

    if(this.variablesGlobales.listEquipementchecked.length != 0) {
      this.createVehiculeEquipement = [];
      this.variablesGlobales.listEquipementchecked.forEach(equipement => {
        this.createVehiculeEquipement.push({vehicule: this.vehiculeData, equipement: equipement})
      })
    }
    this.vehiculeEquipementsChange.emit(this.createVehiculeEquipement);
  }

  initEquipementCheck(equipement: Equipement): boolean {
    let checked = false;
    this.variablesGlobales.listEquipementchecked.forEach(equipementEnBase => {
      if(equipement.id === equipementEnBase.id) {
        checked = true;
      }
    })
    return checked;
  }
}
