// app/routes.js
module.exports = function(app, passport) {

    app.get('/partials/test', function(req, res) {

            res.render('partials/test.jade'); 
    });
};

