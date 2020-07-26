import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState("");
    
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
      const { name, room } = queryString.parse(location.search);
      console.log('name is', name)
      console.log('Room is', room)
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
    });
     
     
  }, []);

    

  const sendMessage = (e) => {
    e.preventDefault();

    if ((message, message))
        socket.emit("sendMessage", message, () => { setMessage(""); });
    };
    
    const typings = () => {
        socket.emit("typing", 'typing', () =>{});
    }
  console.log(message, messages);
  return (
    <div className="outerContainer">
          <div className="container">
             
              <Infobar room={room} />
              <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
                  sendMessage={sendMessage}
                  typing={typings}
              />
            
      </div>
    </div>
  );
};

export default Chat;
