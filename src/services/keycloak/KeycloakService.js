/*import Keycloak from 'keycloak-js';

class KeycloakService {
  constructor() {
    this._keycloak = undefined;
    this._profile = undefined;
  }

  getKeycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8222',
        realm: 'api_realm',
        clientId: 'user',
      });
    }
    return this._keycloak;
  }

  getProfile() {
    return this._profile;
  }

  async init() {
    const keycloak = this.getKeycloak();
    const authenticated = await keycloak.init({ onLoad: 'login-required' });

    if (authenticated) {
      this._profile = await keycloak.loadUserProfile();
      this._profile.token = keycloak.token || '';
    }

    return authenticated;
  }

  login() {
    return this.getKeycloak().login();
  }

  logout() {
    return this.getKeycloak().logout({ redirectUri: 'http://localhost:5173' });
  }
}

const keycloakService = new KeycloakService();
export default keycloakService;
*/