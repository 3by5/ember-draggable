import Component from '@ember/component'
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import { htmlSafe } from '@ember/template';

export default class Draggable extends Component {
  @service draggable;
  @tracked height = 0
  @tracked isDraggingOver = false;
  @tracked isActiveDraggable = false
  startingX = 0
  startingY = 0
  
  domEventHandlers = {
    mouseUp: this._onMouseUp.bind(this),
    mouseMove: this._onMouseMove.bind(this)
  }

  @action
  startDrag(e) {
    e.preventDefault()
    this.draggable.setDraggable({
      draggableId: this.draggableId,
      draggableType: this.draggableType
    })
    this.draggable.setSourceIndex(this.index)
    this.draggable.startDrag()
    this.draggable.isDragging = true
    this.isActiveDraggable = true
    this.startingX = e.clientX
    this.startingY = e.clientY
    this._attachMouseEvents()
  }

  @action
  finishDrag() {
    this.isDraggingOver = false
    this.draggable.isDragging = false
    this.isActiveDraggable = false
    this.startingX = 0
    this.startingY = 0
  }

  @action
  enterItem(e) {
    if(this._notDragging()) { return null }
    this.draggable.setDestinationIndex(this.index)
    this.isDraggingOver = true;
  }

  @action
  leaveItem(e) {
    if(this._notDragging()) { return null }
    this.draggable.setDestinationIndex(null)
    this.isDraggingOver = false; 
  }

  didInsertElement() {
    const rect = this.element.getBoundingClientRect()
    this.height = rect.height
  }

  /* 
    When hovering a draggable, this will expand a placeholder to make 'space' for the draggable in the list
  */
  get placeholderStyle() {
    return htmlSafe(`height: ${this.height}px;`)
  }

  get shouldHide() {
    return (this.isActiveDraggable && !this.draggable.copy)
  }

  _notDragging() {
    return !this.draggable.isDragging
  }

  _attachMouseEvents() {
    document.addEventListener('mousemove', this.domEventHandlers.mouseMove)
    document.addEventListener('mouseup', this.domEventHandlers.mouseUp)
    const rect = this.element.getBoundingClientRect()
    let node = this.element.cloneNode(true)
    node.style.position = 'absolute'
    node.style.zIndex = 10
    node.style.left = `${rect.x}px`
    node.style.top = `${rect.y}px`
    this.draggableNode = node
    document.body.append(this.draggableNode)
  }

  _detachMouseEvent() {
    document.removeEventListener('mousemove', this.domEventHandlers.mouseMove)
    this.draggableNode = null
  }

  _onMouseMove(e) {
    if(!this.draggable.isDragging) { return null }
    const offsetX = e.clientX - this.startingX
    const offsetY = e.clientY - this.startingY
    this.draggableNode.style.transform = `translate(${offsetX}px, ${offsetY}px)`
  }

  _onMouseUp(e) {
    this.finishDrag()
    this.draggableNode.remove()
    this.draggableNode = null
    document.removeEventListener('mouseup', this.domEventHandlers.mouseUp)
  }

}