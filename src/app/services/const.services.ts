import { Injectable } from "@angular/core";
@Injectable()
export class ConstService {
  API_URL: string;
  TOKEN_URL: string;
  AUTH_TOKEN: "AuthToken";

  constructor() {
    const protocol = "http://"; //local
    // const protocol = 'https://'; //stg
    // const apiDomain: String = '82.99.43.164:7023';//Staging URL
    // const apiDomain: String = 'api.ledgefarm.net';//Staging URL
        // const apiDomain: String = 'api.afrikash.akeodev.com';//Staging URL

    // const apiDomain: String = '192.168.1.157:9023';//dev URL
    const apiDomain: String = "localhost:3000";
    this.API_URL = protocol + apiDomain + "/api/";
  }
}
