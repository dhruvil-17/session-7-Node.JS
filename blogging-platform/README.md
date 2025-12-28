# Blogging Platform

A full-stack web application for managing and displaying blogs with an admin panel.

## Features

### For Users
- View latest blogs on the homepage
- Search blogs by title
- Read individual blog posts with clean URLs (slug-based)
- Responsive design for mobile and desktop

### For Admin
- Secure login/logout system
- Dashboard with statistics
- Manage blogs (Create, Read, Update, Delete)
- Manage categories (Create, Read, Update, Delete)
- Rich text editor for blog content
- Image support for thumbnails and featured images

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Vite, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd blogging-platform
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Configure environment variables**
   - Copy `.env` file and update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blogging-platform
   JWT_SECRET=your-secret-key-here
   ADMIN_EMAIL=admin@blog.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system

5. **Create admin user**
   ```bash
   # Start the backend server first
   npm run dev
   
   # In another terminal, create the admin user
   curl -X POST http://localhost:5000/api/auth/create-admin
   ```

### Development

1. **Start the backend server**
   ```bash
   npm run dev
   ```

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Production Build

1. **Build the frontend**
   ```bash
   npm run build-win
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Application: http://localhost:5000

## Usage

### Admin Access
1. Go to `/admin/login`
2. Use the credentials from your `.env` file:
   - Email: admin@blog.com
   - Password: admin123

### Admin Features
- **Dashboard**: Overview of blogs and categories
- **All Blogs**: View, edit, and delete existing blogs
- **Add New Blog**: Create new blog posts with rich content
- **All Categories**: Manage blog categories
- **Add New Category**: Create new categories for organizing blogs

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/create-admin` - Create admin user

#### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/search?q=query` - Search blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `POST /api/blogs` - Create new blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)

#### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

## Project Structure

```
blogging-platform/
├── controllers/          # Request handlers
├── middleware/          # Custom middleware
├── models/             # Database models
├── routes/             # API routes
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   └── services/   # API services
├── public/             # Static files
├── server.js           # Main server file
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.