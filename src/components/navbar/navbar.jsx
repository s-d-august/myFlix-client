import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

export const NavigationBar = ({user, onLoggedOut}) => {
  return (
<Navbar fixed="top" bg="dark">
      <Container>
      <Navbar.Brand as={Link} to="/">
          <h2 className="text-light">myFlix</h2>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

/*
        <Navbar.Collapse className="justify-content-end">
          
            {user ? (
              <>
              <Navbar.Text className="text-light">Signed in as: <span className="bold">{user.Username}</span></Navbar.Text>
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
        */