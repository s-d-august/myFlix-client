import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  if (storedUser === user) {
    return
  } else if (storedUser) {
    dispatch(setUser(storedUser))
  }

  if (storedToken === token) {
    return
  } else if (storedToken) {
    dispatch(setToken(storedToken))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };



    fetch("https://myflix-api-3of3.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUser(data.user));
          dispatch(setToken(data.token))
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <>
    <h4 className="margin-top">Log In</h4>

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button style={{margin: '10px 0px'}} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};
