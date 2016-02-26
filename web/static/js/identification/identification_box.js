import React from "react"
import IdentificationForm from "./identification_form"
import Greeting from "./greeting"
import SignOffButton from "./sign_off_button"

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
        <div className="logged-in-panel">
          <Greeting firstName={this.state.firstName} />
          <SignOffButton isLoggedIn={this.state.isLoggedIn} onClick={this.handleLogout} />
        </div>
      </div>
    )
  }
})

export default IdentificationBox