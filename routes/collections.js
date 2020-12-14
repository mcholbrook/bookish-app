const router = require('express').Router()
const collectionsCtrl = require('../controllers/collections')

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router