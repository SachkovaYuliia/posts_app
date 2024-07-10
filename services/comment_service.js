const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getCommentsByPostId = async (postId) => {
    return await prisma.comment.findMany({
        where: { postId },
        orderBy: { createdAt: 'desc' }
    });
};

const createComment = async (postId, userId, content) => {
    return await prisma.comment.create({
        data: {
            content:content,
            post: { connect: { id: postId } },
            user: { connect: { id: userId } },
        }
    });
};

const deleteComment = async (commentId, userId) => {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId }
    });

    if (comment.userId !== userId) {
        throw new Error('Permission denied');
    }

    return await prisma.comment.delete({
        where: { id: commentId }
    });
};


const deleteCommentsByPostId = async (postId) => {
    return await prisma.comment.deleteMany({
        where: { postId: postId }
    });
};

async function deletecommentsToPost(data) {
    return await prisma.comment.deleteMany({
      where: { postId: parseInt(postId) }
    });
  }

module.exports = {
    getCommentsByPostId,
    createComment,
    deleteComment,
    deleteCommentsByPostId,
    deletecommentsToPost
};
