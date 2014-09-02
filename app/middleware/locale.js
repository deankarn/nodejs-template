module.exports = function(Globalize)
{
	return function(req, res, next)
	{
		if(req.param('locale'))
		{
			req.localeString = req.param('locale');
			req.locale = Globalize(req.localeString);
		}
		else
		{
			if(req.isAuthenticated())
		    {
				req.localeString = req.session.localeString;
				req.locale = Globalize(req.localeString);
		    }
		    else
		    {
		    	if(req.cookies['locale'])
		    	{
		    		req.localeString = req.cookies['locale'];
					req.locale = Globalize(req.localeString);
		    	}
		    	else
		    	{
		    		req.localeString = 'en-GB';
		    		req.locale = Globalize(req.localeString);

					if(!req.url.match(/^\/language(?:.+)?$/))
					{
			    		return res.redirect('/language');
		    		}
		    	}
		      
		      
		    }
		}

		return next(); // go to routes
	}
}
