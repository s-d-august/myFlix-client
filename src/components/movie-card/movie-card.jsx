import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, syncUser, addFav, removeFav}) => {

if (user.Favorites.includes(movie.key)) {
  var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => removeFav(user, movie)}>❤️‍</span>
} else {
  var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => addFav(user, movie)}>🤍</span>
}

  return (
      <Card className="h-100">
        {favIcon}
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body style={{textDecoration: "none"}}  as={Link} to={`/movies/${encodeURIComponent(movie.key)}`}>
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