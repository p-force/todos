const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// const authMiddleware = require('./src/middleware/authMiddleware');

const app = express();

// Middlewares
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.set('views', path.join(__dirname, 'public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
// app.use(authMiddleware);

// Routes
app.use('/auth', require('./src/routes/authRouter'));
app.use('/tasks', require('./src/routes/taskRouter'));
app.use('*', require('./src/routes/indexRouter'));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port %d!', PORT);
});
