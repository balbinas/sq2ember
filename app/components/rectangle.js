import Component from '@glimmer/component';

export default class extends Component {
  get width() {
    return this.args.endX - this.args.startX;
  }
  
  get height() {
    return this.args.endY - this.args.startY;
  }
}
