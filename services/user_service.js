const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

    async function createUser(data) {
        return await prisma.user.create({ data });
    }

    // async getUserById(userId) {
    //     return await prisma.user.findUnique({
    //         where: { id: userId }
    //     });
    // }

    async function getUserById(userId) {
      return await prisma.user.findUnique({
            where: { id: userId },
            include: {
              posts: {
                include: {
                  comments: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          });
        }

  async function getUserByUsername(username) {
    return await prisma.user.findUnique({
        where: { username: username },
        include: {
            posts: {
                include: {
                    comments: true
                }
            }
        }
    });
}
    async function getAllUsers() {
        return await prisma.user.findMany({
            include: {
                posts: {
                  include: {
                    comments: {
                      include: {
                        user: true,
                      },
                    },
                  },
                },
              },
            });
    }

    async function updateUser(userId, data) {
        return await prisma.user.update({
            where: { id: userId },
            data
        });
    }

    async function deleteUser(userId) {
        return await prisma.user.delete({
            where: { id: userId }
        });
    }

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  updateUser,
  deleteUser
};
