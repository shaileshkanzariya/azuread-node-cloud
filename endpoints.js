
module.exports.configureEndpoints = function (app, passport) {
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

    // root
    app.get('/', function (req, res) {
        res.render('index', { user: req.user });
        console.log('sending res of /');
    });

    // accout info - requires authenticated user
    app.get('/account', ensureAuthenticated, function (req, res) {
        console.log('sending res of /account');
        res.render('account', { user: req.user });
    });

    // login
    app.get('/login', function (req, res) {
        console.log('sending res of /login');
        res.render('login', { user: req.user });
    });

    // initiates auth sequence with Azure
    app.get('/auth/waad',  function (req, res) {
       console.log('sending res of /auth/waad');
        passport.authenticate('oauth2');
        console.log('sending res of /auth/waad comleted');
    });
    // callback from Azure to complete auth sequence
    app.get('/auth/waad/callback', 
        passport.authenticate('oauth2', { failureRedirect: '/login' }),
      function (req, res) {
          console.log('sending res to /auth/waad/callback');
          res.redirect('/');
      });

    // logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};
