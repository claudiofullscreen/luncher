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
import {Socket} from "phoenix"
import React from "react"
import ReactDOM from "react-dom"
import jquery from "jquery"

var IdentificationBox = React.createClass({
  getInitialState() {
    return { isLoggedIn: false, firstName: "" }
  },
  componentDidMount() {
    $.get({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(response) {
        if (response.data == null)
          this.setState({isLoggedIn: false, firstName: ""})
        else
          this.setState({isLoggedIn: true, firstName: response.data.first_name})
      }.bind(this),
      failure: function(response) {
        console.log("NO GOOD")
      }
    })
  },
  handleIdentificationSubmit(data) {
    $.post({
      url: this.props.url,
      dataType: 'json',
      data: {
        session: data
      },
      cache: false,
      success: function(response) {
        this.setState({ isLoggedIn: true, firstName: data.first_name })
      }.bind(this),
      failure: function(response) {
      }.bind(this)
    })
  },
  handleLogout() {
    var that = this
    $.ajax({
      url: this.props.url,
      type: "DELETE",
      success: function(data) {
        that.setState({ isLoggedIn: false, firstName: "" })
      }
    })
  },
  render() {
    return (
      <div>
        <IdentificationForm firstName={this.state.firstName} onSubmit={this.handleIdentificationSubmit} />
        <Greeting firstName={this.state.firstName} />
        <SignOffButton isLoggedIn={this.state.isLoggedIn} onClick={this.handleLogout} />
      </div>
    )
  }
})

var SignOffButton = React.createClass({
  handleLogout() {
    this.props.onClick()
  },
  render() {
    var displayClass = this.props.isLoggedIn ? "show" : "hide"
    return (<button className={displayClass} onClick={this.handleLogout}>Not me!</button>)
  }
})

var Greeting = React.createClass({
  render() {
    var displayClass = this.props.firstName == "" ? "hide" : "show"
    return(<div className={displayClass}>Hello {this.props.firstName}</div>)
  }
})

var IdentificationForm = React.createClass({
  getInitialState() {
    return { firstName: this.props.firstName, wasFormSubmitted: false }
  },
  hasLoggedIn() {
    return this.props.firstName != ""
  },
  handleNameChange(e) {
    this.setState({firstName: e.target.value})
  },
  handleSubmit(e) {
    e.preventDefault()
    var firstName = this.state.firstName.trim()
    if (!firstName) {
      return
    }
    this.props.onSubmit({first_name: firstName})
    this.setState({firstName: "", wasFormSubmitted: true})
  },
  render() {
    var displayForm = this.hasLoggedIn() ? "hide" : "show"
    var displaySubmit = this.state.firstName == "" ? "hide" : "show"
    return (
      <form className={displayForm} onSubmit={this.handleSubmit}>
        <input type="text" className={displayForm} placeholder="What is your name?" value={this.state.firstName} onChange={this.handleNameChange} />
        <input className={displaySubmit} type="submit" value="Enter" />
      </form>
    )
  }
})

window.onload = () => {
  ReactDOM.render(
    <IdentificationBox url="/api/session"/>, document.getElementById("identification-form")
  )
}
