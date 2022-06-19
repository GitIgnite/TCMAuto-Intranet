import {Component, OnInit} from '@angular/core';
import {ClientService} from "./api/services/client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TCMAuto-INTRANET';


  constructor() {
  }

  ngOnInit(): void {
  }

}
