import Controller from '@ember/controller';
import ENV from 'squared-up/config/environment';
import { action } from '@ember/object';
import fetch, { Headers } from 'fetch';

export default class SignupController extends Controller {
    name = '';
    newLayout = false;

    @action
    openLayoutBox() {
        this.toggleProperty('newLayout');
    }

    @action
    async createLayout() {
        let url = `${ENV.APP.BACKEND}/layouts`;

        let body = JSON.stringify({
        name: this.name
        });

        let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token')
        });

        try {
            let response = await fetch(url, { method: 'post', headers, body });
                  
            let json = await response.json();
      
            // return await response.then(this.transitionToRoute(`layout/${json.id}`));
            this.model = await this._reloadModel();
          } catch (e) {
            console.log(e);
          }
    }

    async _reloadModel() {
    
        let url = `${ENV.APP.BACKEND}/layouts`;
        let localStorage = window.localStorage;
        let headers = new Headers({
          'Authorization': localStorage.getItem('auth-token')
          });
    
        let response = await fetch(url, { method: 'get', headers });
    
        return response.json()
      }
}