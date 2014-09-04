// app/routes.js
module.exports = function(app, passport) {

	app.get('/', isLoggedIn, function(req, res) {
            res.render('main/index.jade', { title: 'Home' });
    });

    app.get('/language', function(req, res) {

            // render the page and pass in any flash data if it exists
            res.render('main/language.jade', { 
                title : req.locale.translate('language/title'), 
                selectLangMsg : req.locale.translate('language/selectLangMsg') ,
                setLangMsg : req.locale.translate('language/setLangMsg'),
                localeString : req.localeString,
                languages : [
                    {'text':'English (UK)', 'value':'en-GB'},
                    {'text':'English (US)', 'value':'en-US'},
                    {'text':'Français (Canada)', 'value':'fr-CA'},
                    {'text':'Français (France)', 'value':'fr-FR'},
                    {'text':'中国 (简体)', 'value':'zh-Hans-CN'}
                ]
            }); 
    });

    app.post('/language', function(req, res){

        // set long lived cookie, 10 years if it's not found by cookie monster int the mean time.
        res.cookie('locale', req.localeString, { path: '/', secure: false, maxAge: 60 * 60 * 24 * 365 * 10, httpOnly: false });

        // console.log(req.session.returToLogin);
        if(req.session.returnUrl)
        {
            res.redirect(req.session.returnUrl);
        }
        else
        {
            res.redirect('/login');
        }
    })

    app.get('/login', function(req, res) {
            // render the page and pass in any flash data if it exists
            res.render('main/login.jade', { 
                title: req.locale.translate('login/title'), 
                email: req.locale.translate('login/email'), 
                password: req.locale.translate('login/password'), 
                message: req.flash('loginMessage')
            }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure homepage
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {

            // render the page and pass in any flash data if it exists
            res.render('main/signup.jade', { 
                title: req.locale.translate('signup/title'), 
                email: req.locale.translate('signup/email'), 
                password: req.locale.translate('signup/password'), 
                message: req.flash('signupMessage') 
            });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        // successRedirect : '/login', // redirect to the secure homepage
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res){

        req.session.localeString = req.user.locale;

        res.redirect('/login');
    }
    );

    app.get('/profile', isLoggedIn, function(req, res) {

          res.render('main/profile.jade', {
	              title: req.locale.translate('profile/title'),
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

        // console.log('setting return to login');
        // req.session.returnToLogin = true;
        // if they aren't redirect them to the home page
        res.redirect('/login');
}
