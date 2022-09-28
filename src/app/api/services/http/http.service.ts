import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {CustomRequest} from "../../models/http/CustomRequest";
import {NotificationService} from "../../../common/component/notification/notification.service";
import {UtilsService} from "../utils.service";

const X_TOTAL_COUNT = 'x-total-count';
const X_CURRENT_SIZE = 'x-current-size';
const X_TOTAL_ELEMENT = 'x-total-element';
const X_PAGE_SIZE = 'x-page-size';
const X_TOTAL_PAGE = 'x-total-page';
const X_MAX_RESUTLS = 'x-max-results';
const X_CURRENT_PAGE = 'x-current-page';

/**
 * Sur-couche permettant de centraliser la gestion des requêtes Http
 */
@Injectable()
export class HttpService {

    private static readonly mimeTypeApplicationJson = 'application/json';

    constructor(private readonly http: HttpClient,
                private readonly notificationService: NotificationService) {}

    /**
     * Permet de traiter une requête de type GET
         * @param {CustomRequest} request - requête à traiter
     * @returns {Observable<any>} - résultat de la requête
     */
    public get<T>(request: CustomRequest): Observable<any> {
        return this.http.get(
            HttpService.buildUrl(request),
            {
                params: this.buildQueryParams(request),
                observe: 'response',
                responseType: request.responseType as 'text'
            })
            .pipe(
                map((response: HttpResponse<any>) => {
                    // this.logger.info(`Get: ${request.url} , successfully with status: [${response.status}]`);
                    return this.handleSuccess(response).body;
                }),
                catchError((error: HttpErrorResponse) =>
                    request.throwError ? throwError(error) : this.logAndHandleError('Get', request, error)
                )
            );
    };

    /**
     * Permet de traiter une requête de type POST
     * @param {CustomRequest} request - requête à traiter
     * @returns {Observable<any>} - résultat de la requête
     */
    public post<T>(request: CustomRequest): Observable<any> {

        return this.http.post(
            HttpService.buildUrl(request),
            this.buildBody(request),
            {
                headers: this.buildHeaders(request),
                params: this.buildQueryParams(request),
                observe: 'response',
                responseType: request.responseType as 'text'
            })
            .pipe(
                map((response: HttpResponse<any>) => {
                    // this.logger.info(`Post: ${request.url} , successfully with status: [${response.status}]`);
                    if (!request.completeResponse) {
                        this.displaySuccessToaster(request);
                    }
                    return this.handleSuccess(response).body;
                }),
                catchError((error: HttpErrorResponse) =>
                    request.throwError ? throwError(error) : this.logAndHandleError('Post', request, error)
                )
            );
    };

  /**
   * Permet de traiter une requête de type PATCH
   * @param {CustomRequest} request - requête à traiter
   * @returns {Observable<any>} - résultat de la requête
   */
  public patch<T>(request: CustomRequest): Observable<any> {

    return this.http.patch(
      HttpService.buildUrl(request),
      this.buildBody(request),
      {
        headers: this.buildHeaders(request),
        params: this.buildQueryParams(request),
        observe: 'response',
        responseType: request.responseType as 'text'
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          // this.logger.info(`Post: ${request.url} , successfully with status: [${response.status}]`);
          if (!request.completeResponse) {
            this.displaySuccessToaster(request);
          }
          return this.handleSuccess(response).body;
        }),
        catchError((error: HttpErrorResponse) =>
          request.throwError ? throwError(error) : this.logAndHandleError('Patch', request, error)
        )
      );
  };

    /**
     * Permet de traiter une requête de type PUT
     * @param {CustomRequest} request - requête à traiter
     * @returns {Observable<any>} - résultat de la requête
     */
    public put<T>(request: CustomRequest): Observable<any> {
        return this.http.put(
            HttpService.buildUrl(request),
            this.buildBody(request),
            {
                headers: this.buildHeaders(request),
                params: this.buildQueryParams(request),
                observe: 'response'
            })
            .pipe(
                map((response: HttpResponse<any>) => {
                    // this.logger.info(`Put: ${request.url} , successfully with status: [${response.status}]`);
                    if (!request.completeResponse) {
                        this.displaySuccessToaster(request);
                    }
                    return request.completeResponse ? this.handleSuccess(response) : this.handleSuccess(response).body;
                }),
                catchError((error: HttpErrorResponse) =>
                    this.logAndHandleError('Put', request, error)
                )
            );
    };

    /**
     * Permet de traiter une requête de type DELETE
     * @param {CustomRequest} request - requête à traiter
     * @returns {Observable<any>} - résultat de la requête
     */
    public delete<T>(request: CustomRequest): Observable<any> {
        return this.http.delete(HttpService.buildUrl(request),
            {
                headers: this.buildHeaders(request),
                params: this.buildQueryParams(request),
                observe: 'response'
            })
            .pipe(
                map((response: HttpResponse<any>) => {
                    // this.logger.info(`Delete: ${request.url} , successfully with status: [${response.status}]`);
                    this.displaySuccessToaster(request);
                    return this.handleSuccess(response).body;
                }),
                catchError((error: HttpErrorResponse) =>
                    this.logAndHandleError('Delete', request, error))
            );
    };

    /**
     * Création des Headers requis pour la requête
     * @param {CustomRequest} request - requête dont on souhaite extraire et formatter les headers
     * @returns {HttpHeaders} - Header utilisés par HttpClient
     */
    private buildHeaders(request: CustomRequest): HttpHeaders {
        let headers = new HttpHeaders();
        if (request.contentType) {
            headers = headers.append('Content-Type', request.contentType);
        }
        if (request.encType) {
            headers = headers.append('enctype', request.encType);
        }
        if (request.accept) {
            headers = headers.append('Accept', request.accept)
        }
        if (request.customHeader) {
            request.customHeader.forEach((value: string, key: string) => {
                headers = headers.append(key, value)
            })
        }
        if (request.noCache) {
            headers = headers.append('GESPA-NO-CACHE', 'no-cache');
        }
        return headers;
    }

    /**
     * Création du body de la requête
     * @param {CustomRequest} request - requête dont on souhaite extraire le body
     * @returns {any} - Body correctement formatté
     */
    private buildBody(request: CustomRequest): any {

        // Inspecte toute les propriété d'un objet et retourne un nouvelle objet contenant les propriétés non null non undefined de l'objet passé en paramètre
        const clearNullField = (obj: { [x: string]: any; }) => {
            const alteredBody = {};
            Object.keys(obj).forEach(key => {
                if (!UtilsService.isNullOrUndefined(obj[key])) {
                    // @ts-ignore
                  alteredBody[key] = obj[key];
                }
            });
            return alteredBody;
        };

        if (request.body instanceof FormData) {
            return request.body;
        }

        if (request.body instanceof Array) {
            return request.body;
        }

        if (request.body) {
            //Si le body est un objet contenant des objets à cleanUp
            if (request.body.isMergedObject) {
                const body = {};
                Object.keys(request.body).forEach(key => {
                    if(key !== 'isMergedObject' && request.body[key]) { // @ts-ignore
                      body[key] = clearNullField(request.body[key]);
                    }
                });
                return body;
            } else {
                return clearNullField(request.body)
            }
        }

        return {};
    }

    /**
     * Création des HttpParams requis pour la requête
     * @param {CustomRequest} request - requête dont on souhaite extraire et formatter les paramètres
     * @returns {HttpParams} - HttpParams utilisés par HttpClient
     */
    private buildQueryParams(request: CustomRequest): HttpParams {
        let params = new HttpParams();
        if(!UtilsService.isNullOrUndefined(request)) {
          if (!UtilsService.isNullOrUndefined(request.size)) {
            // @ts-ignore
            params = params.append('size', request.size.toString());
          }
          if (!UtilsService.isNullOrUndefined(request.page)) {
            // @ts-ignore
            params = params.append('page', request.page.toString());
          }
          // @ts-ignore
          if (!UtilsService.isNullOrUndefined(request.sort) && request.sort.direction) {
            // @ts-ignore
            params = params.append('sort', `${request.sort.active},${request.sort.direction}`);
          }

          if (request.queryParams) {
            const copyOfObject = {...request.queryParams};
            Object.keys(copyOfObject).forEach(key => {
              const isEmptyArray = (val: string | any[]) => Array.isArray(val) && val.length === 0;
              if (!UtilsService.isNullOrUndefined(copyOfObject[key]) && copyOfObject[key] !== "" && !isEmptyArray(copyOfObject[key])) {
                params = params.set(key, copyOfObject[key]);
              }
            });
          }
        }
        return params;
    }

    /**
     * Construction de l'url de destination de la requête
     * @param {CustomRequest} request - requête dont on souhaite construire l'URL de destination
     * @returns {string} - URL de destination de la requête
     */
    private static buildUrl(request: CustomRequest): string {
        return `${environment.backendServer}${environment.apiRoot}${request.url}`;
    }

    private logAndHandleError(methodName: string, request: any, error: HttpErrorResponse): Observable<never> {
        console.error(error);
        // this.logger.error(`${methodName}: ${request.url} unsuccessfully with status: [${error.status}] - (${error.statusText})`);
        return this.errorHandler(error).pipe(map(res => {
            if (res) {
                throw res;
            } else {
                throw new Error("Error response");
            }
        }));
    }

    /**
     * Gestion du succès de requête, construit l'objet de retour souhaité.
     * @param {HttpResponse<any>} response - retour de la requête Http
     * @returns {HttpResponse<any>} - ListResult si les headers de pagination sont présent, sinon aucune alteration
     */
    private handleSuccess(response: HttpResponse<any>): HttpResponse<any> {
        if (response.headers && (response.headers.get(X_TOTAL_COUNT) || response.headers.get(X_TOTAL_ELEMENT))) {
            const result = {
                totalCount: Number(response.headers.get(X_TOTAL_COUNT) ? response.headers.get(X_TOTAL_COUNT) : response.headers.get(X_TOTAL_ELEMENT)),
                currentSize: Number(response.headers.get(X_CURRENT_SIZE) ? response.headers.get(X_CURRENT_SIZE) : response.headers.get(X_PAGE_SIZE)),
                totalPage: Number(response.headers.get(X_TOTAL_PAGE)),
                maxResults: Number(response.headers.get(X_MAX_RESUTLS)),
                currentPage: Number(response.headers.get(X_CURRENT_PAGE)),
                items: response.body
            };

            // TIMELINE:
            // Si le header "x-error-message: x-boundary-reaches" est trouvé, on est arrivé à l'une des extrémité de
            // la Timeline, on passe alors le totalPage à -1 pour pouvoir le catch.
            if (response.headers && response.headers.get('x-error-message')
                && response.headers.get('x-error-message') === 'x-boundary-reaches') {
                result.totalPage = -1;
            }
            return response.clone({body: result});
        }
        return response;
    }

    /**
     * Traitement de l'erreur : affichage du message dans la console et propagation d'une exception.
     * @param errorResponse L'erreur à traiter
     * @returns {Observable} L'exception.
     */
    protected errorHandler(errorResponse: HttpErrorResponse): Observable<never> {
        let contentType: string | null = '';
        if (errorResponse && errorResponse.headers && errorResponse.headers.get) {
            contentType = errorResponse.headers.get('Content-type');
        }
        let errMsg;
        if (contentType === HttpService.mimeTypeApplicationJson) {
            const jsonError = errorResponse.error;
            if (jsonError.error) {
                errMsg = jsonError.error;
            } else {
                errMsg = HttpService.buildErrorMessage(errorResponse);
            }
        } else {
            errMsg = HttpService.buildErrorMessage(errorResponse);
        }
        this.notificationService.openErrorSnackBar(errMsg);
        return throwError(errMsg);
    }

    private static buildErrorMessage(error: HttpErrorResponse): string {
        let errorMessage = 'Une erreur est survenue';

        if (error.status >= 300 && error.status < 400) {
            errorMessage = this.buildRedirectionErrorMessage(error.status);
        } else {
            if (error.status >= 400 && error.status < 500) {
                errorMessage = this.buildBadRequestErrorMessage(error.status);
            } else {
                if (error.status >= 500) {
                    errorMessage = this.buildServerErrorMessage(error.status);
                }
            }
        }
        return errorMessage;
    }

    private static buildServerErrorMessage(errorStatus: number): string {
        let errorMessage: string;
        switch (errorStatus) {
            case 500:
                errorMessage = 'Erreur serveur';
                break;
            case 503:
                errorMessage = 'Service temporairement indisponible ou en maintenance';
                break;
            default:
                errorMessage = 'Erreur serveur';
                break;
        }
        return errorMessage;
    }


    private static buildRedirectionErrorMessage(errorStatus: number): string {
        return 'La ressource demandée n\' plus disponible à cette adresse';
    }


    private static buildBadRequestErrorMessage(errorStatus: number): string {
        let errorMessage: string;
        switch (errorStatus) {
            case 400:
                errorMessage = 'Requête incorrecte';
                break;
            case 401:
                errorMessage = 'Authentification requise';
                break;
            case 403:
                errorMessage = 'Accès non autorisé';
                break;
            case 404:
                errorMessage = 'Ressource non trouvée';
                break;
            case 405:
                errorMessage = 'Méthode de requête non autorisée';
                break;
            case 407:
                errorMessage = 'Accès à la ressource autorisé par identification avec le proxy';
                break;
            case 408:
                errorMessage = 'Temps d’attente d’une requête du client écoulé';
                break;
            case 409:
                errorMessage = 'Il existe déjà un enregistrement';
                break;
            default:
                errorMessage = 'Requête incorrecte';
                break;
        }
        return errorMessage;
    }

    /**
     * Affichage d'un Toaster de succès
     * @param {CustomRequest} request - requête dont on souhaite afficher le succès
     */
    private displaySuccessToaster(request: CustomRequest): void {
        if (!!request.successToasterMessage) {
            this.notificationService.openSuccessSnackBar(request.successToasterMessage);
        }
    }

}
