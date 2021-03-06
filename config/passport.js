var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User'),
    models = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            models.User
                .find({"username": username})
                .exec(afterQuery);

            function afterQuery(err, user) {
                if(err) {return done(err);}
                
                if (!user[0]) {
                    return done(null, false, {message: 'Incorrect username.' });
                }
                if(password != user[0].password) {
                    console.log("username: " + user[0].username + " password: " + user[0].password);
                    return done(null, false, {message: 'Incorrect password.' });
                }
                return done(null, user[0]);
            }
        }
    ));
}





// 'use strict';

// var mongoose = require('mongoose'),
//     LocalStrategy = require('passport-local').Strategy,
//     User = mongoose.model('User'),
//     config = require('./config');

// module.exports = function(passport) {

//     // Serialize the user id to push into the session
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });

//     // Deserialize the user object based on a pre-serialized token
//     // which is the user id
//     // passport.deserializeUser(function(id, done) {
//     //     User.findOne({
//     //         _id: id
//     //     }, '-salt -hashed_password', function(err, user) {
//     //         done(err, user);
//     //     });
//     // });

//     // Use local strategy
//     passport.use(new LocalStrategy({
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         function(email, password, done) {
//             User.findOne({
//                 email: email
//             }, function(err, user) {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!user) {
//                     return done(null, false, {
//                         message: 'Unknown user'
//                     });
//                 }
//                 if (!user.authenticate(password)) {
//                     return done(null, false, {
//                         message: 'Invalid password'
//                     });
//                 }
//                 return done(null, user);
//             });
//         }
//     ));
// };
