import Controller from '@ember/controller';
import ENV from 'squared-up/config/environment';
import { action } from '@ember/object';
import fetch, { Headers } from 'fetch';

export default class LoginController extends Controller {
    email = '';
    password = '';

    @action
        async login() {
            let url = `${ENV.APP.BACKEND}/sessions`;

            let body = JSON.stringify({
                email: this.email,
                password: this.password
                });
        
                let headers = new Headers({
                'Content-Type': 'application/json'
                });

                try {
                    let response = await fetch(url, { method: 'post', headers, body });
              
                    let json2 = await response.json();
                    let localStorage = window.localStorage;
                    localStorage.setItem('auth-token', json2.token);
              
                    return this.transitionToRoute('layouts');
                  } catch (e) {
                    console.log(e);
                  }
        }
}