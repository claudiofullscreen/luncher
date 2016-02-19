import React from "react"

let SignOffButton = React.createClass({
  handleLogout() {
    this.props.onClick()
  },
  render() {
    var displayClass = this.props.isLoggedIn ? "show" : "hide"
    return (<button className={displayClass} onClick={this.handleLogout}>Not me!</button>)
  }
})

export default SignOffButton