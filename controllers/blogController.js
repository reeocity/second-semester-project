const Blog = require('../models/Blog');
const calculateReadingTime = require('../utils/calculateReadingTime');
exports.createBlog = async (req, res) => {
  const { title, description, tags, body } = req.body;
  try {
    const readingTime = calculateReadingTime(body);
    const blog = await Blog.create({
      title,
      description,
      tags,
      body,
      author: req.user.id,
      reading_time: readingTime,
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  const { page = 1, limit = 20, sort = '-timestamp', search } = req.query;
  const query = { state: 'published' };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
      { 'author.first_name': { $regex: search, $options: 'i' } },
      { 'author.last_name': { $regex: search, $options: 'i' } },
    ];
  }

  try {
    const blogs = await Blog.find(query)
      .populate('author')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyBlogs = async (req, res) => {
  const { page = 1, limit = 20, state } = req.query;
  const query = { author: req.user.id };

  if (state) query.state = state;

  try {
    const blogs = await Blog.find(query)
      .populate('author')
      .sort('-timestamp')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
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
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    if (blog.author.toString() !== req.user.id) {
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
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};