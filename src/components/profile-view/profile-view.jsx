import PropTypes from "prop-types"
import { useParams } from "react-router";
import { Link, Navigate } from "react-router-dom";
import { Button, Row, Col, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card"

export const ProfileView = ( {token, movies, user} ) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("https://myflix-api-3of3.onrender.com/users",
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => {
        const usersFromApi = data.map((doc) => {
          return {
            userId: doc._id,
            Username: doc.Username,
            Name: doc.Name,
            Birthday: doc.Birthday,
            Email: doc.Email,
            Favorites: doc.Favorites
          }
        })
        setUsers(usersFromApi)
      })
  }, [token]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete(user) {
    fetch(`https://myflix-api-3of3.onrender.com/users/${encodeURIComponent(user._id)}`, { headers: { Authorization: `Bearer ${token}` }, method: "DELETE" })
//    .then(onDelete())
      .then(<Navigate to="/" replace/>);
  }

  const { userId } = useParams();

  // const user = users.find((u) => u.userId === userId);

  let Favorites = movies.filter(m => user.Favorites.includes(m.key))

  return (
    <div className="user-view">

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(user)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <span className="bold">Username: </span>
        <span>{user.Username}</span>
      </div>
      <div>
        <span className="bold">Name: </span>
        <span>{user.Name}</span>
      </div>
      <div>
        <span className="bold">Email: </span>
        <span>{user.Email}</span>
      </div>
      <div>
        <span className="bold">Birthday: </span>
        <span>{user.Birthday}</span>
      </div>
      <div>
        <span className="bold">Password: </span>
        <span>{user.Password}</span>
      </div>
      <div>
        <span className="bold">Favorites: </span>
        {Favorites.length === 0 ? (
          <span>You have no movies favorited.</span>
        ) : (
          <Row>
            {Favorites.map((movie) => (
              <Col className="mb-4" key={movie.key} md={6}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Link to={`/users/${encodeURIComponent(user._id)}`}>
        <Button>Edit User Info</Button>
      </Link>
      <Link to={`/`}>
        <Button variant="danger" onClick={handleShow}>Delete User</Button>
      </Link>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>

    </div>
  )
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    Favorites: PropTypes.array
  })
}