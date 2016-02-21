// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import socket from "./socket"
import React from "react"
import ReactDOM from "react-dom"
import jquery from "jquery"
import IdentificationBox from "./identification/identification_box"
import ChatApp from "./chat/chat"
import QuestionStore from "./question_game/question_option"
window.onload = () => {

  ReactDOM.render(    
    <IdentificationBox url="/api/session"/>, document.getElementById("identification-form")
  )

  let chatApp = document.getElementById("chat-app")
  if (chatApp) {
    ReactDOM.render(
      <ChatApp />, chatApp
    )    
  }

  let questionElement = document.getElementById("question-game")
  if (questionElement) {
    QuestionStore.init(socket, questionElement)
  }
}
