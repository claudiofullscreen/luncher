import React from "react"
import ReactDOM from "react-dom"

var QuestionGame = React.createClass({
  getInitialState() {
    return { questionText: "", options: [] }
  },
  render() {
    return (
      <div>
        <QuestionTitle title={this.state.questionTitle}/>
        <QuestionOption />
      </div>
    )
  }
})

var QuestionTitle = React.createClass({
  render() { return (<div>This is a question</div>) }
})

var QuestionOption = React.createClass({
  render() {
    return (<div>hello there this is an option</div>)
  }
})

let _store = []
var QuestionStore = {
  init(socket, questionElement) {
    let questionId = questionElement.getAttribute("data-id")

    let questionChannel = socket.channel("questions:" + questionId)
    questionChannel.join()
      .receive("ok", resp => {
        _store = resp
        this.update()
      })
      .receive("error", resp => console.log("harder to"))

    ReactDOM.render(
      <QuestionGame />, questionElement
    )
  },
  update() {
    console.log("here is store contentes" , _store)
  }
}

export default QuestionStore
