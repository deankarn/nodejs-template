module.exports = function(Globalize)
{
	return function(req, res, next)
	{
		if(!req.session.locale)
	    {
	      // will add getting it from cookie
	      // if cookie not found will redirect to language selection page.
	      req.session.locale = 'en';
	    }

		req.locale = Globalize(req.session.locale);

		next(); // go to routes
	}
}
