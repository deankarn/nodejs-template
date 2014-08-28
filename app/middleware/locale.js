module.exports = function(Globalize)
{
	function locale_middleware(req, res, next)
	{
		if(!req.session.locale)
	    {
	      req.session.locale = 'en';
	    }

		req.locale = Globalize(req.session.locale);

		next(); // go to routes
	}
}
