import React from "react"
import QuestionStore from "../question_option"
import EVENTS from "../constants"

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

export default QuestionGame
