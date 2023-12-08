import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../CustomComp/Cards/Card";
import NavbarComp from "../CustomComp/NavigationBar/Navbar";
import "../styles/Home.css";




const Home = () => {
  const [bookList, setBookList] = useState("")


  useEffect(() => {
    getBooks()
  }, [])

  async function getBooks() {
    try {
      const response = await fetch('http://localhost:3000/book/list?page=1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setBookList(data.books)
    } catch (error) {
      return error;
    }
  }
  
  


  return (
    <>
      <NavbarComp />
      <Container className="fluid books_container">
        <div className="Home_Title mt-2">
          <h1>Books List</h1>
        </div>
        <Row>
          <Col>
            <div className="container mt-3">
              {bookList && bookList.map((book, i) => (
                <div key={i}>
                  <Card bookdetail={book} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
