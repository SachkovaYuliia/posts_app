const express = require('express');
const homePageRouter = express.Router();

const postService = require('../services/post_service');


homePageRouter.get('/', async (req, res, next ) => {
  try {
    const posts = await postService.getAllPosts(req. body);
    
    const userId = req.session ? req.session.userId : null;
    res.render('index', { posts, userId });
  } catch (error) {
    next(error); 
  }
});


module.exports = homePageRouter;