import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

<Navbar fixed="top" bg="dark">
      <Container>
        <Navbar.Brand href="#">
          <h2 className="text-light">myFlix</h2>
        </Navbar.Brand>
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
      </Container>
    </Navbar>