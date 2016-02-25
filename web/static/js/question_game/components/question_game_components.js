import React from "react"
import QuestionStore from "../stores/question_store"
import EVENTS from "../constants"
import ActionCreator from "../actions/action_creator"

var QuestionGame = React.createClass({
  getInitialState() {
    return { 
      question: {text: "Loading..."},
      options: []
    }
  },
  componentDidMount() {
    QuestionStore.on(EVENTS.CHANGE, this.onChange)
  },
  componentWillUnmount() {
    QuestionStore.removeEventListener(EVENTS.CHANGE, this.onChange)
  },
  onChange() {
    this.setState(QuestionStore.getStoreState())
  },
  render() {
    return (
      <div className="question-game">
        <div className="question-game--remaining-meter">Remaining</div>
        <div className="question-game--main-panel">
          <QuestionText text={this.state.question.text}/>
          <OptionComposer />
          <QuestionOptionList options={this.state.options} />
        </div>
      </div>
    )
  }
})

var QuestionText = React.createClass({
  render() { return (<div id="question-text">{this.props.text}</div>) }
})

var QuestionOptionList = React.createClass({
  render() {
    var options = this.props.options
    return (
      <div className="question-game--option-list">
        {options.map(function(option) {
          return <QuestionOption key={option.id} name={option.name} />
        })}
      </div>
    )
  }
})

var QuestionOption = React.createClass({
  render() {
    return <div className="question-game--option">{this.props.name}</div>
  }
})

var ENTER_KEY_CODE = 13;
var OptionComposer = React.createClass({
  getInitialState() {
    return {text: ""}
  },
  render() {
    return(
      <textarea 
        className="question-game--option-composer"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}/>
    )
  },
  _onChange(event, value) {
    this.setState({text: event.target.value})
  },
  _onKeyDown(event) {
    if (event.keyCode == ENTER_KEY_CODE) {
      event.preventDefault()
      var text = this.state.text.trim()
      if (text) {
        ActionCreator.createNewOption(text)
      }
      this.setState({text: ""})
    }
  }
})



export default QuestionGame
