// routes/blogRoutes.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Blog routes');
});

module.exports = router;
