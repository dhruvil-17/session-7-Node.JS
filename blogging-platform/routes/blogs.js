import express from 'express';
import { 
  getAllBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  searchBlogs 
} from '../controllers/blogController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/search', searchBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', authenticateToken, createBlog);
router.put('/:id', authenticateToken, updateBlog);
router.delete('/:id', authenticateToken, deleteBlog);

export default router;