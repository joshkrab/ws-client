// rfc
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
   const { setIsAuth } = useContext(AuthContext);
   const logOut = () => {
      setIsAuth(false);
      localStorage.removeItem('auth');
   };

   return (
      <div className="navbar">
         <div className="navbar__body">
            <div className="navbar__links">
               <Link to="about">About</Link>
               <Link to="posts">Posts_pagination</Link>
               <Link to="posts-scroll">Posts_scroll</Link>
            </div>
            <MyButton onClick={logOut}>Exit</MyButton>
         </div>
      </div>
   );
};

export default Navbar;
