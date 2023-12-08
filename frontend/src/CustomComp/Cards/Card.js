import React, { useEffect, useState } from 'react'
import './Card.css'
import "../Button/Button.css"
import Button from '../Button/Button'
import {BookContext} from "../../BookContextProvider"
import { useContext } from "react";





const Card = (bookdetail) => {
  const { count, setCount } = useContext(BookContext);
  const bookDetail = bookdetail.bookdetail


async  function placeOrder() {
    try {
      const userId = localStorage.getItem("userID");
      const bookId = bookDetail.id;

      const requiredData = {
        userId: userId,
        bookId: bookId,
      }
  
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
      console.log("requiredData", requiredData);
  
      const response = await fetch("http://localhost:3000/order/place",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requiredData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log("yaha tk working");

      const data = await response.json();
      console.log("Data received:", data);
      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error placing order:", error.message);
      // You can add additional error handling or show a user-friendly message
    }
  }

  
  
  
  return (
    <>
      <div className="book_card">
        <div className="card_img mt-3">
          <img src={bookDetail.cover} alt="Book Image" />
        </div>
        <div className="book_name mt-1">
          <h3>{bookDetail.title}</h3>
        </div>
        <div className="book_author">
          <h3>{bookDetail.publisher}</h3>
          <span>{bookDetail.tags}</span>
        </div>
        <div className="book_proce">
          <h3>${bookDetail.price}</h3>
        </div>
        <div className='btns'>
          <button type="button" onClick={placeOrder} className="addButton mb-2">
            Place Order
          </button>
        </div>
      </div>
    </>
  )
}

export default Card
