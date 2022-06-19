export class UtilsService {

  constructor() {
  }

  public static isNullOrUndefined(object : any) {
    return object === undefined || object === null
  }
}
