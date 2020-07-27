import Controller from '@ember/controller'
import { action } from '@ember/object'

export default class ApplicationController extends Controller {

  basicDragItems = [
    1,
    2,
    3
  ]

  @action
  reorderItems(dragResult) {
  }
}