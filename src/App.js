import React from 'react';
import './App.css';
import AllMessages from './AllMessages.js';
import SendEmail from'./SendEmail.js';

class App extends React.Component {
  state = {
    allMessagesState: false,
  }
  changeAllMessageState() {
    this.setState({ allMessagesState: !this.state.allMessagesState })
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>Mock Email App!</h1>
        </div>
        <SendEmail />
        <AllMessages />
      </div>
    );
  }
}

export default App;

// View all of my email messages (subject line + sender)
// View one of my email messages with all of its details
// Send an email
// Search for a specific email by subject