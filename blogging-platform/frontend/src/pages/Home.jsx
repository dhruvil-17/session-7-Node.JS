import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import Header from '../components/Layout/Header';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchBlogs();
      return;
    }

    try {
      const response = await blogAPI.searchBlogs(searchQuery);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error searching blogs:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <main className="container">
        {/* Hero Section */}
        <div className="hero">
          <h1>Welcome to BlogSpace</h1>
          <p>Your creative writing hub - discover amazing stories and insights</p>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search blogs..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {blogs.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>No blogs found.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <article key={blog._id} className="blog-card">
                {blog.thumbnailImage && (
                  <img
                    src={blog.thumbnailImage}
                    alt={blog.title}
                    className="blog-image"
                  />
                )}
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="category-tag">
                      {blog.category?.name}
                    </span>
                    <span className="blog-date">
                      {formatDate(blog.publishDate)}
                    </span>
                  </div>
                  <h2 className="blog-title">
                    <Link to={`/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="blog-excerpt">
                    {blog.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  <Link to={`/${blog.slug}`} className="read-more">
                    Read More →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;