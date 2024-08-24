import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {

if (user.Favorites.includes(movie.key)) {
  var favIcon = <span className="position-absolute top-0 end-0 fs-1" onClick={() => removeFav(user, movie)}>❤️‍</span>
} else {
  var favIcon = <span className="position-absolute top-0 end-0 fs-1" onClick={() => addFav(user, movie)}>🤍</span>
}

function addFav(user, movie) {
  fetch(`https://myflix-api-3of3.onrender.com/users/${encodeURIComponent(user._id)}/movies/${encodeURIComponent(movie.key)}`, 
  { headers: { Authorization: `Bearer ${token}` }, method: "POST" })
  .then((response) => {
    if (response.ok) {
    alert("Successfully added to Favorites.");
    } else {
      alert("Failed to add to Favorites.");
    }
  });
}

function removeFav(user, movie) {
  fetch(`https://myflix-api-3of3.onrender.com/users/${encodeURIComponent(user._id)}/movies/${encodeURIComponent(movie.key)}`, 
  { headers: { Authorization: `Bearer ${token}` }, method: "DELETE" })
  .then((response) => {
    if (response.ok) {
    alert("Successfully removed from Favorites.");
    } else {
      alert("Failed to remove from Favorites.");
    }
  });
}

  return (
      <Card className="h-100" as={Link} to={`/movies/${encodeURIComponent(movie.key)}`}>
        {favIcon}
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body style={{textDecoration: "none"}}>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Director: PropTypes.string,
    key: PropTypes.string.isRequired
  }).isRequired
};