import PropTypes from "prop-types"

export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.Image}/>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span className="caps">{movie.Featured.toString()}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
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