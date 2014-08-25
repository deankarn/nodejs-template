// app/routes.js
module.exports = function(app, passport) {

	app.get('/', isLoggedIn, function(req, res) {
                res.render('main/index.jade', { title: 'Home' });
        });

        app.get('/login', function(req, res) {
                // render the page and pass in any flash data if it exists
                res.render('main/login.jade', { title: 'Login', message: req.flash('loginMessage') }); 
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure homepage
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/signup', function(req, res) {

                // render the page and pass in any flash data if it exists
                res.render('main/signup.jade', { title: 'Signup', message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure homepage
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/profile', isLoggedIn, function(req, res) {
              res.render('main/profile.jade', {
		              title: 'Profile',
                      user : req.user // get the user out of session and pass to template
              });
        });

        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
                req.logout();
                res.redirect('/login');
        });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
                return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
}
