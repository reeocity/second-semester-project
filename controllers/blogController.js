const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  const { title, description, tags, body } = req.body;
  try {
    const blog = await Blog.create({
      title,
      description,
      tags,
      body,
      author: req.user.id,
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ state: 'published' }).populate('author');
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.read_count += 1;
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(blog, req.body);
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};