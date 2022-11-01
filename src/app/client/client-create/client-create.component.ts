import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ClientFormKeys} from "../../common/form/keys/client-form-keys";
import {ClientService} from "../../api/services/client.service";
import {Client} from "../../api/models/Client";
import {AdresseService} from "../../api/services/adresse.service";
import {Adresse} from "../../api/models/Adresse";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PATTERN_EMAIL, PATTERN_CP, PATTERN_TEL} from "../../common/form/validators/patterns";
import {MessageErrorKeys} from "../../common/form/keys/message-error-keys";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  createClientForm! : UntypedFormGroup;
  clientFormKeys = ClientFormKeys;
  messageErrorKeys = MessageErrorKeys;
  listAdresse: Adresse[] = [];
  clientToEdit! : Client;
  // filteredOptions: Observable<Adresse[]> | undefined;
  constructor(private readonly fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<ClientCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private clientService: ClientService,
              private adresseService: AdresseService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    if(this.data && this.data.client) {
      this.clientToEdit = this.data.client;
    }
    this.initBuildCreateClientForm();
    this.onChange();
  }

  onChange() {
    // TODO : TEST AUTO COMPLETE ADRESSE
    // @ts-ignore
    // this.filteredOptions = this.createClientForm.get(this.clientFormKeys.ADRESSE)?.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     if(value.length > 5) {
    //       this.adresseService.searchAdresse(value).pipe().subscribe(value => {
    //         this.listAdresse = value;
    //       });
    //     } else {
    //       this.listAdresse = [];
    //     }
    //     return this._filter(value)
    //   })
    // );

  }

  initBuildCreateClientForm(): void {
    this.createClientForm = this.fb.group( {
      [this.clientFormKeys.NOM] : [this.clientToEdit ? this.clientToEdit.nom : null,[Validators.required]],
      [this.clientFormKeys.PRENOM] : [this.clientToEdit ? this.clientToEdit.prenom : null,[Validators.required]],
      [this.clientFormKeys.DATE_NAISSANCE] : [this.clientToEdit ? this.clientToEdit.dateNaissance : null],
      [this.clientFormKeys.TELEPHONE] : [this.clientToEdit ? this.clientToEdit.telephone : null,[Validators.required, Validators.pattern(PATTERN_TEL)]],
      [this.clientFormKeys.EMAIL] : [this.clientToEdit ? this.clientToEdit.email : null,[Validators.pattern(PATTERN_EMAIL)]],
      [this.clientFormKeys.ADRESSE] : [this.clientToEdit ? this.clientToEdit.adresse : null],
      [this.clientFormKeys.CODEPOSTAL] : [this.clientToEdit ? this.clientToEdit.codePostal : null,Validators.pattern(PATTERN_CP)],
      [this.clientFormKeys.VILLE] : [this.clientToEdit ? this.clientToEdit.ville : null]
    })
  }

  createClient(): void {
    let client : Client = Client.dataFormToModel(this.createClientForm.value);
    client.dateNaissance = this.datePipe.transform(client.dateNaissance, "yyyy-MM-dd")
    let type ='SAVE';

    // Cas de modification d'un client
    if(this.clientToEdit) {
      client.id = this.clientToEdit.id;
      client.note = this.clientToEdit.note;
      type = 'EDIT';
    } else {
      type = 'SAVE';
    }
    this.clientService.createClient(client).pipe().subscribe(client => {
      this.dialogRef.close({
        type:type,
        objet:client
      })
    })
  }

  cancelCreationClient(): void {
    this.dialogRef.close({
    })
  }
  //
  // displayFn(adresseObject: Adresse): string {
  //   return adresseObject && adresseObject.adresse ? adresseObject.adresse : '';
  // }
  //
  // private _filter(adresseSasie: string): Adresse[] {
  //   const filterValue = adresseSasie.toLowerCase();
  //
  //   // @ts-ignore
  //   let adresseFiltre = this.listAdresse.filter(adresse => adresse.adresse.toLowerCase().includes(filterValue));
  //
  //   return adresseFiltre;
  // }

}
