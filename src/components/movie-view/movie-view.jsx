import PropTypes from "prop-types"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";

export const MovieView = ({syncUser, addFav, removeFav}) => {
  
  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch();

  const { movieId } = useParams();

  const movie = movies.find((m) => m.key === movieId);

  if (user.Favorites.includes(movie.key)) {
    var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => removeFav(user, movie, token)}>❤️‍</span>
  } else {
    var favIcon = <span className="position-absolute top-0 end-0 fs-1 hand" onClick={() => addFav(user, movie, token)}>🤍</span>
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