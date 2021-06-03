import React from 'react';

class AllMessages extends React.Component {
  constructor (props) {
  super(props)
  this.state = {
    messageHTML: [],
    allMessageData: {},
  }
  }
async fetchMail() {
  const url = 'http://localhost:3001/emails'
  let response = await fetch(url)
  let data = await response.json()
  this.setState({allMessageData: {data}})
  data = data.map(obj => {
    let newObj = `sender: ${obj.sender}, subject: ${obj.subject}`;
    newObj = <div>{newObj}<button id={obj.id} onClick={this.expandEmail.bind(this)}>Expand</button></div>
    this.setState({messageHTML: [...this.state.messageHTML, newObj]})
    return newObj
    })
}
expandEmail (event) {
  console.log(event)
  if(event.target.nodeName === 'SPAN') {
    return;
  } else {
  let obj = this.state.allMessageData.data[event.target.id-1]
  let text = `Date: ${obj.date}, Message: ${obj.message}`
  let newElement = document.createElement("span")
  newElement.onClick=newElement.remove();
  newElement.innerHTML = text;
  let currentElement = document.getElementById(event.target.id)
  currentElement.appendChild(newElement)
  }
}
clearMessages(){
  this.setState(this.state.messageHTML = [])
}
searchMessage(event) {
  event.preventDefault()
  console.log(event.target[0].value)
  let searchSubject = event.target[0].value
  for (let each in this.state.allMessageData.data) {
    console.log(each)
    if (searchSubject === each.subject) {
      let messageDetails = `sender: ${each.sender}, subject: ${each.subject}, Date: ${each.date}, Message: ${each.message}`
      let message = document.createElement("div")
      message.innerHTML = messageDetails;
      document.body.appendChild(message);
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