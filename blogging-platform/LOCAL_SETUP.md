# Local Development Setup

## Quick Start

### Prerequisites
- Node.js installed
- MongoDB running locally (or use MongoDB Atlas)

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

2. **Configure environment**
   - The `.env` file is already configured for local development
   - Default admin credentials: `admin@blog.com` / `admin123`

3. **Initialize database**
   ```bash
   npm run init-admin
   npm run seed
   ```

4. **Start development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000

## Usage

### Public Site
- Visit http://localhost:5173 to see the blog homepage
- Click on any blog to read the full article
- Use the search feature to find specific blogs

### Admin Panel
1. Go to http://localhost:5173/admin/login
2. Login with:
   - Email: `admin@blog.com`
   - Password: `admin123`
3. Manage blogs and categories from the admin dashboard

## Sample Data
The seed script creates:
- 5 categories (Technology, Travel, Food, Lifestyle, Business)
- 5 sample blog posts with content

## Development Notes
- Backend runs on port 5000
- Frontend runs on port 5173
- API requests are proxied from frontend to backend
- Hot reload is enabled for both frontend and backend