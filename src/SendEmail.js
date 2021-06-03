import React from 'react';
import './App.css';

const SendEmail = () => {

function handleSubmit(e) {
  e.preventDefault()

  let Message = {
    sender: e.target.sender.value,
    recipient: e.target.recipient.value,
    subject: e.target.subject.value,
    message: e.target.message.value,
    date: new Date(),
    id: 20
  }
  postEmail(Message)
}

async function postEmail (obj) {
  let url = 'http://localhost:3001/send'
  let response= await fetch(url, {
    method:'POST',
    headers: {
      'Content-type': 'application/json'
      },
    body: JSON.stringify(obj)
  })
  // let x = await JSON.stringify(response)
  console.log(response)
  return response
}


  return (
    <form onSubmit= {handleSubmit}>
      <h1>Send Email:</h1>
      From:
      <input name='sender' type='email'></input>
      To:
      <input name='recipient' type='email'></input>
      Subject:
      <input name='subject' type='text'></  input>
      Message:
      <input name='message' type='text'></input>
      <button type='submit'>Send</button>
    </form>

  )
}

export default SendEmail