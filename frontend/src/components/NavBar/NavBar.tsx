import { Link, useNavigate } from 'react-router-dom';

import { UserType } from '../../utils/types';

import LogoutBtn from './LogoutBtn';
import './NavBar.css';

interface NavBarProps {
  loggedInUser: UserType | null;
  handleLogout: () => void;
}

const NavBar = ({ loggedInUser, handleLogout }: NavBarProps) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav id="navbar">
      {loggedInUser ? (
        <Link className="link nav-link" to="/agenda">
          Agenda
        </Link>
      ) : (
        <Link className="link nav-link" to="/register">
          Sign Up
        </Link>
      )}

      <Link className="link nav-link" to="/">
        Calendar
      </Link>

      {loggedInUser ? (
        <LogoutBtn handleLogout={handleLogoutClick} />
      ) : (
        <Link className="link nav-link" to="/login">
          Log In
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
