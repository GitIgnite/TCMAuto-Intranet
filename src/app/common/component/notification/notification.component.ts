import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

/**
 * Composant d'affichage d'une notification, affiche le titre et le message passé en paramètre vi l'objet data
 */
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    constructor(private readonly matSnackBarRef: MatSnackBarRef<NotificationComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    }

    public getIcon(): string {
        switch(this.data.type) {
            case 'success': {
                return 'sentiment_satisfied';
            }
            case 'error': {
                return 'error';
            }
            case 'warning': {
                return 'warning';
            }
            default: {
                return 'info';
            }
        }
    }

    public clear(): void {
        this.matSnackBarRef.dismiss();
    }

}
