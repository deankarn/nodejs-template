// app/routes.js
module.exports = function(app, passport) {

    app.get('/partials/test', function(req, res) {

            res.render('partials/test.jade'); 
    });

    app.get('/main/partials/dashboard', isLoggedIn, function(req, res) {
        res.render('main/partials/dashboard.jade', { 
            title: req.locale.translate('dashboard/title'),
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
                return next();

        // console.log('setting return to login');
        // req.session.returnToLogin = true;
        // if they aren't redirect them to the home page
        res.redirect('/login');
}