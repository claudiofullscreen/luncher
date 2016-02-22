import React from "react"
import ReactDOM from "react-dom"

var EventEmitter = require("events").EventEmitter
const CHANGE_EVENT = "change"

var QuestionGame = React.createClass({
  getInitialState() {
    return { questionText: "", options: [] }
  },
  componentDidMount() {
    QuestionStore.on(CHANGE_EVENT, this.onChange)
  },
  onChange() {
    // change stuff here
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


var QuestionStore = Object.assign({}, EventEmitter.prototype, {
  init(socket, questionElement) {
    let questionId = questionElement.getAttribute("data-id")
    let questionChannel = socket.channel("questions:" + questionId)
    let _store = []
    
    questionChannel.join()
      .receive("ok", resp => {
        _store = resp
        this.emit(CHANGE_EVENT)
      })
      .receive("error", resp => console.log("harder to"))

    ReactDOM.render(
      <QuestionGame />, questionElement
    )
  }
})


export default QuestionStore
