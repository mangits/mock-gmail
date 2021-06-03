import React from 'react';
import './AllMessages.css'

class AllMessages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageHTML: [],
      allMessageData: {},
    }
  }
  async componentDidMount() {
    const url = 'http://localhost:3001/emails'
    let response = await fetch(url)
    let data = await response.json()
    this.setState({ allMessageData: { data } })
  }
  async fetchMail() {
    const url = 'http://localhost:3001/emails'
    let response = await fetch(url)
    let data = await response.json()
    this.setState({ allMessageData: { data } })
    data = data.map(obj => {
      let newObj = `sender: ${obj.sender}, subject: ${obj.subject}`;
      newObj = <div>{newObj}<button id={obj.id} onClick={this.expandEmail.bind(this)}>Expand</button></div>
      this.setState({ messageHTML: [...this.state.messageHTML, newObj] })
      return newObj
    })
  }
  expandEmail(event) {
    if (event.target.nodeName === 'SPAN') {
      return;
    }
    let obj = this.state.allMessageData.data[event.target.id - 1]
    let text = `  Date: ${obj.date}, Message: ${obj.message}`
    let newElement = document.createElement("span")
    newElement.onClick = newElement.remove();
    newElement.innerHTML = text;
    let currentElement = document.getElementById(event.target.id)
    currentElement.appendChild(newElement)
  }

  clearMessages() {
    this.setState(this.state.messageHTML = [])
  }
  searchMessage(event) {
    event.preventDefault()
    console.log(event.target[0].value)
    let tmpData = this.state.allMessageData.data
    console.log(tmpData)
    let searchSubject = event.target[0].value
    for (let each in tmpData) {
      console.log(tmpData[each].subject)
      if (searchSubject === tmpData[each].subject) {
        console.log("found")
        let messageDetails =
        `sender: ${tmpData[each].sender},
         subject: ${tmpData[each].subject},
         Date: ${tmpData[each].date},
         Message: ${tmpData[each].message}`
        let message = <div>{messageDetails}</div>
        // message.innerHTML = messageDetails;
        // document.body.appendChild(message);
        this.setState(this.state.messageHTML = [])
        this.setState({ messageHTML: [...this.state.messageHTML, message] })
      }
    }
  }
  render() {
    return (
      <div>
        <button onClick={this.fetchMail.bind(this)}>Get All Messages!</button>
        <button onClick={this.clearMessages.bind(this)}>Clear Messages</button>
        <form onSubmit={this.searchMessage.bind(this)}>
          <input type="text"></input>
          <button>Search Subject</button>
        </form>
        <div>
          {this.state.messageHTML}
        </div>
      </div>
    )
  }
}

export default AllMessages