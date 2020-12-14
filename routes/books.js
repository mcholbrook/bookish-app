const router = require('express').Router()
const booksCtrl = require('../controllers/books')

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router