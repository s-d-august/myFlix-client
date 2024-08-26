import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navbar/navbar";
import { UserUpdate } from "../user-update/user-update";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { symbol } from "prop-types";


export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const syncUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  function addFav(user, movie) {
    fetch(`https://myflix-api-3of3.onrender.com/users/${encodeURIComponent(user._id)}/movies/${encodeURIComponent(movie.key)}`, 
    { headers: { Authorization: `Bearer ${token}` }, method: "POST" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to add to Favorites.");
      }
    }).then((data) => {
        syncUser(data);
        alert("Successfully added to Favorites.");
    })
  }
  
  function removeFav(user, movie) {
    fetch(`https://myflix-api-3of3.onrender.com/users/${encodeURIComponent(user._id)}/movies/${encodeURIComponent(movie.key)}`, 
    { headers: { Authorization: `Bearer ${token}` }, method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to remove from Favorites.");
      }
    }).then((data) => {
      syncUser(data);
      alert("Successfully removed from Favorites.");
    });
    
  };

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-api-3of3.onrender.com/movies",
      { headers: { Authorization: `Bearer ${token}` } })
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
    <BrowserRouter>
      <NavigationBar user={user}
        onLoggedOut={() =>
        (setUser(null),
          setToken(null),
          localStorage.clear())
        }
      >

      </NavigationBar>

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} syncUser={syncUser}
                      addFav={addFav} removeFav={removeFav}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView token={token} movies={movies} user={user}
                    onDelete={() =>
                      (setUser(null),
                        setToken(null),
                        localStorage.clear(),
                        alert("User successfully deleted!"))
                      }/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/update/:userId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <UserUpdate token={token} user={user} syncUser={syncUser}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.key} md={3}>
                        <MovieCard movie={movie} user={user} token={token} syncUser={syncUser}
                      addFav={addFav} removeFav={removeFav}/>
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}


