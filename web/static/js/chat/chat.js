import {Socket} from "phoenix"
import React from "react"

var ChatApp = React.createClass({
  getInitialState() {
    return { 
      users: []
    }
  },
  componentDidMount() {
    let elem = document.getElementById("question")
    if (elem) {
      let questionID = elem.getAttribute("data-id")
      this._subscribe(questionID)
    }
  },
  _subscribe(questionID) {
    let socket = new Socket("/socket")
    socket.connect()
    let questionChannel = socket.channel("questions:" + (questionID + 1))
    questionChannel.join().receive("ok", chan => { console.log("joined the channel!!!") })

    questionChannel.on("user.entered", msg => {
      console.log("new msg!!!!!")
    })

    questionChannel.on("ping", ({count}) => console.log("PING", count))
  },
  render() {
    return (
      <div>Who is here?</div>
    )
  }
})

export default ChatApp