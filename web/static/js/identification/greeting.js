import React from "react"
var Greeting = React.createClass({
  render() {
    var displayClass = this.props.firstName == "" ? "hide" : "show"
    return(<div className={displayClass}>Hello {this.props.firstName}</div>)
  }
})

export default Greeting