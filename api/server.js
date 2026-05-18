require('dotenv').config();
const express = require('express');
const cors    = require('express');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// prefix everything with /api
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`API running on port ${PORT}`));