import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setMovies } from "../../redux/reducers/movies";
import { setUser, setToken } from "../../redux/reducers/user";
import { useSelector, useDispatch } from "react-redux";

export const MovieCard = ({ movie, syncUser, addFav, removeFav}) => {

  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch();

if (user.Favorites.includes(movie.key)) {
  var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => removeFav(user, movie, token)}>❤️‍</span>
} else {
  var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => addFav(user, movie, token)}>🤍</span>
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