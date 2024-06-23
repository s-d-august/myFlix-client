import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
  if (!token) return;

  fetch("https://myflix-api-3of3.onrender.com/movies",
  {headers: {Authorization: `Bearer ${token}`}})
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
    setMovies(moviesFromApi)
  })
}, [token]);

return (
  <Row>
    {!user ? (
          <>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token)
            }} />
          or
          <SignupView />
        </>
    ) : selectedMovie ? (
      <MovieView movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} />
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
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
      <button
          onClick={() => {
            setUser(null); 
            setToken(null);
            localStorage.clear();
          }}
        >
        Logout
      </button>
    </div>
    )}
  </Row>
)}