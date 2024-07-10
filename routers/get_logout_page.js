const express = require('express');
const logOutRouter = express.Router();


logOutRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/myposts');
    }
    res.redirect('/');
  });
});

module.exports = logOutRouter;


