import {Injectable} from '@angular/core';
import {NotificationComponent} from "./notification.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(protected snackBar: MatSnackBar) {
    }

    /**
     * Affiche une notification de succès
     */
    public openSuccessSnackBar(message: any): void {
        this.openSnackBar(message, 'Fermer', 5000, 'success');
    }

    /**
     * Affiche une notification d'erreur, les erreurs s'affichent 8 secondes, plus longtemps que les succès
     */
    public openErrorSnackBar(message: any): void {
        this.openSnackBar(message, 'Fermer', 5000, 'error');
    }

    /**
     * Affiche une notification de warning, lee détail s'affichent 8 secondes, comme pour les erreurs
     */
    public openWarningSnackBar(message: any): void {
        this.openSnackBar(message, 'Fermer', 5000, 'warning');
    }

    private openSnackBar(message: any, action: string, duration: number, type: string): void {
        this.snackBar.openFromComponent(NotificationComponent, {
            duration,
            panelClass: ['snack-bar-' + type],
            data: { message, type, action }
        });
    }

}
