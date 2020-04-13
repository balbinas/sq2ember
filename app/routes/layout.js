import Route from '@ember/routing/route';
import ENV from 'squared-up/config/environment';
import { action } from '@ember/object';
import fetch, { Headers } from 'fetch';

export default class Layout extends Route {
  
  async model(params) {
    let url = `${ENV.APP.BACKEND}/layouts/${params.id}/rectangles`;
    let localStorage = window.localStorage;
    let headers = new Headers({
      'Authorization': localStorage.getItem('auth-token')
      });

    let response = await fetch(url, { method: 'get', headers });

    return response.json()
  }
            
}