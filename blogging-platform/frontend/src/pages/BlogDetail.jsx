import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import Header from '../components/Layout/Header';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogBySlug(slug);
      setBlog(response.data);
    } catch (error) {
      setError(`Blog not found : ${error.message}`);
    } finally {
      setLoading(false);
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

  if (error || !blog) {
    return (
      <div>
        <Header />
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Blog Not Found
          </h1>
          <Link to="/" className="btn btn-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <main className="container">
        <Link to="/" className="btn btn-secondary" style={{ marginBottom: '2rem', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        
        <article style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          {blog.featuredImage && (
            <img
              src={blog.featuredImage}
              alt={blog.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          )}
          
          <div style={{ padding: '2rem' }}>
            <div className="blog-meta" style={{ marginBottom: '1rem' }}>
              <span className="category-tag">
                {blog.category?.name}
              </span>
              <span className="blog-date">
                {formatDate(blog.publishDate)}
              </span>
            </div>
            
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', lineHeight: '1.2' }}>
              {blog.title}
            </h1>
            
            <div 
              style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;