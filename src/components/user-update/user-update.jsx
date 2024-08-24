import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const UserUpdate = (user, token) => {

  var token = user.token
  var user = user.user

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [name, setName] = useState(user.Name);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Name: name,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://myflix-api-3of3.onrender.com/update/${encodeURIComponent(user._id)}`, 
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    ).then((response) => {
      if (response.ok) {
        alert("Information updated!");
        window.location.reload();
      } else {
        alert("Information update failed.");
      }
    });
  };

  return (
    <>
    <h4 className="margin-top">Edit User Info</h4>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button style={{margin: '10px 0px'}} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};
