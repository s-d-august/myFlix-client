import { useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([])}


const [selectedMovie, setSelectedMovie] = useState(null);

if (selectedMovie) {
  return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  )
}

if (movies.length === 0) {
  return <div>The list is empty!</div>
}

return (
  <div>
    {movies.map((movie) => (
      <MovieCard
        key={movie._id.$oid}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie)
        }}
      />
    ))}
  </div>
)}