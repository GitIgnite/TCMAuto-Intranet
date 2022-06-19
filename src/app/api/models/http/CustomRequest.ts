/**
 * Modèle de requête Http
 */
import {Sort} from "@angular/material/sort";

export class CustomRequest {

    /**
     * Url de destination
     */
    public url!: string;

    /** Utilisé pour récupérer l'errur brute au niveau du composant */
    public throwError = false;

    /**
     * Paramètres
     */
    public queryParams: any;

    /**
     * Corps
     */
    public body: any;

    /**
     * Type de contenu
     */
    public contentType!: string;

    /**
     * Type de réponse
     */
    public responseType!: string;

    /**
     * Chiffrage de la requête
     */
    public encType!: string;

    /**
     * Taille au sein de la pagination
     */
    public size!: number | undefined;

    /**
     * Page souhaité au sein de la pagination
     */
    public page!: number | undefined;

    /**
     * Tri pour les retours
     */
    public sort!: Sort | undefined;

    /**
     * Type de retour accepté
     */
    public accept!: string;

    /**
     * Headers particuliers à ajouter si
     */
    public customHeader!: Map<string, string> | undefined

    /**
     * Si l'on doit afficher un toaster en cas de succès ( /_!_\ pas en cas d'erreur, Cf $http /_!_\ )
     */
    public successToasterMessage!: string;

    /**
     * Permet de récupérer toute la réponse et non que le body
     */
    public completeResponse!: boolean;

    public noCache = false;

    /**
     *
     */
    constructor() {
    }

    public forceNoCache(): CustomRequest {
        this.noCache = true;
        return this;
    }

    /**
     * Set le message de succès (utile pour PUT / POST)
     * @returns {CustomRequest} - requête alterée
     */
    public addSuccessMessage(successMessage: string): CustomRequest {
        this.successToasterMessage = successMessage;
        return this;
    }

    public returnCompleteResponse() {
        this.completeResponse = true;
        return this;
    }

    public setThrowError(throwError: boolean): CustomRequest{
        this.throwError = throwError;
        return this;
    }
}
