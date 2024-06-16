import PropTypes from "prop-types"

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div
    onClick={() => {
      onMovieClick(movie)
    }}
    >
      {movie.Title}
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}