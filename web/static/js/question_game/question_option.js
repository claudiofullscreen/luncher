import React from "react"
import ReactDOM from "react-dom"

var QuestionOption = React.createClass({
  render() {
    return (<div>hello there</div>)
  }
})

var QuestionStore = {
  init(socket, questionElement) {
    let questionId = questionElement.getAttribute("data-id")

    let questionChannel = socket.channel("questions:" + questionId)
    questionChannel.join()
      .receive("ok", resp => console.log("asdf is", resp))
      .receive("error", resp => console.log("harder to"))
    ReactDOM.render(
      <QuestionOption />, questionElement
    )        
  }
}

export default QuestionStore
