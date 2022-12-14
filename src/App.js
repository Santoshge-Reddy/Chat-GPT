import logo from './logo.svg';
import './App.css';
import React from 'react';
const { useState, Fragment } = React;
const url = 'https://rakeshkumarwebanalytic.pythonanywhere.com/rest'
// var url = 'http://127.0.0.1:5000/rest'


  
function App() {

  const [value, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  
  const updateValue = ({ target }) => setInputValue(target.value); 


  const addPosts = async (data) => {
    await fetch(url, {
    method: 'POST',
    // mode: 'no-cors',
    body: JSON.stringify({
      animal : data,
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      var message = data.data.replace(/^\s+|\s+$/g, '');
      const time = new Date().toLocaleTimeString();
      const newMessage = <NewMessage key={time} message={message} timeStamp={time} />;
      setMessages(prevState => ([...prevState, newMessage]));
    })
    .catch((err) => {
       console.log(err.message);
    });
  };


  const updateMessages = () => {
    if (!value) {
      return;
    }

    const time = new Date().toLocaleTimeString();
    const newMessage = <NewMessage key={time} message={value} timeStamp={time} />;
    setMessages(prevState => ([...prevState, newMessage]));
    setInputValue('');

    var text = ''
    messages.forEach(myFunction);
    function myFunction(item) {
      text = `${text} \n\n ${item.props.message} \n\n`
    }
    console.log(text)
    addPosts(value)
    
  }

  return (
    <>
      <div className="chat--box">
        {messages}
      </div>
      <div className="input--form">
        <TextField handleOnChange={updateValue} value={value} />
        <button className="btn--submit" onClick={updateMessages}>Send</button>
      </div>
    </>
  );

 
}

const TextField = ({ value, handleOnChange }) => (
  <>
  <input placeholder="Write your message" onChange={handleOnChange} value={value} />
  </>
)

const NewMessage = ({ message, timeStamp }) => (
  <div className="message__container">
    <div>{message}</div>
    <div>{timeStamp}</div>
  </div>
);

export default App;


