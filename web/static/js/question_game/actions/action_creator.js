import QuestionStore from "../stores/question_store"
import React from "react"
import ReactDOM from "react-dom"

var ActionCreator = {
   init(socket, questionElement) {
    let questionId = questionElement.getAttribute("data-id")
    let questionChannel = socket.channel("questions:" + questionId)
    
    questionChannel.join()
      .receive("ok", resp => {
        QuestionStore.resetStore(resp)
      })
      .receive("error", resp => console.log("harder to"))

    questionChannel.on("new_option_added", (resp) => {
      console.log("need to add this option to store", resp)
    })
  }
}

export default ActionCreator