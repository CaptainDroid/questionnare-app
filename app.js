const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
const users = require('./routes/users');
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/profile', routes);

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// Start the server
app.listen(PORT, () => {
    console.log('Server started on port '+PORT);
})
