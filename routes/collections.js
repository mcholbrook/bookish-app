const router = require('express').Router()
const collectionsCtrl = require('../controllers/collections')

router.get('/', collectionsCtrl.index)
router.get('/new', collectionsCtrl.new)
router.post('/', collectionsCtrl.create)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router