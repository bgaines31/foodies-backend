import React from 'react';
import { Card, Container } from 'react-bootstrap';
import "./login.css"
function Login() {
  return (
    <Container className='d-flex justify-content-center align-items-center '>
      <Card
        style={{ width: '40rem', margin: "10rem" }}
        className="justify-content-center align-items-center"
      >
        <form style={{ width: '30rem', margin: "2rem" }} className="text-center">
          <h3 className="mb-4">Sign In</h3>
          <div className="mb-4">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn register-btn mb-4">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </Card>
    </Container>
  );
}

export default Login;
