module.exports = function(Globalize)
{
	return function(req, res, next)
	{
		if(req.param('locale'))
		{
			req.localeString = req.param('locale');
			req.locale = Globalize(req.localeString);
			// console.log('setting locale via param');
		}
		else
		{
			// must rework logic as default session locale may be set, maybe need to see if logged in or not check
			// console.log('not setting locale via param');
			if(req.isAuthenticated())
		    {
		    	// console.log('setting session locale');
				req.localeString = req.session.locale;
				req.locale = Globalize(req.localeString);
		    }
		    else
		    {
		    	// console.log('not a session cookie');

				// will add getting it from cookie, cookie will also be set from javascript out of localStorage if not found
		      	// if cookie not found will redirect to language selection page with default en-CA language
		    	if(req.cookies['locale'])
		    	{
		    		// console.log('setting from cookie');
		    		req.localeString = req.cookies['locale'];
					req.locale = Globalize(req.localeString);
		    	}
		    	else
		    	{
		    		// console.log('defaulting');
		    		req.localeString = 'en-CA';
		    		req.locale = Globalize(req.localeString);

					if(!req.url.match(/^\/language(?:.+)?$/))
					{
			    		// console.log(res.headersSent);
			    		return res.redirect('/language');
		    		}
		    	}
		      
		      
		    }
		}

		return next(); // go to routes
	}
}
