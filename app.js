var express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  session = require("cookie-session"),
  db = require("./models/index"),
  async = require("async"),
  crypto = require("crypto"),
  flash = require('connect-flash'),
  app = express();
  var morgan = require('morgan');
  var routeMiddleware = require("./config/routes");
  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');
  var mandrill = require('node-mandrill')('<Your Api Key Here>');
  var mandrill = require('mandrill-api/mandrill');
  var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API);
  var Qs = require('qs');



app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}) );
app.use(express.static(__dirname + '/public'));

app.use(session( {
  secret: 'hsadi&*919HIUhdakjshd8&',
  name: 'session cookie',
  maxage: 10000000000000000000000000
  })
);

app.use(require("connect-assets")());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ==========
//
// SEED DATABASE?
//
// db.Workout.create({name:"Chest", day: "monday", UserId: 1})

// ==========
//
// AUTOMAGICAL ROUTE CONTROLLER
//
var siteController = require('./routes/site');
var passportConf = require('./routes/passport');
var userController = require('./routes/user');
var workoutController = require('./routes/workouts');


// ==========
//
// SITE ROUTES
//
app.get('/', siteController.index); // home
app.get('/is', siteController.about); // about page
app.get('/grid', siteController.grid);
app.get('/has', siteController.features); // features page
app.get('/has/style', siteController.featuresStyle); // style guide
app.get('/contact', siteController.contact); // contact us
app.get('/login', siteController.login); // login page
app.post('/login', siteController.loginAction); // login action handler
app.get('/logout', siteController.logout); // log user out
app.get('/signup', siteController.signup);
app.post('/signup', siteController.signupAction);


// ==========
//
// USER'S ROUTES
//
app.get('/my/dashboard', passportConf.isAuthenticated, userController.account); // user dashboard
app.get('/my/workouts', passportConf.isAuthenticated, userController.workouts); // user's workouts
app.get('/forgot', userController.forgot); // user forgot password! Fucking amateur

// ==========
//
// WORKOUT ROUTES
//
app.get('/workouts', passportConf.isAuthenticated, workoutController.new);
app.get('/workouts/new', passportConf.isAuthenticated, workoutController.new);
app.post('/workouts/new', passportConf.isAuthenticated, workoutController.newAction);
app.get('/workout/:id', workoutController.singlePublic); // public workout
app.get('/my/workout/:id', passportConf.isAuthenticated, workoutController.single); // user's view of workout






app.get('/reset/:token', function(req,res){
  db.User.find({
    where: {
      resetPasswordToken : req.params.token
      // resetPasswordExpires : { lt : Date.now() }
    }
  })

  .done(function(err, user){
    if(!user){
      res.send("Looks like you fucked up");
    } else{
      res.render("account/reset",{
        user: req.user,
        title: "Reset"
      })
    }
  });

});

app.post('/reset/:token', function(req,res){
  async.waterfall([

    function(callback, token){
      db.User.find({
        where: {
          resetPasswordToken : req.params.token
        }
      })

      .done(function(err, user){
        user.password = db.User.encryptPass(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save().done(function(err, user){
          callback(err, token, user);
        });
      })
    },
    function(token, user, callback, err) {
      console.log("MAILING");
      //

      var message = {

          "text": 'Hi '+ user.username +'\n\n'+
                  'Just wanted to let you know that your password has been sucessfully changed.\n'+
                  'Go ahead and login with your new account information!\n\n'+
                  'Thanks,\n'+
                  'The Sprk Team',
          "subject": "Password Reset successful",
          "from_email": "mykklemme@gmail.com",
          "from_name": "Myk Klemme",
          "to": [{
                  "email": user.email,
                  "name": user.username,
                  "type": "to"
              }]
      };
      var async = false;
      var ip_pool = "Main Pool";
      mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
          console.log(result);
          console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
          callback(err, 'done');
          /*
          [{
                  "email": "recipient.email@example.com",
                  "status": "sent",
                  "reject_reason": "hard-bounce",
                  "_id": "abc123abc123abc123abc123abc123"
              }]
          */
      }, function(e) {
          // Mandrill returns the error as an object with name and message keys
          console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
          res.redirect('/forgot?=error');
          // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      });
      //

    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});




app.post('/forgot', function(req, res) {
  async.waterfall([
    function(callback) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        callback(err, token);
      });
    },
    function(token, callback){
      db.User.find({
        where: {
          email: req.body.email
        }
      })

      .done(function(err, user){
        console.log("USER STUFF");
        if(!user){
          console.log("No user");
          return res.redirect("/forgot");
        }
        console.log("TOKEN VALUE: ", token);
        // user.resetPasswordToken = token;
        // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.updateAttributes({resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000}).done(function(err, user){
          callback(err, token, user);
        });
      });
    },
    function(token, user, callback, err) {
      console.log("MAILING");
      //

      var message = {

          "text": 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          "subject": "Password Reset",
          "from_email": "mykklemme@gmail.com",
          "from_name": "Example Name",
          "to": [{
                  "email": user.email,
                  "name": user.username,
                  "type": "to"
              }]
      };
      var async = false;
      var ip_pool = "Main Pool";
      mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
          console.log(result);
          console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
          callback(err, 'done');
          /*
          [{
                  "email": "recipient.email@example.com",
                  "status": "sent",
                  "reject_reason": "hard-bounce",
                  "_id": "abc123abc123abc123abc123abc123"
              }]
          */
      }, function(e) {
          // Mandrill returns the error as an object with name and message keys
          console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
          res.redirect('/forgot?=error');
          // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      });





      //

    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

// ==========
//
// 404: YOU FUCKED UP!
//
app.get('*', function(req,res){
  res.status(404);
  res.render('error/404');
});


app.listen(process.env.PORT || 3000)
