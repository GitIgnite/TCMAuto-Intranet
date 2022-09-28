# TCMAuto INTRANET

-- -
## Description
Application Angular front intranet

Le projet est généré avec [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

-- -
## Configuration de connexion à une   API

###Configuration Dev 

Package.json :
``` js
  "scripts": {
    "ng": "ng",
    "start": "ng serve --host --proxy-config ./src/environments/proxy.conf.json",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  ...
```
environment.ts
``` js
// Exemple  environment.ts
export const environment = {
  production: true,
  apiRoot: ApiUrlConst.API_ROOT,
  backendServer: 'http://localhost:8080'
};
```

###Configuration Prod

Package.json :
``` js
  "scripts": {
    "ng": "ng",
    "start": "node server.js",
    "build": "ng build",
    "build-prod": "ng build --prod",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "main" : "server.js",
  ...
```
On se base sur un fichier js pour lancer le serveur (Serveur Express)

server.js :

``` js
"use strict";
const express = require("express");

const _app_folder = 'dist/TCMAuto-INTRANET';

const app = express();
const port = process.env.PORT || 8080

// ---- SERVE STATIC FILES ---- //

// On lance le serveur grace au build (dossier dist/TCMAuto-INTRANET)
app.use('/', express.static(_app_folder));

app.listen(port, () => { console.log("app is started and listening port : ", port)})

```

environment.ts

``` js
// Exemple  environment.prod.ts
export const environment = {
  production: true,
  apiRoot: ApiUrlConst.API_ROOT,
  backendServer: 'https://tcmauto-api.cleverapps.io'
};
```
-- -
## Lancement du serveur
### Lancement en mode DEV

Lancer la commande `npm start`. se connecter à l'url `http://localhost:4200/` le front va se connecter automatiquement à l'application
back qui a pour adresse `localhost:8080/tcmauto`

### Lancement en mode PROD
1) Build\
Lancer le build en faisant `ng build --prod`. Celui-ci créera un dossier `dist/`. 
Ce fichier contient le nom du dossier défini dans le fichier `angular.json`
``` js
"architect": {
   "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "options": {
        "outputPath": "dist/TCMAuto-INTRANET",
   ...
```
2) Lancement du Serveur avec `npm start`\
En mode prod, le lancement du serveur est différent du mode dev. Il lance l'application buildé au préalable avec la commande `ng build`
-- -
-- -
## Problèmes rencontrés lors du développement
### Erreur Cors :

**Exemple erreur :** \
``CORS Access to XMLHttpRequest at X from origin has been blocked by CORS policy``

**SOLUTION :**

- Vérifier si l'url appelé est la bonne en prenant en compte l'url complète. 

### Erreur MultipartFile :

**Exemple erreur :** \
``` java
    // Erreur 500 Coté FRONT
    // ERREUR COTE BACK :
    org.springframework.web.multipart.MultipartException: Current request is not a multipart request
	at org.springframework.web.method.annotation.RequestParamMethodArgumentResolver.handleMissingValueInternal(RequestParamMethodArgumentResolver.java:210) ~[spring-web-5.3.14.jar:5.3.14]
	at org.springframework.web.method.annotation.RequestParamMethodArgumentResolver.handleMissingValue(RequestParamMethodArgumentResolver.java:193) ~[spring-web-5.3.14.jar:5.3.14]
	at org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:114) ~[spring-web-5.3.14.jar:5.3.14]
	at org.springframework.web.method.support.HandlerMethodArgumentResolverComposite.resolveArgument(HandlerMethodArgumentResolverComposite.java:121) ~[spring-web-5.3.14.jar:5.3.14]
	at org.springframework.web.method.support.InvocableHandlerMethod.getMethodArgumentValues(InvocableHandlerMethod.java:179) ~[spring-web-5.3.14.jar:5.3.14]
	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:146) ~[spring-web-5.3.14.jar:5.3.14]
    }
```

**SOLUTION :**

- Exemple d'un service d'upload d'image:
``` js
  private readonly urlVehiculePhoto = ApiUrlConst.VEHICULE_PHOTO;

  constructor(private http: HttpClient) {}

  public upload(fileImage: FileImage): Observable<any>{
    let url = `${environment.backendServer}/tcmauto${this.urlVehiculePhoto}/upload` ;
    var file = new FormData();
    var image: File = fileImage.file;
    file.append('file',image);
    return this.http.post<any>(url,file);
  }

```
- Voir aussi **une correction à apporter coté FRONT**

## Déploiement sur Clever Cloud

1) Créer un serveur Node.js sur Clever Cloud
2) Connecter son espace à son Git
3) Créer un serveur Express (Voir la rubrique ``Configuration de connexion à une API - Configuration Prod``)
4) Visualiser dans Clever Cloud si le déploiement s'est effectué correctement
