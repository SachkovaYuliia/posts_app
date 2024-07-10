const express = require('express');
const app = express();


const session = require('express-session');
const flash = require('connect-flash');

const path = require('path');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { isLoggedIn, isAdmin, validateUser } = require('./middlewares/validator');

const homePageRouter = require('./routers/get_home_page');
const logInRouter = require('./routers/get_login_page');
const logOutRouter = require('./routers/get_logout_page');
const myPostRouter = require('./routers/get_my_post_page');
const adminPageRouter = require('./routers/get_admin_page');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  next();
});


app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/', homePageRouter);
app.use('/', logInRouter );
app.use('/', logOutRouter );
app.use('/', myPostRouter );
app.use('/', adminPageRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
