import React from "react"
import ReactDOM from "react-dom"

var EventEmitter = require("events").EventEmitter
const CHANGE_EVENT = "change"


var QuestionGame = React.createClass({
  getInitialState() {
    return { 
      question: {text: "Loading..."},
      options: [{name: "No options yet..."}]
    }
  },
  componentDidMount() {
    QuestionStore.on(CHANGE_EVENT, this.onChange)
  },
  componentWillUnmount() {
    QuestionStore.removeEventListener(CHANGE_EVENT, this.onChange)
  },
  onChange() {
    this.setState(QuestionStore.getStoreState())
  },
  render() {
    return (
      <div>
        <QuestionText text={this.state.question.text}/>
        <QuestionOption />
      </div>
    )
  }
})

var QuestionText = React.createClass({
  render() { return (<div>{this.props.text}</div>) }
})

var QuestionOption = React.createClass({
  render() {
    return (<div>hello there this is an option</div>)
  }
})


var QuestionStore = Object.assign({}, EventEmitter.prototype, {
  _store: [],
  init(socket, questionElement) {
    let questionId = questionElement.getAttribute("data-id")
    let questionChannel = socket.channel("questions:" + questionId)
    
    questionChannel.join()
      .receive("ok", resp => {
        this._store = resp
        this.emit(CHANGE_EVENT)
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
