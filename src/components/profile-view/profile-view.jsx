import PropTypes from "prop-types"
import { Link, Navigate } from "react-router-dom";
import { Button, Row, Col, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card"
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";


export const ProfileView = () => {

  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch();
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete(user) {
    fetch(`https://myflix-api-3of3.onrender.com/users/${encodeURIComponent(user._id)}`, { headers: { Authorization: `Bearer ${token}` }, method: "DELETE" })
      .then((dispatch(setUser(null)), setToken(null)),
      localStorage.clear(),
      alert("User successfully deleted!"))
      .then(<Navigate to="/" replace/>);
  }

  let Favorites = movies.filter(m => user.Favorites.includes(m.key))
  console.log(user)
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
                <MovieCard movie={movie} syncUser={syncUser} addFav={addFav} removeFav={removeFav}/>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Link to={`/update/${encodeURIComponent(user._id)}`}>
        <Button>Edit User Info</Button>
      </Link>
        <Button variant="danger" onClick={handleShow}>Delete User</Button>
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