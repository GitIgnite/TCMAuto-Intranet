import { Injectable } from '@angular/core';
import { Equipement } from './api/models/Equipement';
@Injectable()
export class VariablesGlobales {
  listEquipementchecked: Equipement[] = [];
  alreadyToPass = false;
}
