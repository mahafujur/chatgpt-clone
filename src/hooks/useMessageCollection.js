import { useState, useEffect } from 'react';
import {readFromLocalStorage, writeToLocalStorage} from "../utils/localStorage.js";
import {LOCAL_STORAGE} from "../utils/constant.js";

const useMessageCollection = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = readFromLocalStorage(LOCAL_STORAGE.MESSAGE);
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length) {
      writeToLocalStorage(LOCAL_STORAGE.MESSAGE, messages);
    }
  }, [messages]);


  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearChat = () => {
    writeToLocalStorage(LOCAL_STORAGE.MESSAGE,[]);
    setMessages([]);
  };

  return { messages, addMessage, clearChat };
};

export default useMessageCollection;
