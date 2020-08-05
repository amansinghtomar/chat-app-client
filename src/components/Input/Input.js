import React from 'react';
import './Input.css';
import btn from '../../icons/btn1.svg'


const Input = ({ setMessage, sendMessage, message, typing, isDisable }) => {
  const btnPress = (event) => {
    sendMessage(event)
    document.getElementById("screenBox").focus();
  }
  return (
    <form className="form">
      <input
        disabled={isDisable}
        className="input"
        type="text"
        placeholder="Type a message..."
        id="screenBox"
        value={message}
        onChange={({ target: { value } }) => {
          setMessage(value);
          typing();
        }}
        onKeyPress={(event) => event.key === "Enter" && btnPress(event)}
      />
     

      <img
        //className="sendButton"
        style={{ width: "50px", height: "50px" }}
        src={btn}
        alt="my image"
        onClick={(e) => btnPress(e)}
        //disabled={isDisable}
      />
    </form>
  );
}

export default Input;