// Button.js
import React, { useState } from 'react';
import './Button.css';
import { useContext } from 'react';
import { BookContext } from '../../BookContextProvider';
const Button = () => {
  const { count, setCount } = useContext(BookContext);
  console.log(count)
  const clickHandler = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <>
      <button type="button" onClick={clickHandler} className="addButton mb-2">
        Place Order
      </button>
    </>
  );
};

export default Button;
