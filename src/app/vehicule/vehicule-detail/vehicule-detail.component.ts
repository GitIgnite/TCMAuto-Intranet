import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GestionEquipementComponent} from '../gestion-equipement/gestion-equipement.component';
import {Vehicule} from "../../api/models/Vehicule";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../../common/form/keys/message-keys";
import {VehiculeCreateComponent} from "../vehicule-create/vehicule-create.component";
import {NoteComponent} from "../../common/component/note/note.component";
import {CommonFormKey} from "../../common/form/keys/common-form-key";
import {VehiculeGestionPhotoComponent} from '../vehicule-photo/vehicule-gestion-photo.component';
import {DocumentService} from "../../api/services/document.service";
import {ClientService} from "../../api/services/client.service";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-vehicule-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.scss']
})
export class VehiculeDetailComponent implements OnInit {

  @Output() cacherDetailEmit = new EventEmitter();
  @Input() vehicule!: Vehicule;
  messageFormKeys = MessageKeys;

  constructor(private readonly dialog: MatDialog,
              private readonly _snackBar: MatSnackBar,
              private readonly documentService: DocumentService,
              private readonly clientService: ClientService) {
  }

  ngOnInit(): void {

  }

  openEquipementDialog() {
    return this.dialog.open(GestionEquipementComponent, {
      width: '1000px',
      data: {
        vehiculeCourrant: this.vehicule
      }
    }).afterClosed();
  }

  editVehicule() {
    return this.dialog.open(VehiculeCreateComponent, {
      width: '1024px',
      disableClose: false,
      data: {
        vehicule: this.vehicule
      }
    }).afterClosed().subscribe(result => {
      if (result && result.type && result.type === 'EDIT') {
        this.vehicule = result.vehicule
        this._snackBar.open(this.messageFormKeys.EDIT_VEHICULE, 'OK');
      }
    });
  }

  getNombreMain(): string {
    let nbMain = "";
    if (this.vehicule && this.vehicule.nbMain) {
      if (this.vehicule.nbMain > 1) {
        nbMain = this.vehicule.nbMain+"ème main";
      } else {
        nbMain = this.vehicule.nbMain+"ère main";
      }
    }

    return nbMain;
  }

  openUpdateNote() {
    return this.dialog.open(NoteComponent, {
      width: '1000px',
      disableClose: false,
      data: {
        clientOrVehicule : CommonFormKey.VEHICULE,
        clientOrVehiculeObject: this.vehicule
      }
    }).afterClosed().subscribe(result => {
      if(result && result.object) {
        this.vehicule = result.object;
        this._snackBar.open(this.messageFormKeys.NOTE_VEHICULE, 'OK');
      }
    });
  }

  openPictureDialog() {
    return this.dialog.open(VehiculeGestionPhotoComponent, {
      width: '1000px',
      data: {
        vehiculeId: this.vehicule.id
      }
    }).afterClosed();
  }

  generateContratPdf() {
    // this.documentService.generateContratPdf(this.vehicule?.id);
    this.documentService.generateContratPdf(this.vehicule?.id).subscribe(
      (response) => {
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);

        }
    );
  }
}
