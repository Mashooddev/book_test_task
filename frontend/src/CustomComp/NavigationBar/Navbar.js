import React from "react";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { BookContext } from "../../BookContextProvider";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";


const NavbarComp = () => {
  const { count, setCount } = useContext(BookContext);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const handleClose = () => {
    setShowSignUp(false);
    setShowLogIn(false);
  };

  const handleSignUpShow = () => {
    setShowSignUp(true);
    setShowLogIn(false);
  };

  const handleLogInShow = () => {
    setShowLogIn(true);
    setShowSignUp(false);
  };


  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [logInData, setLogInData] = useState({
    email: '',
    password: '',
  });
  const [userID, setUserID] = useState("")
  const [userName, setUserName] = useState("")
  const [logStatus, setLogStatus] = useState(false)

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogInInputChange = (e) => {
    const { name, value } = e.target;
    setLogInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          // Add any other headers as needed
        },
        body: JSON.stringify(signUpData), // Convert data to JSON string
      });



      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setShowSignUp(false);
      const data = await response.json();
      console.log('Data received:', data);
    } catch (error) {
      console.error('Error making POST request:', error.message);
    }
  };

  

  const handleLoginProcess = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          // Add any other headers as needed
        },
        body: JSON.stringify(logInData), // Convert data to JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setShowLogIn(false);
      const data = await response.json();
      const userData = data.user
      setUserID(userData.id)
      setUserName(userData.username)
      setLogStatus(true)
    } catch (error) {
      console.error('Error making POST request:', error.message);
    }
  };
  

  localStorage.setItem('userID', userID);
  
  function handleLogOutSetting() {
    setLogStatus(false)
    setCount(0); 
    localStorage.setItem('userID', null);
  }

  const [orderCount, setOrderCount] = useState(0)
  async function getOrderCount() {
    try {
      const response = await fetch("http://localhost:3000/order/totalOrdersCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setOrderCount(data.totalCount)
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getOrderCount()
  }, [])
  return (
    <>
      <div className="Navigation_bar">
        <div className="logo_title">
          <h1>BookShop</h1>
        </div>
        <div className="search_input">
          <div class="">
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Search"
              className="input_field"
            />
          </div>
        </div>
        <div className="cart_menu">
          <div className="cart">
            <FaShoppingCart className="logo_cart" />
            <span className="counter">{count}</span>
          </div>
          <div className="auth-btn">
          {
          logStatus ? 
            <div className="logingstatuset">
              <div className="userNameSetting">{userName}</div>
              <button className="LogInBnt" onClick={handleLogOutSetting}>
                Log Out
              </button>
            </div>
             : 
            <button className="LogInBnt" onClick={handleLogInShow}>
              Log In
            </button>
          }
            
          </div>
        </div>
      </div>


      {/* signUp model is here */}
      <Modal show={showSignUp} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Enter Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                autoFocus
                name="username"
                value={signUpData.username}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                autoFocus
                name="email"
                value={signUpData.email}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoFocus
                name="password"
                value={signUpData.password}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <div onClick={handleLogInShow}>Click here to Login</div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={handleSignUp}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* signUp model is here */}




      {/* SignIn model is here */}
      <Modal show={showLogIn} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                autoFocus
                name="email"
                value={logInData.email}
                onChange={handleLogInInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoFocus
                name="password"
                value={logInData.password}
                onChange={handleLogInInputChange}
              />
            </Form.Group>
            <div onClick={handleSignUpShow}>Click here to Sign Up</div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={handleLoginProcess}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      {/* SignIn model is here */}
    </>
  );
};

export default NavbarComp;
