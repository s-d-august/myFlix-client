import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.key)}`}>
      <Card className="h-100">
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body style={{textDecoration: "none"}}>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
      </Card.Body>
    </Card></Link>
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