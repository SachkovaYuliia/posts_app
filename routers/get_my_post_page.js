const express = require('express');
const myPostRouter = express.Router();

const { isLoggedIn } = require('../middlewares/validator');

const postService = require('../services/post_service'); 
const userService = require('../services/user_service'); 
const commentService = require('../services/comment_service');

myPostRouter.get('/myposts', isLoggedIn, async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.session.userId); 
    res.render('myposts', { user });
  } catch (error) {
    next(error);
  }
});

myPostRouter.post('/myposts/posts', isLoggedIn, async (req, res, next) => {
  const { title, content, imageUrl } = req.body;
  try {
    await postService.createPost({
      title,
      content,
      imageUrl,
      userId: req.session.userId
    });
    req.flash('success', 'Post added successfully');
    res.redirect('/myposts');
  } catch (error) {
    req.flash('error', 'Failed to add post');
    next(error);
  }
});

myPostRouter.post('/myposts/comments', isLoggedIn, async (req, res, next) => {
  const { postId, content } = req.body;
  try {
    await commentService.createComment(
      parseInt(postId), 
      req.session.userId, 
      content
    );
    req.flash('success', 'Comment added successfully');
    res.redirect('/myposts');
  } catch (error) {
    req.flash('error', 'Failed to add comment')
    next(error);
  }
});

myPostRouter.post('/myposts/posts/delete', isLoggedIn, async (req, res, next) => {
  const { postId } = req.body;
  try {
    await commentService.deleteCommentsByPostId(parseInt(postId));
    await postService.deletePostById(parseInt(postId));
    req.flash('success', 'Post deleted successfully');
    res.redirect('/myposts');
  } catch (error) {
    req.flash('error', 'Failed to delete post');
    next(error);
  }
});

myPostRouter.post('/myposts/comments/delete', isLoggedIn, async (req, res, next) => {
  const { commentId } = req.body;
  try {
    await commentService.deleteComment(parseInt(commentId), req.session.userId);
    req.flash('success', 'Comment deleted successfully');
    res.redirect('/myposts');
  } catch (error) {
    req.flash('error', 'Failed to delete comment');
    next(error);
  }
});

module.exports = myPostRouter;

