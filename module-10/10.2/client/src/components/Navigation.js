import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export function NavItemPlain({ url, children }) {
  return (
    <Link
      to={url}
    >
      {children}
    </Link>
  );
}

function Navigation() {
  const { isLoggedIn, user } = useAuth();
  return (
    <nav id="navigation" className="bg-gradient-to-r from-customColor1 via-customColor2 to-customColor3 flex gap-6 pt-5 pl-20 pb-5 sticky top-0 z-10">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/blogs" className="nav-item">
        Blogs
      </Link>
      <Link to="/about" className="nav-item">
        About
      </Link>
      <Link to="/projects" className="nav-item">
        Projects
      </Link>
      <Link to="/contact" className="nav-item">
        Contact
      </Link>
      <Link to="/private-page" className="nav-item">
        Private page
      </Link>
      {isLoggedIn ? (
        <NavItemPlain url="/profile">{user.name}</NavItemPlain>
      ) : (
        <NavItemPlain url="/login">Login</NavItemPlain>
      )}
    </nav>
  );
}

export default Navigation;