import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'

export default class Draggable extends Component {
  @service draggable;
  @tracked isDraggingOver = false;
  @tracked isDragging = this.draggable.isDragging
  draggableId = this.args.draggableId
  draggableType = this.args.draggableType
  index = this.args.index

  @action
  startDrag(e) {
    e.preventDefault()
    this.draggable.setDraggable({
      draggableId: this.draggableId,
      draggableType: this.draggableType
    })
    this.draggable.setSourceIndex(this.index)
    this.draggable.startDrag()
  }

  @action
  finishDrag() {
    this.isDraggingOver = false
  }

  @action
  enterItem() {
    if(!this.draggable.isDragging) { return null }
    this.draggable.setDestinationIndex(this.index)
    this.isDraggingOver = true;
  }

  @action
  leaveItem() {
    if(!this.draggable.isDragging) { return null }
    this.draggable.setDestinationIndex(null)
    this.isDraggingOver = false; 
  }
}