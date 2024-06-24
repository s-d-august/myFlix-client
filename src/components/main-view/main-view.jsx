import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'


export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    <Container>
          <Navbar fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <h2>myFlix</h2>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          
            {user ? (
              <>
              <Navbar.Text><span>Signed in as: {user.Username}</span></Navbar.Text>
              <Navbar.Text></Navbar.Text>
              <Button style={{ marginLeft: '10px' }}
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button></>
            ) : (<></>)}
            
          

        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Row>
      {!user ? (
        <>
        <Col md={6}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token)
          }} />
          </Col>
          
        <Col>
          <SignupView />
        </Col>
        </>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)} />
        </Col>

      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-4" key={movie.key} md={3} sm={4}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie)
                }}
              />
            </Col>))}

          </>)
      } </Row>
      </Container>
    )
}


