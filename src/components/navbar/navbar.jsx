import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import { ProfileView } from '../profile-view/profile-view'

export const NavigationBar = ({user, onLoggedOut}) => {
  return (
<Navbar fixed="top" bg="dark">
      <Container>
      <Navbar.Brand as={Link} to="/">
          <h2 className="text-light">myFlix</h2>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className='text-light'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className='text-light'>
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" className='text-light'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${encodeURIComponent(user._id)}`} className='text-light'>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className='text-light'>
                  Logout
                </Nav.Link>
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