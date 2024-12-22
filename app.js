const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

connectToDB();
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
