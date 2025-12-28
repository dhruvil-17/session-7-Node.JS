import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI, categoryAPI } from '../../services/api';
import AdminLayout from '../../components/Layout/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCategories: 0
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [blogsResponse, categoriesResponse] = await Promise.all([
        blogAPI.getAllBlogs(),
        categoryAPI.getAllCategories()
      ]);

      setStats({
        totalBlogs: blogsResponse.data.length,
        totalCategories: categoriesResponse.data.length
      });

      setRecentBlogs(blogsResponse.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading">
          <div>Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard</h1>
        
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>Total Blogs</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalBlogs}</p>
          </div>
          
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>Total Categories</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalCategories}</p>
          </div>
        </div>

        {/* Recent Blogs */}
        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '500' }}>Recent Blogs</h2>
          </div>
          <div style={{ padding: '1.5rem' }}>
            {recentBlogs.length === 0 ? (
              <p style={{ color: '#6b7280' }}>No blogs found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentBlogs.map((blog) => (
                  <div key={blog._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}>
                    <div>
                      <h3 style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{blog.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{blog.category?.name}</p>
                    </div>
                    <Link
                      to={`/admin/blogs/${blog._id}/edit`}
                      className="btn btn-primary"
                      style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;