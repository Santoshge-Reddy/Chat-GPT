// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BsBack } from "react-icons/bs";

const { useState, Fragment } = React;
const url = 'https://rakeshkumarwebanalytic.pythonanywhere.com/rest'
// var url = 'http://127.0.0.1:5000/rest'


  
function App() {

  const [value, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  
  const updateValue = ({ target }) => setInputValue(target.value); 


  const addPosts = async (data) => {
    setIsLoading(true)
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
      const newMessage = <NewMessage key={time} message={message} timeStamp={time} copy={true} meta='AI: ' />;
      setIsLoading(false)
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
    const newMessage = <NewMessage key={time} message={value} timeStamp={time} copy={false} meta='Human: ' />;
    setMessages(prevState => ([...prevState, newMessage]));
    setInputValue('');

    var text = ''
    messages.forEach(myFunction);
    function myFunction(item) {
      text = `${text} \n\n ${item.props.meta} ${item.props.message} \n\n`
    }
    text = `${text} \n\n ${value}`
    // console.log(text)
    addPosts(text)
    
  }

  return (
    <>
      <div className="chat--box">
        {messages}
        { isLoading ? <div className="message__container">
              <div className='loading'>Loading .............</div>
            </div> : '' }
      </div>
      <div className="input--form">
        <TextField handleOnChange={updateValue} value={value}  />
        <button className="btn--submit" onClick={updateMessages} >   Generate </button>
      </div>
    </>
  );

 
}

const TextField = ({ value, handleOnChange }) => (
  <>
  <input placeholder="Write your message" onChange={handleOnChange} value={value} />
  {/* <BsFillCaretRightFill /> */}
  </>
)

const NewMessage = ({ message, timeStamp, copy }) => (
  <div className="message__container">
    <div>{message}</div>
    {/* <div>{timeStamp}</div> */}
    {copy ? <div style={{marginRight:'10px'}} onClick={() => {navigator.clipboard.writeText(message)}}><BsBack /></div> : ''}
  </div>
);

export default App;


