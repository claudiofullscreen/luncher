import React from "react"
import ReactDOM from "react-dom"
import QuestionGame from "../components/question_game_components"
import EVENTS from "../constants"
var EventEmitter = require("events").EventEmitter

var QuestionStore = Object.assign({}, EventEmitter.prototype, {
  _store: [],
  resetStore(data) {
    this._store = data
    this.emit(EVENTS.CHANGE)
  },
  getStoreState() {
    return this._store
  }
})

export default QuestionStore
