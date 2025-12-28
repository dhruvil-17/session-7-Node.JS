import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../services/api';
import AdminLayout from '../../components/Layout/AdminLayout';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Error deleting blog');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>All Blogs</h1>
          <Link to="/admin/blogs/new" className="btn btn-primary">
            Add New Blog
          </Link>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Publish Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#6b7280' }}>
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                        {blog.title}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {blog.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">
                        {blog.category?.name}
                      </span>
                    </td>
                    <td style={{ color: '#6b7280' }}>
                      {formatDate(blog.publishDate)}
                    </td>
                    <td>
                      <Link
                        to={`/admin/blogs/${blog._id}/edit`}
                        className="btn btn-primary"
                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', marginRight: '0.5rem' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-danger"
                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogList;