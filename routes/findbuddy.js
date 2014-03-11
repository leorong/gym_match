'use strict'

var findbuddy = require('../controllers/findbuddy_controller');

module.exports = function(app, passport) {
    app.get('/findbuddy', findbuddy.view);
    app.get('/findbuddy/add/:buddyid', findbuddy.addBuddy);
    //app.get('/customsearch', findbuddy.customsearch);
    app.post('/customsearch', findbuddy.customsearch);
};
