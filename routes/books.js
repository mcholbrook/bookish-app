const router = require('express').Router()
const booksCtrl = require('../controllers/books')

router.get('/', isLoggedIn, booksCtrl.index)
router.get('/new', isLoggedIn, booksCtrl.new)
router.post('/search', isLoggedIn, booksCtrl.search)
router.get('/:id', isLoggedIn, booksCtrl.show)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router