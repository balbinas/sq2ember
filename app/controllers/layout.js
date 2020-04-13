import Controller from '@ember/controller';
import { action } from "@ember/object";
import fetch, { Headers } from 'fetch';
import ENV from 'squared-up/config/environment';
import { tracked } from '@glimmer/tracking';

export default class LayoutController extends Controller {

  @tracked
  rectangles = []

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
      console.log("add rectangles call")
        let response = await fetch(url, { method: 'post', headers, body });
        this.rectangles = await this._reloadModel();
      } catch (e) {
        console.log(e);
      }

      this.rectangles = this.rectangles
  }

  @action
  async updateRectangle(id, distX, distY, type) {
    let ogRect;
    let body = '';
    
    for (let i = 0; i < this.rectangles.length; i++) {
      if (id == this.rectangles[i].id) {
        ogRect = this.rectangles[i];
        break;
      }
    };

    let url = `${ENV.APP.BACKEND}/rectangles/${id}`;

    if (type == 'drag') {
      body = JSON.stringify({
        startX: ogRect.startX + distX,
        endX: ogRect.endX + distX,
        startY: ogRect.startY + distY,
        endY: ogRect.endY + distY,
        layout_id: ogRect.layout_id
      });
    } else {

      body = JSON.stringify({
        startX: ogRect.startX,
        endX: ogRect.endX + distX,
        startY: ogRect.startY,
        endY: ogRect.endY + distY,
        layout_id: ogRect.layout_id
      });
    }

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('auth-token')
    });

    try {
      let response = await fetch(url, { method: 'put', headers, body })

      this.rectangles = await this._reloadModel();

      } catch (e) {
        console.log(e);
      }
  }

  @action
  async deleteRectangle(id) {
    let ogRect;
    
    for (let i = 0; i < this.rectangles.length; i++) {
      if (id == this.rectangles[i].id) {
        ogRect = this.rectangles[i];
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
      this.rectangles = await this._reloadModel();
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
