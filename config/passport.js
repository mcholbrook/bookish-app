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
              owner: newUser._id,
              description: 'My catch-all collection!',
              cardImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=400&q=80'
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
