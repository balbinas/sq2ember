import Controller from '@ember/controller';
import { action } from "@ember/object";
import fetch, { Headers } from 'fetch';
import ENV from 'squared-up/config/environment';


export default class LayoutController extends Controller {

	@action
  async addRectangle(rect) {
    this.count++

    let url = `${ENV.APP.BACKEND}/rectangles`;

    let route = this.target.currentURL.split('/');
    let layoutId = route[route.length - 1];

    let body = JSON.stringify({
        startX: rect.startX,
        endX: rect.endX,
        startY: rect.startY,
        endY: rect.endY,
        color: rect.color,
        layout_id: layoutId
    });

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('auth-token')
    });

    try {
        let response = await fetch(url, { method: 'post', headers, body });
        this.model = await this._reloadModel();
      } catch (e) {
        console.log(e);
      }

      this.model = this.model
  }

  @action
  async updateRectangle(rect, id, distX, distY, type) {
    let ogRect;
    
    for (let i = 0; i < this.model.length; i++) {
      if (id == this.model[i].id) {
        ogRect = this.model[i];
        break;
      }
    };

    let url = `${ENV.APP.BACKEND}/rectangles/${id}`;

    let body = JSON.stringify({
      startX: ogRect.startX + distX,
      endX: ogRect.endX + distX,
      startY: ogRect.startY + distY,
      endY: ogRect.endY + distY,
      layout_id: ogRect.layout_id
    });
    
    let body2 = JSON.stringify({
      startX: rect.startX,
      endX: rect.endX,
      startY: rect.startY,
      endY: rect.endY,
      layout_id: ogRect.layout_id
    });

    console.log("body1", body)
    console.log("body2", body2)

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('auth-token')
    });

    try {
      if (type == 'drag') {
        let response = await fetch(url, { method: 'put', headers, body });
      } else {
        let response = await fetch(url, { method: 'put', headers, body2 });
      }
        this.model = await this._reloadModel();
      } catch (e) {
        console.log(e);
      }
  }

  @action
  async deleteRectangle(id) {
    let ogRect;
    
    for (let i = 0; i < this.model.length; i++) {
      if (id == this.model[i].id) {
        ogRect = this.model[i];
        break; 
      }
    };
    
    let url = `${ENV.APP.BACKEND}/rectangles/${id}`;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('auth-token')
    });

    try {
      let response = await fetch(url, { method: 'delete', headers });
      this.model = await this._reloadModel();
      } catch (e) {
        console.log(e);
      }
  }

  async _reloadModel() {
    let route = this.target.currentURL.split('/');
    let layoutId = route[route.length - 1];

    let url = `${ENV.APP.BACKEND}/layouts/${layoutId}/rectangles`;
    let localStorage = window.localStorage;
    let headers = new Headers({
      'Authorization': localStorage.getItem('auth-token')
      });

    let response = await fetch(url, { method: 'get', headers });

    return response.json()
  }
}
