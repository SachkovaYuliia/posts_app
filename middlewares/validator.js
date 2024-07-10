const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const yup = require('yup');


const userSchema = yup.object().shape({
  username: yup.string()
    .strict('Username is not a string')
    .required('Username is required').min(3).max(30),
  password: yup.string()
    .required('Password is required').min(6).max(30),
});

function isLoggedIn(req, res, next) {
if (req.session.userId) {
  return next();
} else {
  res.redirect('/login');
}
}


async function validateUser(req, res, next) {
  try {
    await userSchema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).send(err.errors);
  }
}


function isAdmin(req, res, next) {
  if (req.session.username === 'admin') {
    return next();
  } else {
    res.status(403).send('Forbidden');
  }
}

function isnotAdmin(req, res, next) {
  if (req.session.username !== 'admin') {
    return next();
  } else {
    res.status(403).send('Forbidden');
  }
}


module.exports = {
  isLoggedIn,
  validateUser,
  isAdmin,
  isnotAdmin
};


