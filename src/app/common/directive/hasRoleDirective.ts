import {Directive, ElementRef, Input} from "@angular/core";
import {TokenStorageService} from "../../authentification/token.service";
import {BehaviorSubject} from "rxjs";
import {Utilisateur} from "../../api/models/Utilisateur";

@Directive({
  selector: '[hasPermissions]'
})
export class HasRoleDirective {

  @Input() hasRoles: string[] = [];
  private userObservable: BehaviorSubject<any>;
  private currentUser: Utilisateur | undefined;

  constructor(private elementRef: ElementRef, private tokenStorage : TokenStorageService) {
    this.userObservable = this.tokenStorage.userConnected;
  }

  ngOnInit(): void {
    this.userObservable.subscribe((user) => {
      this.currentUser = user;
      if (!this.authorized()) {
        this.elementRef.nativeElement.remove();
      }
    });
  }

  private authorized() {
    console.log("verif authorised");
    let anyMatch: boolean = false;
    if(this.hasRoles && this.currentUser && this.currentUser.roles) {
      this.currentUser.roles.forEach((role: any) => {
        if(this.hasRoles.find(hasRole => hasRole === role)) {
          anyMatch = true;
        }
      })
    }
    return anyMatch;
  }
}
