
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlogState,
} = require('../controllers/blogController');


router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.patch('/:id/state', authMiddleware, updateBlogState);

module.exports = router;
