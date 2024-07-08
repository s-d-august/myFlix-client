import PropTypes from "prop-types"
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({movies}) => {
  
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="movie-view">
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
        <button className="back-button">Back</button>
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