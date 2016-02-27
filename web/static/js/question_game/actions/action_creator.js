import QuestionStore from "../stores/question_store"
import React from "react"
import ReactDOM from "react-dom"

var ActionCreator = {
  _questionChannel: null,
  init(socket, questionElement) {
    let questionId = questionElement.getAttribute("data-id")
    this._questionChannel = socket.channel("questions:" + questionId)
    
    this._questionChannel.join()
      .receive("ok", resp => {
        QuestionStore.resetStore(resp)
      })
      .receive("error", resp => console.log("harder to"))

    this._questionChannel.on("new_option_added", (option) => {
      QuestionStore.addOption(option)
    })

    this._questionChannel.on("new_vote_point", (data) => {
      QuestionStore.updateOptionScore(data.option_id, data.value)
    })
  },
  createNewOption(optionText) {
    this._questionChannel.push("new_option_added", {name: optionText})
  },
  createNewVotePoint(data) {
    this._questionChannel.push("new_vote_point", data)
  }

}

export default ActionCreator