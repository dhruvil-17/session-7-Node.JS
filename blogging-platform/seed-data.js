import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Blog from './models/Blog.js';

dotenv.config();

const sampleCategories = [
  { name: 'Technology' },
  { name: 'Travel' },
  { name: 'Food' },
  { name: 'Lifestyle' },
  { name: 'Business' }
];

const sampleBlogs = [
  {
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    description: '<p>React is a popular JavaScript library for building user interfaces. In this comprehensive guide, we\'ll explore the fundamentals of React and how to get started with your first React application.</p><p>React was created by Facebook and has become one of the most widely used frontend frameworks. It uses a component-based architecture that makes it easy to build reusable UI components.</p><p>Key features of React include:</p><ul><li>Virtual DOM for better performance</li><li>Component-based architecture</li><li>JSX syntax</li><li>Unidirectional data flow</li></ul>',
    categoryName: 'Technology',
    thumbnailImage: 'https://via.placeholder.com/400x200/007bff/ffffff?text=React+Tutorial',
    featuredImage: 'https://via.placeholder.com/800x400/007bff/ffffff?text=React+Tutorial'
  },
  {
    title: 'Best Travel Destinations for 2024',
    slug: 'best-travel-destinations-2024',
    description: '<p>Planning your next adventure? Here are the top travel destinations that should be on your bucket list for 2024.</p><p>From exotic beaches to bustling cities, these destinations offer unique experiences that will create lasting memories.</p><h3>Top Destinations:</h3><ol><li><strong>Bali, Indonesia</strong> - Perfect beaches and rich culture</li><li><strong>Tokyo, Japan</strong> - Modern city with traditional charm</li><li><strong>Iceland</strong> - Stunning natural landscapes</li><li><strong>Portugal</strong> - Beautiful coastline and historic cities</li></ol>',
    categoryName: 'Travel',
    thumbnailImage: 'https://via.placeholder.com/400x200/28a745/ffffff?text=Travel+2024',
    featuredImage: 'https://via.placeholder.com/800x400/28a745/ffffff?text=Travel+2024'
  },
  {
    title: 'Healthy Cooking Tips for Busy People',
    slug: 'healthy-cooking-tips-busy-people',
    description: '<p>Maintaining a healthy diet can be challenging when you have a busy schedule. Here are practical tips to help you eat well even when time is limited.</p><p>Meal preparation is key to success. By planning ahead and preparing ingredients in advance, you can create nutritious meals quickly.</p><h3>Quick Tips:</h3><ul><li>Batch cook on weekends</li><li>Keep healthy snacks ready</li><li>Use a slow cooker or instant pot</li><li>Prep vegetables in advance</li></ul>',
    categoryName: 'Food',
    thumbnailImage: 'https://via.placeholder.com/400x200/fd7e14/ffffff?text=Healthy+Cooking',
    featuredImage: 'https://via.placeholder.com/800x400/fd7e14/ffffff?text=Healthy+Cooking'
  },
  {
    title: 'Building a Productive Morning Routine',
    slug: 'building-productive-morning-routine',
    description: '<p>How you start your morning sets the tone for the entire day. A well-structured morning routine can boost your productivity and improve your overall well-being.</p><p>The key is to create a routine that works for your lifestyle and stick to it consistently.</p><h3>Elements of a Great Morning Routine:</h3><ul><li>Wake up at a consistent time</li><li>Hydrate immediately</li><li>Exercise or stretch</li><li>Practice mindfulness or meditation</li><li>Plan your day</li></ul>',
    categoryName: 'Lifestyle',
    thumbnailImage: 'https://via.placeholder.com/400x200/6f42c1/ffffff?text=Morning+Routine',
    featuredImage: 'https://via.placeholder.com/800x400/6f42c1/ffffff?text=Morning+Routine'
  },
  {
    title: 'Essential Skills for Remote Work Success',
    slug: 'essential-skills-remote-work-success',
    description: '<p>Remote work has become the new normal for many professionals. Success in a remote environment requires a different set of skills compared to traditional office work.</p><p>Whether you\'re new to remote work or looking to improve your current setup, these skills will help you thrive.</p><h3>Key Skills:</h3><ol><li><strong>Time Management</strong> - Structure your day effectively</li><li><strong>Communication</strong> - Clear and frequent communication with team</li><li><strong>Self-Discipline</strong> - Stay focused without supervision</li><li><strong>Tech Savvy</strong> - Master remote work tools</li></ol>',
    categoryName: 'Business',
    thumbnailImage: 'https://via.placeholder.com/400x200/dc3545/ffffff?text=Remote+Work',
    featuredImage: 'https://via.placeholder.com/800x400/dc3545/ffffff?text=Remote+Work'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Blog.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(sampleCategories);
    console.log('Created categories');

    // Create blogs with category references
    const blogsWithCategories = sampleBlogs.map(blog => {
      const category = createdCategories.find(cat => cat.name === blog.categoryName);
      return {
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        category: category._id,
        thumbnailImage: blog.thumbnailImage,
        featuredImage: blog.featuredImage,
        publishDate: new Date()
      };
    });

    await Blog.insertMany(blogsWithCategories);
    console.log('Created blogs');

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();