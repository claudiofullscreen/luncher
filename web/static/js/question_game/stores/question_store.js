import React from "react"
import ReactDOM from "react-dom"
import QuestionGame from "../components/question_game_components"
import EVENTS from "../constants"
var objectAssign = require('object-assign');

var EventEmitter = require("events").EventEmitter

var QuestionStore = Object.assign({}, EventEmitter.prototype, {
  _store: [],
  resetStore(data) {
    this._store = data
    this.emit(EVENTS.CHANGE)
  },
  getStoreState() {
    return this._store
  },
  addOption(option) {
    let newOption = objectAssign(option, {id: Math.ceil(Math.random() * 1000)})
    this._store.options.push(newOption)
    this.emit(EVENTS.CHANGE)
  }
})

export default QuestionStore
