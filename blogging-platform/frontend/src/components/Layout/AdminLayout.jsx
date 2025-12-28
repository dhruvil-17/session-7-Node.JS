import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/blogs', label: 'All Blogs' },
    { path: '/admin/blogs/new', label: 'Add New Blog' },
    { path: '/admin/categories', label: 'All Categories' },
    { path: '/admin/categories/new', label: 'Add New Category' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="header-container">
          <div>
            <Link to="/admin" className="logo">
              BlogSpace Admin
            </Link>
          </div>
          <div className="nav">
            <Link to="/">View Site</Link>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ marginLeft: '1rem' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="sidebar-nav">
            <ul>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#ef4444', 
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem'
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;