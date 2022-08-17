import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Equipement } from 'src/app/api/models/Equipement';
import { GroupeEquipement } from 'src/app/api/models/GroupeEquipement';
import { EquipementService } from 'src/app/api/services/equipement.service';
import { EquipementFormKey } from 'src/app/common/form/keys/equipement-form-key';

@Component({
  selector: 'app-equipement-additionnels',
  templateUrl: './equipement-additionnels.component.html',
  styleUrls: ['./equipement-additionnels.component.scss']
})
export class EquipementAdditionnelsComponent implements OnInit {

  createEquipementForm!: UntypedFormGroup;
  equipementFormKey = EquipementFormKey;
  groupeEquipements: GroupeEquipement[] = [];
  constructor(private readonly fb: UntypedFormBuilder, private equipementService: EquipementService, public dialogRef: MatDialogRef<EquipementAdditionnelsComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initBuildCreateEquipementForm();
    this.equipementService.getGroupeEquipementAll().pipe().subscribe(groupeEquipements => {
      this.groupeEquipements = groupeEquipements;
    })
  }

  initBuildCreateEquipementForm(): void {
    this.createEquipementForm = this.fb.group({
      [this.equipementFormKey.GROUPE_EQUIPEMENT]: ["", [Validators.required]],
      [this.equipementFormKey.LIBELLE]: ["", [Validators.required]],
    })
  }

  createEquipement(): void {
    let equipement: Equipement = this.createEquipementForm.value;
    let groupeEquipementSelected: GroupeEquipement;
    groupeEquipementSelected = {
      id: equipement.groupeEquipement.id,
      libelle: equipement.groupeEquipement.libelle
    }
    equipement.groupeEquipement = groupeEquipementSelected;
    this.equipementService.createEquipement(equipement).pipe().subscribe( equipement =>{
      this._snackBar.open("Equipement ajouté avec succès", "X", {
        duration: 1500
      } );
    });
  }
}
