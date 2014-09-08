// This middleware is being used because th vast majority of this application will need the token.
//
// If only a few pages then should use res.render('someform', { csrf: req.csrfToken() }); on a case by case basis

module.exports = function(req, res, next)
{
    res.locals.token = req.csrfToken();
    next();
}