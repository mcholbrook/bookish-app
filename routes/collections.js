const router = require('express').Router()
const collections = require('../controllers/collections')
const collectionsCtrl = require('../controllers/collections')

router.get('/', isLoggedIn, collectionsCtrl.index)
router.get('/new', isLoggedIn, collectionsCtrl.new)
router.post('/', isLoggedIn, collectionsCtrl.create)
router.get('/:id', isLoggedIn, collectionsCtrl.show)
router.put('/:id/addbook', isLoggedIn, collectionsCtrl.addBook)
router.get('/:id/edit', isLoggedIn, collectionsCtrl.edit)
router.put('/:id/update', isLoggedIn, collectionsCtrl.update)
router.delete('/:id/delete', isLoggedIn, collectionsCtrl.delete)
router.delete('/:id/deleteBook', isLoggedIn, collectionsCtrl.deleteBook)
router.put('/:id/addToCollection', isLoggedIn, collectionsCtrl.addBook)
router.delete('/:id/deleteFromCollection', isLoggedIn, collectionsCtrl.deleteBook)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router