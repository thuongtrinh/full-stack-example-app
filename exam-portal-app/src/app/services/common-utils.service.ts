import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtils {

  constructor() { }

  public static isNumber(data: any): boolean{
    const regexpNumber = /^\d+$/;
    if (!regexpNumber.test(data)) {
      return false;
    }
    return true;
  }
}
