const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllPosts() {
  return await prisma.post.findMany({
          include: {
            comments: {
              include: {
                user: true,
              },
            },
            user: true,
          },
          orderBy: {
            date: 'desc',
          },
        });
      }

async function getPostById(postId) {
  return await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
    include: {
      comments: true,
    },
  });
}

async function createPost(data) {
  return await prisma.post.create({
      data: {
          title: data.title,
          content: data.content,
          userId: data.userId,
          imageUrl: data.imageUrl || null,
      },
  });
}

async function deletePost(userId) {
  return await prisma.post.delete({
    where: {id: userId}
  });
}

async function deletePostById(postId) {
  return await prisma.post.delete({
    where: {id: postId}
  });
}
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  deletePostById
};
