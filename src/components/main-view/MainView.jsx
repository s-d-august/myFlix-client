import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([])


const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
  fetch("https://myflix-api-3of3.onrender.com/movies")
  .then((response) => response.json())
  .then((data) => {
    const moviesFromApi = data.map((doc) => {
      return {
        key: doc._id,
        Title: doc.Title,
        Description: doc.Description,
        Genre: doc.Genre.Name,
        Director: doc.Director.Name,
        Featured: doc.Featured,
        Image: doc.ImagePath
      }
    })
    console.log(moviesFromApi)
    setMovies(moviesFromApi)
  })
}, []);

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
        key={movie.key}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie)
        }}
      />
    ))}
  </div>
)}