import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AUTH_CONFIG } from "./auth.config";
import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid'
  });

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }


  public login(): void {
    this.auth0.authorize({});
  }

  public handleAuthentication(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          resolve();
        } else if (err) {
          console.log(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
        }

        reject();
      });
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    this.storage.set('access_token', authResult.accessToken);
    this.storage.set('id_token', authResult.idToken);
    this.storage.set('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('expires_at');
  }

  public isAuthenticated(): Promise<boolean> {
    // Check whether the current time is past the
    // access token's expiry time
    return this.storage.get('expires_at').then(expiresAt => new Date().getTime() < JSON.parse(expiresAt));
  }
}
