import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CommonFormKey} from "../../form/keys/common-form-key";
import {VehiculeService} from "../../../api/services/vehicule.service";
import {ClientService} from "../../../api/services/client.service";
import {Vehicule} from "../../../api/models/Vehicule";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PATTERN_CP, PATTERN_EMAIL, PATTERN_TEL} from "../../form/validators/patterns";
import {Client} from "../../../api/models/Client";
import {Observable, Subject} from "rxjs";
import {Mandat} from "../../../api/models/Mandat";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  noteForm!: UntypedFormGroup;
  commonFormKeys = CommonFormKey;
  clientOrVehicule = this.commonFormKeys.VEHICULE;
  clientOrVehiculeObject: Client | Vehicule | null = null;
  $noteObs: Observable<Client|Vehicule> = new Subject();

  constructor(private readonly fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<NoteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private vehiculeService: VehiculeService, private clientService: ClientService) {
  }

  ngOnInit(): void {
    if (this.data && this.data.clientOrVehicule) {
      this.clientOrVehicule = this.data.clientOrVehicule;
      this.clientOrVehiculeObject = this.data.clientOrVehiculeObject;
    }
    this.initBuildCreateClientForm();
  }

  initBuildCreateClientForm(): void {
    this.noteForm = this.fb.group({
      [this.commonFormKeys.NOTE]: [this.clientOrVehiculeObject ? this.clientOrVehiculeObject.note : null]
    })
  }

  updateNote(): void {
    if (this.clientOrVehiculeObject && this.clientOrVehiculeObject.id) {
      let noteUpdated : string = this.noteForm.get(this.commonFormKeys.NOTE)?.value;
      if (this.clientOrVehicule == this.commonFormKeys.VEHICULE) {
        this.$noteObs = this.vehiculeService.updateVehicule(this.clientOrVehiculeObject.id, {note: noteUpdated});
      } else {
        this.$noteObs = this.clientService.updateClient(this.clientOrVehiculeObject.id, {note: noteUpdated});
      }

      this.$noteObs.pipe().subscribe((object: Vehicule | Client) => {
          this.dialogRef.close({
            objet: object
          })
        }
      );

    }
  }

  cancelAndCloseNote(): void {
    this.dialogRef.close({})
  }
}
