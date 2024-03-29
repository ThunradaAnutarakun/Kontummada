const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const popularRoutes = require('./routes/popularRoutes');
const router = express.Router();
const userController = require('./controllers/userController');

// express app
const app = express();

// MongoDB connection URI
const dbURI = "mongodb+srv://Pleng1:1234@bell.so4ajhn.mongodb.net/";

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start the server after successful connection
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process on connection error
    });

// Register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get('/index', (req, res) => {
    res.render('index', { title: 'Welcome' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// user routes
app.use('/users', userRoutes);
app.use('/popular', popularRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

// Custom error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});