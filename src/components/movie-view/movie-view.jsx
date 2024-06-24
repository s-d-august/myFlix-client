import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button'
import "./movie-view.scss"

export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.Image}/>
      </div>
      <div>
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
      <Button style={{margin: '10px 0px'}} onClick={onBackClick}>Back</Button>
      
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