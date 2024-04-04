/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const { username: urlUsername } = useParams();
  console.log("urlUsername:", urlUsername);

  const socket = io("http://localhost:8080");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      socket.emit("chat_message", { text, username });
      setText("");
    }
  };

  useEffect(() => {
    console.log("Chat Component: useEffect is running");

    const storedToken = localStorage.getItem("authToken");
    console.log("Chat Component: Stored token here:", storedToken);

    if (storedToken) {
      axios
        .get(`http://localhost:8080/chat/${urlUsername}`, {
          headers: {
            Authorization: storedToken,
          },
        })
        .then((response) => {
          if (urlUsername && !username) {
            setUsername(urlUsername);
            socket.emit("username", urlUsername);
          }
        })
        .catch((error) => {
          console.error("Chat Component: Token verification failed:", error);
        });
    } else {
      console.log("Chat Component: No token found");
    }

    const handleIsOnline = ({ username, status }) => {
      console.log(`Chat Component: User ${username} ${status}`);
      if (status === "connected") {
        const onlineMessage = (
          <span>
            <i
              className="bi bi-circle-fill text-success"
              style={{ marginRight: "5px" }}
            ></i>
            <strong>{username}:</strong> is now connected...
          </span>
        );
        setMessages((prevMessages) => [...prevMessages, onlineMessage]);
      } else if (status === "disconnected") {
        const disconnectMessage = (
          <span>
            <i
              className="bi bi-circle-fill text-danger"
              style={{ marginRight: "5px" }}
            ></i>
            <strong>{username}:</strong> disconnected...
          </span>
        );
        setMessages((prevMessages) => [...prevMessages, disconnectMessage]);
      }
    };

    const handleChatMessage = (msg) => {
      console.log("Chat Component: Received message", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("is_online", handleIsOnline);
    socket.on("chat_message", handleChatMessage);

    // Clean up event listeners on component unmount
    return () => {
      socket.off("chat_message", handleChatMessage);
      socket.off("is_online", handleIsOnline);
      console.log("Chat Component: Cleanup");
    };
  }, []);

  return (
    <div className="chat-container">
      <h1 className="text-center mb-3">
        <i className="bi bi-chat-dots"></i> Web Chat
      </h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.text ? (
              <span>
                <strong>{msg.username}:</strong>
                <i> {msg.text}</i>
              </span>
            ) : (
              <em>{msg}</em>
            )}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="fixed-bottom-form chat-input-container"
      >
        <div className="form-floating mb-3">
          <input
            className="chat-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
          />
        </div>
        <button className="send-button" type="submit">
          <i class="bi bi-send"></i>
        </button>
        &nbsp; &nbsp;
        <a href="/">
          <button className="logout-button" type="button">
            <i class="bi bi-power"></i>
          </button>
        </a>
      </form>
    </div>
  );
};

export default Chat;
