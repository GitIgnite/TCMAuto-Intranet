import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {ClientFormKeys} from "../../common/form/keys/client-form-keys";
import {ClientService} from "../../api/services/client.service";
import {ClientCreateComponent} from "../client-create/client-create.component";
import {MatDialog} from "@angular/material/dialog";
import {Client} from "../../api/models/Client";
import {MessageKeys} from "../../common/form/keys/message-keys";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {NoteComponent} from "../../common/component/note/note.component";
import {CommonFormKey} from "../../common/form/keys/common-form-key";
import {AuthService} from "../../authentification/auth.service";
import {TokenStorageService} from "../../authentification/token.service";

@Component({
  selector: 'app-client-recherche',
  templateUrl: './client-recherche.component.html',
  styleUrls: ['./client-recherche.component.scss']
})
export class ClientRechercheComponent implements OnInit, AfterViewInit {

  rechercheClientForm! : UntypedFormGroup;
  clientFormKeys = ClientFormKeys;
  displayedColumns: string[] = ['nom', 'telephone', 'email', 'actions'];
  clients : any [] = [];
  messageFormKeys = MessageKeys;

  dataSource = new MatTableDataSource<Client>();

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


  constructor(private readonly fb: UntypedFormBuilder,
              private clientService: ClientService,
              private readonly dialog: MatDialog,
              private readonly _snackBar: MatSnackBar,
              private readonly tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.initBuildRechercheClientForm();
    this.createColumns();
    this.getClientsByRecherche();
  }

  ngAfterViewInit(): void {
  }

  initBuildRechercheClientForm(): void {
    this.rechercheClientForm = this.fb.group( {
        [this.clientFormKeys.NOM] : [""],
        [this.clientFormKeys.PRENOM] : [""],
        [this.clientFormKeys.TELEPHONE] : [""],
        [this.clientFormKeys.EMAIL] : [""],
    })
  }

  public sort(event: any) {
    this.sortBy = event;
    this.getClientsByRecherche();
  }

  getClientsByRecherche() : void {
    let vehiculeSearchFormData: any = this.rechercheClientForm.value;

    this.clientService.getClientByRecherche(vehiculeSearchFormData, this.sortBy, this.pageSize, this.pageIndex).pipe().subscribe(data => {
      this.dataSource.data = this.clients = data.content;
      if(!this.paginator) {
        this.paginator = data.pageable;
      }
      this.paginator.length = data.totalElements;
      this.paginator.pageIndex = data.pageable.pageNumber;
      this.paginator.pageSize = data.pageable.pageSize;
      this.sortBy = data.pageSort;
    })
  }

  getClients() : void {
    this.clientService.getAll().pipe().subscribe( clients => {
      this.clients = clients;
    })
  }

  editClient(client: Client) {
    return this.dialog.open(ClientCreateComponent, {
      width: '700px',
      disableClose: false,
      data: {
        client: client
      }
    }).afterClosed().subscribe(result => {
      if (result && result.type) {
        if (result.type === 'EDIT') {
          this._snackBar.open(this.messageFormKeys.EDIT_CLIENT, 'OK');
          client = result.objet;
          this.updateClientInsideList(client);
        }
      }
    });
  }

  public majPaginatorRecherche(event: any) {
    this.pageIndex = event.pageIndex;

    // si on change la taille => on remet l'index à 0
    if (this.pageSize !== event.pageSize) {
      this.pageIndex = 0;
    }
    this.pageSize = event.pageSize;
    // appel de la recherche
    this.getClientsByRecherche();
  }

  openUpdateNote(client: Client) {
    return this.dialog.open(NoteComponent, {
      width: '1000px',
      disableClose: false,
      data: {
        clientOrVehicule : CommonFormKey.CLIENT,
        clientOrVehiculeObject: client
      }
    }).afterClosed().subscribe(result => {
      if(result && result.objet) {
        client = result.objet;
        this.updateClientInsideList(client);
        this._snackBar.open(this.messageFormKeys.NOTE_CLIENT, 'OK');
      }
    });
  }

  /**
   * Modifie le client qui est défini dans la liste sans actualiser la page
   * @param clientUpdated
   */
  public updateClientInsideList(clientUpdated: Client) {
    let clientFound: Client = this.clients.find(client => client.id == clientUpdated.id);
    if(clientFound) {
      var indexClient = this.clients.indexOf(clientFound);
      this.clients[indexClient] = clientUpdated;
      this.dataSource.data = this.clients;
    }
  }

  deleteClient(clientToDelete: Client) {
    if(clientToDelete && clientToDelete.id) {
      this.clientService.deleteClient(clientToDelete.id).subscribe( () =>{
        let clientFound = this.clients.findIndex(client => client.id == clientToDelete.id);
        if(clientFound) {
          this.clients.splice(clientFound, 1);
          this.dataSource.data = this.clients;
          this._snackBar.open(this.messageFormKeys.DELETE_CLIENT, 'OK');
        }
      });
    }
  }

  createColumns() {
    if(this.tokenStorageService.hasRole(['ADMIN','CREATE','SUPPRESSION'])) {
      this.displayedColumns = ['nom', 'telephone', 'email', 'actions'];
    } else {
      this.displayedColumns = ['nom', 'telephone', 'email'];
    }
  }
}
