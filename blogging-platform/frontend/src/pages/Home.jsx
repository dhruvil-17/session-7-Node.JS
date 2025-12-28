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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      
     
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the latest articles and insights
          </p>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search blogs..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No blogs found.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <article key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {blog.thumbnailImage && (
                  <img
                    src={blog.thumbnailImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {blog.category?.name}
                    </span>
                    <span className="text-gray-500 text-sm ml-auto">
                      {formatDate(blog.publishDate)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    <Link 
                      to={`/${blog.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  <Link
                    to={`/${blog.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
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