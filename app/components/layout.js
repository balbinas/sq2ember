import Component from '@ember/component';

export default class extends Component {
  classNames = ['layout'];
  
  clickX = -1;
  clickY = -1;
  minX = 0;
  minY = 0;
  maxX = 0;
  maxY = 0;
  dragging = false;
  resizing = false;
  rectId = -1;

  didRender() {
    this._super(...arguments);
    
    this.minX = this.element.offsetLeft;
  	this.minY = this.element.offsetTop;
    this.maxX = this.minX + this.element.width;
    this.maxY = this.minY + this.element.height;
  }


	mouseDown(event) {
    this.clickX = event.pageX - this.minX;
    this.clickY = event.pageY - this.minY;
    this.maxX = this.minX + document.getElementById(event.target.id).offsetWidth;
    this.maxY = this.minY + document.getElementById(event.target.id).offsetHeight;
    
    let selectedRectangle = event.target.classList.contains('rectangle');
    let pressShiftKey = event.shiftKey;
    
    if (selectedRectangle) {
      if (pressShiftKey) {
        this.deleteRectangle(event.target.id);
      } else if(event.pageX >= this.maxX - 5 && event.pageY >= this.maxY - 5) {
        this.resizing = true;
        this.dragging = false;
        this.rectId = event.target.id;
      } else {
        this.dragging = true;
        this.resizing = false;
        this.rectId = event.target.id;
      }
    }
  }

	mouseUp(event) {
    let x = event.pageX - this.minX;
    let y = event.pageY - this.minY;
    let distX = x - this.clickX;
    let distY = y - this.clickY;
    
      if (this.dragging) {
      this.updateRectangle(this.rectId, distX, distY, 'drag');
    } else if (this.resizing) {
      this.updateRectangle(this.rectId, distX, distY, 'resize');
    } else {
      let rect = {
        startX: Math.max(0, Math.min(this.clickX, x)),
        startY: Math.max(0, Math.min(this.clickY, y)),
        endX: Math.max(this.clickX, x),
        endY: Math.max(this.clickY, y),
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
      }
      
      this.addRectangle(rect);
    }
    
    this.dragging = false;
    this.resizing = false;
    this.clickX = -1;
    this.clickY = -1;
  }
}