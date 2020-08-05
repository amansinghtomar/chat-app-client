import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Loader from '../Loader/Loader'
let socket;
let timeout;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [status, setStatus] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
   const [Redirect, setRedirect] = useState(false);
  

  const ENDPOINT = "https://friendsnodeapp.herokuapp.com/";

  

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    
    socket.emit("join", { name, room }, () => {});
    console.log('aman')
    return () => {
      socket.emit("disconnect");
      socket.off();
    };

     
  }, [ENDPOINT, location.search]);

  useEffect(() => {


    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      setLoading(true);
      setIsDisable(false);
    });

    socket.on('type', (data) => {
     
        if (data.data) {
          setStatus(`${data.name} is typing`)
        } else {
          setStatus('');
        }
    })
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if ((message, message))
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
  };

  const typingStatus = () => {
    socket.emit("typing", true);
     clearTimeout(timeout);
     timeout = setTimeout(timeoutFunction, 1000);
  };

 const timeoutFunction=()=>{
  socket.emit("typing", false);
}
 //console.log(messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={room} status={status} />
        {loading === true ? (
          <Messages messages={messages} name={name} />
        ) : (
          <Loader
          />
        )}

        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          typing={typingStatus}
          isDisable={isDisable}
        />
      </div>
    </div>
  );
};

export default Chat;
