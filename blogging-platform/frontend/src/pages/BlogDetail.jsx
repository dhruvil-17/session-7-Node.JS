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
      setError('Blog not found');
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {blog.featuredImage && (
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                {blog.category?.name}
              </span>
              <span className="text-gray-500 ml-auto">
                {formatDate(blog.publishDate)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;