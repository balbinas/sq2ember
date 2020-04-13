import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {

    loggedIn = window.localStorage.getItem('auth-token') ? true : false;

    @action
        async signout() {
            let localStorage = window.localStorage;
            localStorage.removeItem('auth-token');
            return this.transitionToRoute('login');
        }
}