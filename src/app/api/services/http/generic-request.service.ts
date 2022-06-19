/**
 * Utilitaire de construction de Modèle de requête Http
 */
import {Sort} from "@angular/material/sort";
import {UtilsService} from "../utils.service";
import {CustomRequest} from "../../models/http/CustomRequest";
import {Accept} from "../../models/http/accept";
import {Enctype} from "../../models/http/enctype";
import {ContentType} from "../../models/http/content-type";
import {ResponseType} from "../../models/http/response-type";

export class GenericRequest {
    constructor(){}

    /**
     * Construction d'une requête de recherche
     * @param {string} url - destination
     * @param {number} page - Page souhaité au sein de la pagination
     * @param {number} size - Taille au sein de la pagination
     * @param datas - corp
     * @param {string} sort - Tri des résultats de la recherche
     * @param {string} responseType - type de reponse
     * @returns {CustomRequest} - Modèle de requête de recherche
     */
    public static buildSearchRequest(url: string, page?: number, size?: number, datas?: any, sort?: Sort, responseType?: string ): CustomRequest {
        const request = new CustomRequest();
        request.url = url;
        request.contentType = 'application/json';
        request.responseType = responseType ? responseType : 'json';
        request.queryParams = datas;
        request.page = page;
        request.size = size;
        request.sort = sort;
        return request;
    }

    /**
     * Send request with body
     * @param url url - destination
     * @param body datas - corps de la requete
     * @param params params
     * @param headers
     * @param responseType type de reponse
     */
    public static buildSendRequest(url: string, body?: any, params?: any, headers?: Map<string, string>, responseType?: string): CustomRequest {
        const request = new CustomRequest();
        request.url = url;
        request.accept = Accept.JSON;
        request.body = body;
        request.encType = Enctype.multipart;
        request.queryParams = params;
        request.contentType = 'application/json';
        request.responseType = responseType? responseType: 'json';
        request.customHeader = headers;
        if(!UtilsService.isNullOrUndefined(params)) {
            request.page = params.hasOwnProperty('page') ? params.page : null;
            request.size = params.hasOwnProperty('size') ? params.size : null;
            request.sort = params.hasOwnProperty('sort') ? params.sort : null;
            delete params.sort;
        }
        return request;
    }

    /**
     * Construction d'une requête de suppression
     * @param {string} url - destination
     * @param {any} queryParams - utile pour la construction des queryParams
     * @returns {CustomRequest} - Modèle de requête de suppression
     */
    public static buildDeleteRequest(url: string, queryParams?: any): CustomRequest {
        const request = new CustomRequest();
        request.url = url;
        request.queryParams = queryParams;
        request.responseType = ResponseType.text;
        return request;
    }

    /**
     * Send email request with body
     * @param url url - destination
     * @param body datas - corps de la requete
     * @param params params
     */
    public static buildSendEmailRequest(url: string, body: any, params?: any): CustomRequest {
        const request = new CustomRequest();
        request.body = body;
        request.accept = Accept.JSON;
        request.encType = Enctype.multipart;
        request.contentType = ContentType.json;
        request.responseType = ResponseType.json;
        request.url = url;
        request.queryParams = params;
        return request;
    }
}
