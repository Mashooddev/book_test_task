import React, { createContext, useState } from 'react';

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [count, setCount] = useState(0); // Initialize with a number, not an array

  console.log("use count", count);

  return (
    <BookContext.Provider value={{ count, setCount }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
