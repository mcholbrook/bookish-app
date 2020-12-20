const router = require("express").Router();
const indexCtrl = require('../controllers/index')

router.get("/",  indexCtrl.index);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
