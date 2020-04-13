import Controller from '@ember/controller';
import ENV from 'squared-up/config/environment';
import { action } from '@ember/object';
import fetch, { Headers } from 'fetch';

export default class SignupController extends Controller {
    email = '';
    password = '';

    @action
    async signup() {
        let url = `${ENV.APP.BACKEND}/users`;
        let url2 = `${ENV.APP.BACKEND}/sessions`;

        let body = JSON.stringify({
        email: this.email,
        password: this.password
        });

        let headers = new Headers({
        'Content-Type': 'application/json'
        });

        try {
            let response = await fetch(url, { method: 'post', headers, body });
            
            let response2 = await fetch(url2, { method: 'post', headers, body });
      
            let json2 = await response2.json();
            let localStorage = window.localStorage;
            localStorage.setItem('auth-token', json2.token);
      
            return this.transitionToRoute('layouts');
          } catch (e) {
            console.log(e);
          }
  }
}