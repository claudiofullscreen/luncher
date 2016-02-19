import React from "react"
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
    var displayForm = this.hasLoggedIn() ? "identification__form hide" : "identification__form show"
    var displayInput = this.hasLoggedIn() ? "identification__input hide" : "indentification__input show"
    var displaySubmit = this.state.firstName == "" ? "identification__submit hide" : "identification__submit show"
    return (
      <form className={displayForm} onSubmit={this.handleSubmit}>
        <input type="text" className={displayInput} placeholder="What is your name?" value={this.state.firstName} onChange={this.handleNameChange} />
        <input className={displaySubmit} type="submit" value="Enter" />
      </form>
    )
  }
})

export default IdentificationForm