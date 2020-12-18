const router = require('express').Router()
const usersCtrl = require('../controllers/users')

router.get('/profile', isLoggedIn, usersCtrl.showMyProfile)
router.get('/profile/edit', isLoggedIn, usersCtrl.edit)
router.put('/profile', isLoggedIn, usersCtrl.update)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router