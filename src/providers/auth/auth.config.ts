interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '1CNIGs1KgC1gbv2DtoAhld5R13eGOeQ6',
  domain: 'hitori-ninja.eu.auth0.com',
  callbackURL: 'http://localhost:8100'
};
