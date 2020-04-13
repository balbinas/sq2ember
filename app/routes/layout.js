import Route from '@ember/routing/route';
import ENV from 'squared-up/config/environment';
import { action } from '@ember/object';
import fetch, { Headers } from 'fetch';

export default class Layout extends Route {
  
  async model(params) {
    let url = `${ENV.APP.BACKEND}/layouts/${params.id}/rectangles`;
    let url2 = `${ENV.APP.BACKEND}/layouts/${params.id}`;
    let localStorage = window.localStorage;
    let headers = new Headers({
      'Authorization': localStorage.getItem('auth-token')
      });

    let response = await fetch(url, { method: 'get', headers });

    let response2 = await fetch(url2, { method: 'get', headers });

    return { rectangles: await response.json(), layout: await response2.json() }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    console.log(model)

    controller.set('rectangles', model.rectangles);
    controller.set('layout', model.layout);
}
            
}