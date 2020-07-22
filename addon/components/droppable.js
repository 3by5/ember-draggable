import Component from '@glimmer/component'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'

export default class Droppable extends Component {
  @service draggable;

  droppableId = this.args.droppableId

  @action
  draggingOver() {
    if(!this.draggable.isDragging) { return null }
    this.draggable.setDestination({
      droppableId: this.droppableId
    })
    console.log(`Over Droppable ${this.droppableId}`)
  }

  @action
  startDrag(e) {
    e.preventDefault()
    this.draggable.setSource({
      droppableId: this.droppableId
    })
  }

  @action
  finishDrag() {
    this.draggable.drop()
  }
}