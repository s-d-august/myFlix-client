import PropTypes from "prop-types"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

export const ProfileView = ({users}) => {
  
  const { userId } = useParams();

  const user = users.find((u) => u._id === userId);

  return (
    <div className="user-view">
      <div>
        <img src={user.Image}/>
      </div>
      <div className="margin-top">
        <span className="bold">Title: </span>
        <span>{user.Title}</span>
      </div>
      <div>
        <span className="bold">Description: </span>
        <span>{user.Description}</span>
      </div>
      <div>
        <span className="bold">Director: </span>
        <span>{user.Director}</span>
      </div>
      <div>
        <span className="bold">Genre: </span>
        <span>{user.Genre}</span>
      </div>
      <div>
        <span className="bold">Featured: </span>
        <span className="caps">{user.Featured.toString()}</span>
      </div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
      
    </div>
  )
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date),
    Favorites: PropTypes.array
  })
}