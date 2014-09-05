App.test_view = (function (parent, window, document, $)
{
    function initialize()
    {
        var button = document.getElementById('load-partials');

        button.onclick = function(e)
        {
            e.preventDefault();
            loadPartialView();
        }
    }

    function loadPartialView()
    {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("error", function (e) {
            alert('error');
        }, false);

        xhr.addEventListener("timeout", function (e) {
            alert('timed out');
        }, false);

        xhr.addEventListener("abort", function (e) {
            alert('abort');
        }, false);

        xhr.addEventListener("readystatechange", function () 
        {
            if (this.readyState == 4) 
            {
                if (this.status == 200) 
                {
                    var results = this.responseText;

                    var div = document.getElementById('partial-content');
                    div.innerHTML = results;
                    // alert(results);

                    // ul.innerHTML = results;

                    //xhr = null;
                }
            }
        }, false);

        var url = '/partials/test';

        xhr.open("get", url, true);
        xhr.send(null);
    }

    function setDebug(val)
    {
        debug = val;
    }

    var debug = false;

    var self = {
        setDebug: setDebug,
        initialize: initialize,
        loadPartialView: loadPartialView,
    };

    return self;

})(App, window, document, typeof(jQuery) == 'undefined' ? {} : jQuery);

App.test_view.initialize();