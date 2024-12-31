
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
    createBlog,
    getBlogs,
    getBlogById,    
} = require('../controllers/blogController');


router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);


module.exports = router;
