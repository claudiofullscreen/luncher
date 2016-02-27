import React from "react"
import ReactDOM from "react-dom"
import QuestionGame from "../components/question_game_components"
import EVENTS from "../constants"
var objectAssign = require('object-assign');

var EventEmitter = require("events").EventEmitter

var QuestionStore = Object.assign({}, EventEmitter.prototype, {
  _store: {},
  resetStore(data) {
    this._store = data
    this.emit(EVENTS.CHANGE)
  },
  getStoreState() {
    return this._store
  },
  addOption(option) {
    let newOption = Object.assign(option, {currentScore: 0})
    this._store.options.push(newOption)
    this.emit(EVENTS.CHANGE)
  },
  updateOptionScore(optionId, incrementValue) {
    this._store.options = this._store.options.map(option => {
      if (option.id == optionId) {
        option.currentScore = option.currentScore + incrementValue
        return option
      } else {
        return option
      }
    })
    this.emit(EVENTS.CHANGE)
  }
})

export default QuestionStore
