import React from "react"
import ReactDOM from "react-dom"
import QuestionGame from "./components/question_game_components"
import EVENTS from "./constants"

var EventEmitter = require("events").EventEmitter

var QuestionStore = Object.assign({}, EventEmitter.prototype, {
  _store: [],
  init(socket, questionElement) {
    let questionId = questionElement.getAttribute("data-id")
    let questionChannel = socket.channel("questions:" + questionId)
    
    questionChannel.join()
      .receive("ok", resp => {
        this._store = resp
        this.emit(EVENTS.CHANGE)
      })
      .receive("error", resp => console.log("harder to"))

    ReactDOM.render(
      <QuestionGame />, questionElement
    )
  },
  getStoreState() {
    return this._store
  }
})

export default QuestionStore
