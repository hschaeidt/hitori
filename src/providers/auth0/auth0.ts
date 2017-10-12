import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AUTH_CONFIG } from "./auth0.config";
import 'rxjs/add/operator/map';
import { Auth0UserProfile, WebAuth } from "auth0-js";

import { UserProvider } from "../user/user";

/*
  Generated class for the Auth0Provider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Auth0Provider {

  auth0 = new WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid email profile'
  });

  constructor(public http: HttpClient, public storage: Storage, public userProvider: UserProvider) {
  }


  public login(): void {
    this.auth0.authorize({});
  }

  public async handleAuthentication(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash(async (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          await this.setSession(authResult);
          await this.syncToUser(authResult.idToken);
          resolve();
        } else if (err) {
          reject(err);
        } else {
          reject();
        }
      });
    });
  }

  async syncToUser(idToken: string) {
    //const userProfile = await this.getUserProfile();

    //this.userProvider.createUser(userProfile.nickname, userProfile.name, idToken);
  }

  public async getAccessToken(): Promise<string> {
    return this.storage.get('access_token');
  }

  public getUserProfile(): Promise<Auth0UserProfile> {
    return new Promise((resolve, reject) => {
      this.storage.get('access_token').then(accessToken => {
        this.auth0.client.userInfo(accessToken, (err, userProfile) => {
          if (err) {
            reject(err);
          }

          resolve(userProfile);
        });
      }).catch(reason => reject(reason));
    });
  }

  private async setSession(authResult): Promise<void> {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    await this.storage.set('access_token', authResult.accessToken);
    await this.storage.set('id_token', authResult.idToken);
    await this.storage.set('expires_at', expiresAt);
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
