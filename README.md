Node Boilerplate (express.js + passport.js + sequelize)
-------------------------------------------------------

This is a handy jump start for node.js web applications that are going to 
use a SQL database (sequelize) and user authentication (passport).

## Usage

### Installation

1. Clone the repository `git clone git@github.com:justin-schroeder/express-boilerplate.git`
2. Install dependencies `cd express-boilerplate && npm install`
3. Create a new database, then edit the database configuration file: `config/config.json`
4. Edit application config (at least change the salt): `config/default.json`
5. Perform database migration: `sequelize db:migrate`
6. Run! `npm start`. I highly recommend using [nodemon](http://nodemon.io/) in development

### Authentication

The boilerplate includes default migrations and models for `Users` and 
`Permissions`. Each user can have many permissions. Permissions are arbitrary
strings that can be assigned to users. A utility library `Authentication` is
provided for checking access against these strings. There are 2 primary methods
to controll access: `restrict()` and `req.perm()`. The authentication library
also provides all the required passport functions.

#### Restricting access to routes

To restrict access to a route (or many), use the authentication library's
`restrict()` static method as a route callback:

```js
/**
 * file: routes.js
 */
'use strict';
var express     = require('express');
var router      = express.Router();
var auth        = require('./libs/authentication');

// only allow access to /admin routes if the user has the is_admin permission
router.all('/admin/?*', auth.restrict('is_admin'));
```

#### Restricting access to code blocks

The authentication library adds a `perm()` method to the request object. It can
be easily used to restrict access to code blocks in your router functions:

```js
/**
 * file: routes.js
 */
'use strict';
var express     = require('express');
var router      = express.Router();
var auth        = require('./libs/authentication');

// only allow access to /admin routes if the user has the is_admin permission
router.all('/admin/edit-user', function(req, res){
        
    // do some hypothetical stuff ...
    var person = getSomeone();

    // protect a block of code ...
    req.perm('can_edit_people')
    .then(() => {

        // do some secret stuff
        res.render('pages/person');
    })
    .catch((err) => {
        req.flash("error", "You are not authorized to edit people");
        req.redirect("/admin");
    });
});
```

### Controllers

The framework boilerplate also uses controller classes to segment route logic
into isolated controllers. Each controller is an object containing a series of
methods which can be used as route functions. For example:

```js
/**
 * file: routes.js
 */
'use strict';
var express     = require('express');
var router      = express.Router();
var c           = require('')

// only allow access to /admin routes if the user has the is_admin permission
router.get('/login', c.AuthenticationController.login);
```

**Note: the default boilerplate already includes admin and authentication 
controllers**