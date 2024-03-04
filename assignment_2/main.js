// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Set up middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

// Create a schema for blog posts
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
});

// Create a model for blog posts
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Define routes
// Get a specific blog post by ID
app.get('/api/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const post = await BlogPost.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific blog post by ID
app.put('/api/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const post = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific blog post by ID
app.delete('/api/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const post = await BlogPost.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get all blog posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new blog post
app.post('/api/posts', async (req, res) => {
    const post = new BlogPost({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Search for blog posts
app.get('/api/posts/search', async (req, res) => {
    const query = req.query.q;

    try {
        const posts = await BlogPost.find({ $text: { $search: query } });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
