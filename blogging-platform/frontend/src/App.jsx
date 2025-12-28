import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';

// Auth Pages
import Login from './components/Auth/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogList from './pages/admin/BlogList';
import BlogForm from './pages/admin/BlogForm';
import CategoryList from './pages/admin/CategoryList';
import CategoryForm from './pages/admin/CategoryForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
         
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<BlogDetail />} />
            
            {/* Auth Routes */}
            <Route path="/admin/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/blogs" element={
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/blogs/new" element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/blogs/:id/edit" element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories" element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories/new" element={
              <ProtectedRoute>
                <CategoryForm />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories/:id/edit" element={
              <ProtectedRoute>
                <CategoryForm />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;