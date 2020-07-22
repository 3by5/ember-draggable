import Service from '@ember/service'

export default class DraggableService extends Service {
  currentDraggable = null;
  isDragging = false;
  source = null;
  sourceIndex = null;
  destination = null;
  destinationIndex = null;

  setDraggable(draggable) {
    this.currentDraggable = draggable
  }

  startDrag() {
    this.isDragging = true
  }

  setSource(source) {
    this.source = source
    console.log(this.source)
  }

  setSourceIndex(index) {
    this.sourceIndex = index
  }

  setDestination(destination) {
    this.destination = destination
    console.log(this.destination)
  }

  setDestinationIndex(index) {
    this.destinationIndex = index
    console.log(`Destination Index: ${this.destinationIndex}`)
  }

  drop() {
    let dragResult = {
      draggable: this.currentDraggable,
      source: {
        ...this.source,
        index: this.sourceIndex
      },
      destination: {
        ...this.destination,
        index: this.destinationIndex
      }
    }
    this._resetState()
    console.log(dragResult)
    return dragResult
  }

  _resetState() {
    this.currentDraggable = null
    this.source = null
    this.sourceIndex = null
    this.destination = null
    this.destinationIndex = null
    this.isDragging = false
  }
}