import PropTypes from "prop-types"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

export const MovieView = ({movies, user, token}) => {
  
  const { movieId } = useParams();

  const movie = movies.find((m) => m.key === movieId);

  if (user.Favorites.includes(movie.key)) {
    var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => removeFav(user, movie)}>❤️‍</span>
  } else {
    var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => addFav(user, movie)}>🤍</span>
  }
  
  function addFav(user, movie) {
    fetch(`https://myflix-api-3of3.onrender.com/users/${encodeURIComponent(user._id)}/movies/${encodeURIComponent(movie.key)}`, 
    { headers: { Authorization: `Bearer ${token}` }, method: "POST" })
    .then((response) => {
      if (response.ok) {
      alert("Successfully added to Favorites.");
      window.location.reload();
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
      window.location.reload();
      } else {
        alert("Failed to remove from Favorites.");
      }
    });
  }

  return (
    <div className="movie-view position-relative">
        {favIcon}
      <div>
        <img src={movie.Image}/>
      </div>
      <div className="margin-top">
        <span className="bold">Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span className="bold">Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span className="bold">Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span className="bold">Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span className="bold">Featured: </span>
        <span className="caps">{movie.Featured.toString()}</span>
      </div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
      
    </div>
  )
}

MovieView.propTypes = {
  Movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  })
}