const express = require('express');
const logInRouter = express.Router();

const { validateUser } = require('../middlewares/validator');
const userService  = require('../services/user_service'); 

logInRouter.get('/login', (req, res) => {
  res.render('login');
});

logInRouter.post('/login', validateUser, async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await userService.getUserByUsername(username); 

    if (user && user.password === password) {
      req.session.userId = user.id;
      req.session.isAdmin = user.username === 'admin'; 

      if (user.username === 'admin') {
        res.redirect('/admin');
      } else {
        res.redirect('/myposts');
      }
    } else {
      req.flash('error', 'Incorrect password or login');
      res.redirect('/login'); 
    }
  } catch (error) {
    next(error);
  }
});

module.exports = logInRouter;

