import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div>
          <Link to="/" className="logo">
            BlogSpace
          </Link>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;