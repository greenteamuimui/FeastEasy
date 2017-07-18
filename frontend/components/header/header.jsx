import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({currentUser, logout}) =>{
  if (currentUser) {
    return (
      <div>
        <h1>Welcome {currentUser.username}!</h1>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/signup">
          Sign Up
        </Link>
        <br/>
        <Link to="/login">
          Log In
        </Link>
      </div>
    );
  }
};

export default Header;
