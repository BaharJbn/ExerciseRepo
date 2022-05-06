const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const { faker, Faker } = require('@faker-js/faker');
const apiErrorHandler = require('./errorHandling/api-error-handler');
const apiResponseHandler = require("./contollers/responseHandling/api-res-handler");
//================================
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const routes = require('./routes/auth');
const config = require('./config')

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new LinkedInStrategy({
  clientID: config.linkedinAuth.clientID,
  clientSecret: config.linkedinAuth.clientSecret,
  callbackURL: config.linkedinAuth.callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function (token, tokenSecret, profile, done) {
  return done(null, profile);
}
));




// Not to reveal our tech stack to hackers
// helmet changes headers to hide out stack 
//app.use(helmet());
// a thrid-party middleware ... morgan is a logger 
// it logs information about every request (dev - tiny - small ) -> these logs different info
app.use(morgan('dev'));

app.use('/', routes);
app.use('/api/provinces', require('./routes/provinces'))
app.use('/api/cities', require('./routes/cities'))
app.use('/api/users', require('./routes/users'))

//app.use('/api/users', require('./routes/users'))


const port = process.env.PORT || "3000";


// const { PrismaClient } = require('@prisma/client');
// const { json } = require("express/lib/response");
// const prisma = new PrismaClient();


//   /************************************************ CRUD FOR USER *************************************************/

//   app.post('/user', async (req, res) => {
//     const user = await prisma.user.create({ data: req.body });
//     res.json(user);
//   });
  
//   app.get("/user", async (req , res) => {
//       const user = await prisma.user.findMany();
//       res.json(user);
//   });

//   app.put("/user", async (req , res) => {
//     const {id, name, age, gender, cityId} = req.body;
//     const updatedUser = await prisma.city.update({
//         where: {
//             id: id
//         },
//         data: {
//             name: name,
//             age: age,
//             gender: gender,
//             cityId: cityId
//         }
//     });
//     res.json(updatedUser);
// });

// app.delete("/user/:id", async (req , res) => {
//     const id = req.params.id;
//     const deletedUser = await prisma.city.delete({
//         where: {
//             id: id,
//         },
//     });
//     res.json(deletedUser);
// });



// /************************************************ CRUD FOR PROVINCE*************************************************/


// /************************************************ CRUD FOR CITY *************************************************/



//   /************************************************  GET Users by provinceId *************************************************/

//   app.get("/user/:provinceId", async (req , res) => {
//     const provinceId = req.params.provinceId;
//     const user = await prisma.user.findMany({
//             where: {
//             city: {
//                     province: {
//                             id: {
//                                 equals: provinceId,
//                             }
//                         }
//                     }
//                 }
//     });
//     res.json(user);
// });

  /************************************************  GET Users by province Name *************************************************/

//   app.get("/user/search/:provinceName", async (req , res) => {
//     const provinceName = req.params.provinceName;
//     const user = await prisma.user.findMany({
//             where: {
//             city: {
//                     province: {
//                             name: {
//                                 equals: provinceName,
//                             }
//                         }
//                     }
//                 }
//     });
//     res.json(user);
// });

app.use(apiErrorHandler);
//app.use(apiResponseHandler);
app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});



