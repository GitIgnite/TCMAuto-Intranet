import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ClientCreateComponent} from "../client/client-create/client-create.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../common/form/keys/message-keys";
import {VehiculeCreateComponent} from '../vehicule/vehicule-create/vehicule-create.component';
import {Router} from "@angular/router";
import {TokenStorageService} from "../authentification/token.service";
import {ClientRechercheComponent} from "../client/client-recherche/client-recherche.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  menuList = [];
  messageFormKeys = MessageKeys;
  userConnected: any;
  constructor(private readonly dialog: MatDialog,
              private readonly _snackBar: MatSnackBar,
              private readonly tokenService: TokenStorageService,
              private readonly router: Router) {}

  ngOnInit(): void {
    this.tokenService.userConnected.subscribe(value => {
      this.userConnected = value;
    } );
  }

  openCreateClientDialog() {
    return this.dialog.open(ClientCreateComponent, {
      width: '1000px',
      disableClose: false,
      data: {
      }
    }).afterClosed().subscribe(result => {
      if(result && result.type && result.type === 'SAVE') {
        this._snackBar.open(this.messageFormKeys.SAVE_CLIENT, 'OK');
      }
    });
  }

  openCreateVehiculeDialog() {
    return this.dialog.open(VehiculeCreateComponent, {
      width: '1000px'
    }).afterClosed();
  }

  isConnected() {
    return this.tokenService.isConnected();
  }

  login() {
    this.router.navigate(['/login']);
  }

  deconnexion() {
    this.tokenService.signOut();
    this.login();
  }

  getUser(): any {
    return this.tokenService.userConnected;
  }


}
