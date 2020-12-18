const User = require('../models/user')
const Collection = require('../models/collection')

module.exports = {
  showMyProfile,
  edit,
  update
}

function showMyProfile(req, res){
  User.findById(req.user._id)
  .then((user) => {
    res.render('users/profile', {title: "Profile Page", user})
  })
}

function edit(req, res){
  User.findById(req.user._id)
  .then((user) => {
    res.render('users/edit', {title: 'Update Your Profile', user})
  })
}

function update(req, res){
  User.findByIdAndUpdate(req.user._id, req.body, {new:true})
  .then(() => {
    console.log(req.body)
    res.redirect('/users/profile')
  })
}