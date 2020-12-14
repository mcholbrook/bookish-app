const User = require('../models/user')
const Collection = require('../models/collection')

module.exports = {
  showProfile,
}

function showProfile(req, res){
  User.findById(req.user._id)
  .then((user) => {
    res.render('users/profile', {title: "Profile Page", user})
  })
}