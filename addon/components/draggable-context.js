import Component from '@glimmer/component'
import { inject as service } from '@ember/service'

export default class DraggableContext extends Component {
  @service draggable

  constructor(owner, args) {
    super(owner, args);
    this.draggable.dropHandler = args.onDrop
    this.draggable.copy = args.copy ?? false
  }

  
}