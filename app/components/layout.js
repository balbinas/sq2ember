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
    let pressMetaKey = event.metaKey;
    
    if (selectedRectangle) {
      if (pressShiftKey) {
        this.deleteRectangle(event.target.id);
      } else if(pressMetaKey && event.pageX >= this.maxX - 5 && event.pageY >= this.maxY - 5) {
        this.resizing = true;
        this.rectId = event.target.id;
        console.log("detects resizing", this.resizing)
      } else {
        console.log("detects dragging")
        this.dragging = true;
        this.rectId = event.target.id;
      }
    }
  }

	mouseUp(event) {
    let x = event.pageX - this.minX;
    let y = event.pageY - this.minY;
    
    if (this.dragging) {
      let distX = x - this.clickX;
      let distY = y - this.clickY;

      let rect = {}
      
      this.updateRectangle(rect, this.rectId, distX, distY, 'drag');
    } else if (this.resizing) {
      let distX = x - this.clickX;
      let distY = y - this.clickY;
      let rect = {
        startX: this.minX,
        startY: this.minY,
        endX: this.maxX + distX,
        endY: this.maxY + distY
      }
      this.updateRectangle(rect, this.rectId, 0, 0, 'resize');
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