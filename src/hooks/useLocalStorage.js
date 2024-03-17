import { useState } from 'react';
import {readFromLocalStorage, removeFromLocalStorage, writeToLocalStorage} from "../utils/localStorage.js";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = readFromLocalStorage(key);
      return item ? item : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

     writeToLocalStorage(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (value) => {
   removeFromLocalStorage(value);
  };
  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
