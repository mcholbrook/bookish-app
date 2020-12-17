const router = require('express').Router()
const collections = require('../controllers/collections')
const collectionsCtrl = require('../controllers/collections')

router.get('/', collectionsCtrl.index)
router.get('/new', collectionsCtrl.new)
router.post('/', collectionsCtrl.create)
router.get('/:id', collectionsCtrl.show)
router.put('/:id/addbook', collectionsCtrl.addBook)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router