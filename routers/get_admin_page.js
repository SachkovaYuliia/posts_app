const express = require('express');
const adminPageRouter = express.Router();

const postService  = require('../services/post_service'); 
const userService  = require('../services/user_service'); 
const commentService  = require('../services/comment_service');

const { isnotAdmin } = require('../middlewares/validator');

adminPageRouter.get('/admin', async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.body);
    res.render('admin', { users });
  } catch (err){
      next(err);
  }      
});

adminPageRouter.delete('/admin/users/:id', async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).send('User deleted');
  } catch (error) {
    next(error);
  }
});

adminPageRouter.delete('/admin/posts/:id', async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).send('Post deleted');
  } catch (error) {
    next(error);
  }
});

adminPageRouter.delete('/admin/comments/:id', async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id);
    res.status(200).send('Comment deleted');
  } catch (error) {
    next(error);
  }
});

adminPageRouter.post('admin/posts/comments/delete',  async (req, res, next) => {
  const { postId } = req.body;
  try {
    await commentService.deleteCommentsByPostId(parseInt(postId));
    await postService.deletePostById(parseInt(postId));
    req.flash('success', 'Post deleted successfully');
    res.redirect('/admin');
  } catch (error) {
    req.flash('error', 'Failed to delete post');
    next(error);
  }
});

module.exports = adminPageRouter;