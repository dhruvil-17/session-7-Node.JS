import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              BlogPlatform
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/admin" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;