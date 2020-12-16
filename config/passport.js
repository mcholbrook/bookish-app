const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const Collection = require('../models/collection')


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return cb(err);
        if (user) {
          console.log(user)
          console.log(user.collections.length)
          console.log(user.collections[0])
          // if (user.collections.length === 0){
          //   const newCollection = new Collection({
          //     title: 'My Books'
          //   })
          //   newCollection.save(function(err){
          //     if (err) return (err)
          //   })
          //   console.log(newCollection)
          //    user.collections.push(newCollection._id)
          //    user.save(function(err){
          //      if (err) return (err)
          //    })
          // }
          if (!user.avatar) {
            user.avatar = profile.photos[0].value;
            user.save(function (err) {
              return cb(null, user);
            });
          }
          return cb(null, user);
        } else {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            avatar: profile.photos[0].value,
          });
          newUser.save(function (err) {
            if (err) return cb(err);
            return cb(null, newUser);
          });
          if (newUser.collections.length === 0){
            const newCollection = new Collection({
              title: 'My Books',
              owner: newUser._id
            })
            newCollection.save(function(err){
              if (err) return (err)
            })
            console.log(newCollection)
             newUser.collections.push(newCollection._id)
             newUser.save(function(err){
               if (err) return (err)
             })
          }
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
