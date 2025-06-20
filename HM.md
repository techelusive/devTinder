- create a repo.
- Initialize the repo.
- node_modules, package.json, package-lock.json.
- Install express
- Create a server
- Listen to port 6666.
- Write request handlers for /test, /hello.
- Install nodemon and update scripts inside the package.json.
- What is the use of "-g" while npm install.
- Difference between caret and tilde(^ vs ~)

- play with the routs and the route extensions ex. /hello, /, hello/2 , /xyz.
- Order of the routs matter a lot
- Install postman app and make a workspace/collection/ > test API call.
- Write logic to handle GET, POST, DELETE, API calls and test them on Postman.
- Explore routing and use of ?, *, (), in the routes.
  Use of regex in routes/a/, /.*fly$/
- Reading the query params in the routs.
- Multiple rout handlers -> Play with them.
- use next function and errors along with res.send.
- app.use("/route", rH, [rH2, rH3, rH4], rH5);
- What is middleware ?
- How express.js basically handles the request behind the scenes.
- Difference b/w app.use and app.all ?
<!-- Pending  auth and error handling -->
- Write a dummy auth middleware for admin.
- Write a dummy auth middleware for all user routes, except [/user/login].
- Error handling using app.use("/", (err, res, next) => {});

- Create a free cluster on MongoDB official website (Mongo Atlas).
- Install mongoose library.
  Connect your application to the database "connection-url"/devTinder".
- Call the connectDB function and connect to database before starting application to 3000.

- Create a userSchema and user Model in your project.
- Push some documents using API calls from postman.
- Error handling using try, catch.

- JS Object vs JSON (difference)
- Add the express.json middleware to your app.
- Make your signup API dynamic to recieve data from the POSTMAN/ end-user.
- User.findOne with duplicate email ids, which object returned.
- API - Get user by email.
- API - Feed API - GET /feed - get all the users from the database.
- API - Get the user by ID.
- Create a delete user api.
- Difference between PATCH nad PUT
- Explore the mongoose docs for model methods
- What are options in a model.findOneAndUpdate methods, explore more about it.
- API - Update the user with email ID.

#### Chapter - 8.

- Explore schema types options from the documentation.
- asd required, unique, lowercase, min, max, trim.
- Add default.
- Create a custom validate function for gender.
- Improve the db schema - put all the appropriate validation on each field in Schemas.
- Add API level validation on PATCH request and signup post API.
- Data sanitizing - Add API validation for each field
- Install Validator
- Explore validator library function and use validator funcs for password, email, photourl.
- **Never TRUST** **_req.body_**

#### Chapter - 9.

##### 1st Half

- Validate the data in signup API.
- Install brcypt package
- Create a password hash using bcrypt.hash and save the user encryptd password.

##### 2nd Half

- Create a login API
- Compare passwords using bcrypt and throw error if passwords and emails are invalid.
