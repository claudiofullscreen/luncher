import React from "react"
import ReactDOM from "react-dom"

var EventEmitter = require("events").EventEmitter
const CHANGE_EVENT = "change"


var QuestionGame = React.createClass({
  getInitialState() {
    return { 
      question: {text: "Loading..."},
      options: []
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
        <QuestionOptionList options={this.state.options} />
      </div>
    )
  }
})

var QuestionText = React.createClass({
  render() { return (<div>{this.props.text}</div>) }
})

var QuestionOptionList = React.createClass({
  render() {
    var options = this.props.options
    return (
      <ul>
        {options.map(function(option) {
          return <li key={option.id}>{option.name}</li>
        })}
      </ul>
    )
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
