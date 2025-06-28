# Creating a Server

## Step 1

Import express from (expresss) node modules.

```js
const express = require("express");
```

## Step 2

Call this express function.

```js
const rev = express();
```

## Handling incoming requests and respond it

```js
rev.use((req, res) => {
  res.send("Hello from the server");
});
```

### 🔍 Important Note About `rev.use()`

#### The Two Handlers:

```js
rev.use((req, res) => {
  res.send("Hello from the server");
});

rev.use("/", (req, res) => {
  res.send("Namaste Everyone!");
});
```

#### ❗ Why the second one (with `/`) doesn't work:

The first `rev.use((req, res) => {...})` has **no path defined**, which means:

> It matches **all incoming requests**, no matter what the path is.

So as soon as any request comes in (e.g., `/`, `/about`, `/test`, etc.), **this first handler is triggered**, and it sends `"Hello from the server"` as the response.

Once a response is sent using `res.send(...)`, Express stops processing further routes.
This means your second route (`rev.use("/")`) **never gets a chance to run**.

#### ✅ How to Fix It:

##### Option 1: Remove the general one

```js
rev.use("/", (req, res) => {
  res.send("Namaste Everyone!");
});
```

##### Option 2: Use `next()` in the general one

```js
rev.use((req, res, next) => {
  console.log("Request received");
  next(); // Pass to next route
});

rev.use("/", (req, res) => {
  res.send("Namaste Everyone!");
});
```

## Routing

**Note** → Order/Sequence of rout is matter.
So whenever the request is coming the code will execute from the top.

When I go to `/about/1` → it prints `"abrakadabra"`, but when I go to `/about` → it prints `"At about page"`.
This is because Express checks routes top-down, and `/about` exactly matches the route defined for it.
`/about/1` doesn't match `/about` exactly.

```js
rev.use("/about", (req, res) => {
  res.send("At about page.");
});

rev.use("/about/1", (req, res) => {
  res.send("abrakadabra");
});

rev.use("/", (req, res) => {
  res.send("Namaste Everyone!");
});

rev.use("/about", (req, res) => {
  res.send("At about page.");
});

rev.use("/test", (req, res) => {
  res.send("Get ready for the test");
});
```

## Listen requests

In this we also have a callback function.
This callback function will only be called once my server is running.

```js
rev.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
```

# Express.js Notes – Handling GET and POST Separately and other methods also.

## Problem

Why am I getting the same result when doing:

- `http://localhost:3000/hello` (GET)
- `http://localhost:3000/hello` (POST)

The methods are different, but the URL is the same.

---

## Solution

We can handle different HTTP methods (GET, POST, DELETE, etc.) **separately** in our Express application using the appropriate method functions like `rev.get()`, `rev.post()`, etc.

---

## Code Example

```js
rev.use("/user", (req, res) => {
  res.send("Below never get the chance bcz order/sequence matters ");
});
```

## Explaination

- This middleware handles ALL HTTP methods for /user.
- It runs before the specific GET, POST, or DELETE handlers.
- So if it is declared before those specific handlers, it will override and prevent them from executing.
- Order matters in Express!

---

### Handle GET and POST Separately

```js
// This method will only handle GET call to /user
rev.get("/user", (req, res) => {
  res.send({ firstName: "Rohit", lastName: "Singh" });
});
// When I do GET - url -> it gives me the user data.

rev.post("/user", (req, res) => {
  // saving data to db
  res.send("Data successfully saved to the database.");
});
// When I do POST - url -> Data successfully saved to the database.

rev.delete("/user", (req, res) => {
  res.send("Data deleted successfully");
});
// delete the user data.
```

---

### Match All HTTP Methods Using `.use()`

```js
// This will match all the HTTP method API calls to /test rout.
rev.use("/test", (req, res) => {
  res.send("Get ready for the test");
});
```

---

## Summary

- Use `.get()`, `.post()`, `.delete()` etc. to handle different methods for the same route.
- `.use()` matches all methods and **can override** others if declared first.
- Always be mindful of the **order/sequence** of route declarations.

```js
rev.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Banku", lastName: "Singh" });
});
// : [colon] means -> dynamic rout
```

```js
// Route: GET /search?name=rohit&age=25
rev.get("/search", (req, res) => {
  // this query will give us the information of this query parameters.
  console.log(req.query); // { name: 'rohit', age: '25' }

  const name = req.query.name;
  const age = req.query.age;

  res.send(`Search result for: Name: ${name}, Age: ${age}`);
});
```

### Handling multiple rout handlers

##### 1st way of rout handling

```js
rev.use(
  "/user",
  (req, res, next) => {
    console.log("Handling rout user 1");
    // res.send("Response 1");
    next();
  },
  (req, res, next) => {
    console.log("Handle the rout user 2");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("Handle user 3");
    // res.send("Handle Response 3");
    next();
  }
);
```

##### 2nd way of rout handling

```js
rev.get("/user", (req, res, next) => {
  console.log("1st rout handler");
  // res.send("1st response");
  next();
});
rev.get("/user", (req, res, next) => {
  console.log("2nd rout handler");
  // res.send("2nd response");
  // next();
});
```

##### How exprss.js works or handles the request behind the scene ?

```js
//! How express.js works ?
//? When the req is coming from the server the epress go through the line by line and send the response from the matching rout.
/** these are the middlewares 
 * (req, res, next) => {
  console.log("/ path");
  next();

 * this send the response that's why it's called response handler or response handler function. 
  (req, res, next) => {
    console.log("");
    res.send("got the /user path");
    // next();
  }
 */

rev.use("/", (req, res, next) => {
  console.log("/ path");
  next();
});

rev.get(
  "/user",
  (req, res, next) => {
    console.log("");
    //res.send("");
    next();
  },
  (req, res, next) => {
    console.log("");
    //res.send("");
    next();
  },
  (req, res, next) => {
    console.log("");
    res.send("got the /user path");
    // next();
  }
);
```

---

## Chapter - 07

### 📌 **Code Breakdown: Express API for User Signup**

---

### 1️⃣ **Middleware Configuration**

```js
rev.use(express.json());
```

- **Purpose**: This line adds a middleware function to the Express application (`rev`), using `express.json()`.
- **Functionality**: It parses incoming **JSON payloads** in HTTP request bodies and makes the data accessible via `req.body`.
- **Middleware**: Middleware functions are executed **in sequence** before the final route handler. Here, `express.json()` is essential for handling API requests with `Content-Type: application/json`.

---

### 2️⃣ **HTTP POST Route: `/signup`**

```js
rev.post("/signup", async (req, res) => {
  ...
});
```

- **Route Definition**: Registers a **POST** endpoint on the `/signup` path.
- **Purpose**: This route is used to **create a new user** (i.e., perform a "Create" operation in CRUD).
- **Callback Function**: An `async` function is used so we can perform asynchronous operations like database interaction with `await`.
- **Parameters**: `req` represents the **HTTP request**, and `res` is the **HTTP response** object.

---

### 3️⃣ **Request Body Logging**

```js
console.log(req.body);
```

- **Use Case**: Logs the request payload to the console. This is useful for **debugging** and verifying what data the client is sending.
- **Note**: In production environments, logging sensitive data (e.g., passwords) is discouraged.

---

### 4️⃣ **User Object Creation (Static Data)**

```js
const user = new User({
  firstName: "Rohit",
  lastName: "Singh",
  emailId: "singh@-123",
  password: "singh-456_@",
});
```

- **Mongoose Schema**: `User` is likely a Mongoose **model** representing a MongoDB **collection**.
- **Document Creation**: A new **document instance** is created using `new User(...)` with hardcoded data.
- **Hardcoded Values**: The data isn't coming from the client (`req.body`) but is fixed in the code. This is okay for testing, but not for real-world API usage.

---

### 5️⃣ **Database Save Operation**

```js
await user.save();
```

- **Purpose**: Persists the new `User` document to the MongoDB database.
- **Asynchronous Operation**: Uses `await` to wait for the `.save()` operation to complete before proceeding.
- **Mongoose Save**: `.save()` is a method provided by Mongoose to **insert or update** a document.

---

### 6️⃣ **Successful Response**

```js
res.send("User added successfully");
```

- **Client Response**: If `.save()` is successful, the server sends a plain-text response to the client.
- **HTTP Status Code**: Since no status code is specified, the default is `200 OK`.

---

### 7️⃣ **Error Handling with try-catch**

```js
catch (err) {
  res.status(400).send("Error saving the user:" + err.message);
}
```

- **Error Handling**: Wraps the `.save()` operation in a `try-catch` block to catch **runtime exceptions**.
- **Error Response**: If an error occurs (e.g., validation fails), it sends a `400 Bad Request` response with the error message.
- **Best Practice**: Structured error handling like this improves application reliability and user feedback.

---

### 8️⃣ Dynamic User Object Creation

```js
const user = new User(req.body);
Mongoose Model Instance: User is a Mongoose model representing a MongoDB collection.

new User(req.body) dynamically creates a new document using the data received in the request body.
```

This approach allows the API to accept any properly structured user input from the client.

Flexible: As long as the request body matches the Mongoose schema, this will work for all valid inputs.

---

### 9️⃣ Code Breakdown: rev.get("/user", async (req, res) => { ... })

1. Route Definition

```js

rev.get("/user", async (req, res) => { ... });
This defines a GET HTTP route handler on the path /user for the Express app or router object named rev.

When a GET request is made to /user, this callback function will execute.

The callback is async, meaning it supports await for asynchronous operations inside.
```

2. Extracting Request Data

```js
const userEmail = req.body.emailId;
The code tries to retrieve the emailId from the request body.
```

3. Database Query

```js
const user = await User.find({ emailId: userEmail });
This line uses Mongoose (or a similar ORM) to search the User collection for documents matching the condition { emailId: userEmail }.

User.find() returns an array of matching user documents (could be empty if none found).

The await keyword pauses execution until the query resolves, allowing async database operation.
```

4. Logging the Email

```js
console.log(userEmail);
Logs the email retrieved from the request to the server console for debugging or monitoring.
```

5. Handling Query Result Part1️⃣

```js
if (user.length === 0) {
  res.status(404).send("user not found");
} else {
  res.send(user);
}
If the query returns an empty array (no users found):

Sends back an HTTP 404 Not Found status.

The response body is a plain string: "user not found".

If the query finds one or more users:

Responds with the user data (array of user objects).

Uses default status 200 OK.

Data is sent as JSON (by default Express converts arrays/objects to JSON).

// 5.1 Handling query Result Part2️⃣
if (!user) {
  res.status(404).send("user not found");
}

// Why i didn't get the error now ?
!user checks if user is falsy — that means it is null, undefined, false, 0, or an empty string. This is often used when expecting a single user object (not an array). So if the query returns null (user not found), this condition triggers.
```

6. Error Handling

```js
catch (err) {
  res.status(400).send("Something went wrong ");
}
If any error occurs during the database query or processing, it is caught here.

Sends a generic 400 Bad Request status and message "Something went wrong ".

Could be improved by logging the error or sending more informative messages.
```

## 🛠️ User Profile Update API – PATCH /user/:userId

#### ✅ PATCH Endpoint with Notes as Comments (Study-Friendly Format)

```js
// PATCH endpoint to update user data
app.patch("/user/:userId", async (req, res) => {
  // Extract userId from route parameters (e.g., /user/123)
  const userId = req.params?.userId;

  // Extract the data sent in the request body (fields to update)
  const data = req.body;

  try {
    // Define only those fields which we allow the user to update
    const ALLOWED_UPDATES = [
      "userId", // optional - depends on design
      "photoUrl", // URL to user's profile picture
      "about", // Short bio or description
      "gender", // male/female/others (based on schema)
      "age", // must match schema type (e.g., Number)
      "skills", // array of tech or domain skills
    ];

    // Check if all keys in incoming data are allowed
    // Object.keys(data) returns an array of fields being updated
    // .every() checks if each field is in ALLOWED_UPDATES
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    // If any invalid field is found, throw an error
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    // Additional validation: 'skills' should not exceed 10 items
    if (data?.skills?.length > 10) {
      throw new Error("skills are not more than 10");
    }

    // Mongoose method to update the user by _id
    const users = await User.findByIdAndUpdate(
      { _id: userId }, // Find the user document by its _id
      data, // Data to update
      {
        returnDocument: "before", // returns the original document before update
        runValidators: true, // ensures schema validation (e.g., types, required, enums)
      }
    );

    // Log the document before it was updated (for debugging)
    console.log(users);

    // Send success response
    res.send("User update Successfully");
  } catch (err) {
    // Catch and send validation or update errors
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});
```

---

### 📌 Summary of What This Code Does

- **PATCH method** → Used for partial updates (not full replacement like PUT).
- **Route param** `/user/:userId` → Used to identify which user to update.
- **Validation steps**:

  1. Check if only allowed fields are being updated.
  2. Ensure `skills` array has ≤ 10 items.
  3. Enforce schema rules using `runValidators: true`.

- **Error Handling** → Sends 400 error with a clear message if anything goes wrong.
- **Success** → Returns a message `"User update Successfully"`.

---

```js
const isUpdateAllowed = Object.keys(data).every((k) =>
  ALLOWED_UPDATES.includes(k)
);
```

### 🔍 What’s happening here?

1. **`Object.keys(data)`**

   - This returns an array of all the keys (field names) in the incoming request body.
   - Example:

     ```js
     const data = { photoUrl: "...", age: 22 };
     Object.keys(data); // ["photoUrl", "age"]
     ```

2. **`.every((k) => ALLOWED_UPDATES.includes(k))`**

   - This is a loop-like array method.
   - It checks **each key `k`** in that array and makes sure it's inside `ALLOWED_UPDATES`.
   - It returns `true` **only if all keys are valid**.

---

### 🧠 So Yes — It Works Like a Loop

It's equivalent to doing this manually:

```js
let isUpdateAllowed = true;

for (let k of Object.keys(data)) {
  if (!ALLOWED_UPDATES.includes(k)) {
    isUpdateAllowed = false;
    break;
  }
}
```

---

### ✅ Use Case in Your Code

It helps prevent users from updating disallowed fields like `password`, `isAdmin`, etc., by **whitelisting** only safe keys.

---

### CHAPTER - 10

#### 1st half

```js
app.post("/login", async (req, res) => {
  try {
    // extract the emailId and password from the user's input.
    const { emailId, password } = req.body;

    // Checking whether the user exists with this email
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // comparing plaintext input password with hashed password in DB.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //! create a jwt token and after that verify the token
      const token = await jwt.sign({ _id: user._id }, "GURUJIKIJAY@19");
      res.cookie("token", token);
      res.send("Login successfully!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  // get the cookie
  try {
    const cookies = req.cookies;
    // extract the token from the cookie
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Credentials");
    }
    // validate the token
    const isTokenValid = await jwt.verify(token, "GURUJIKIJAY@19");

    const { _id } = isTokenValid;
    // find user by id
    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
    res.send("Reading cookies");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
```

---

#### 2nd half

###### 1. Creating an auth middleware

```js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the cookie
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    // Validate the token
    const decodeObj = await jwt.verify(token, "GURUJIKIJAY@19");
    // get the user id from the token
    const { _id } = decodeObj;
    // find the user using id.
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }

    // attach user with the req.user
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
```

###### 2. Using the auth middleware

```js
app.post("/sendConectionRequest", userAuth, async (req, res) => {
  //! this [userAuth] will handle the authentication once it is used as a middleware.
  // first login to generate the cookie -> if want to check the profile check it -> check who's send the connection request.
  // get the user
  const user = req.user;
  console.log("Send a connection request");

  res.send(user.firstName + " sent the connection request!");
});
```

---

###### 3. Expiring the token and cookie

```js
if (isPasswordValid) {
  //! create a jwt token and after that verify the token
  const token = await jwt.sign({ _id: user._id }, "GURUJIKIJAY@19", {
    expiresIn: "7d",
  });
  // Add the token to cookie and send the response back to the user.
  res.cookie("token", token, {
    // expire the cookie
    expires: new Data(Data.now() + 8 * 3600000),
  });
  res.send("Login successfully!!!");
}
```

###### 4. Offloading the logic of creating a JWT token inside the userSchema ?

- so that we don't have to manage how to create an jwt token inside the API.

```js
//! create a jwt token and after that verify the token
//! Don't use [arrow function] over here otherwise things break.
userSchema.methods.getJWT = async function () {
  // 'this' refers to the current user document instance
  const user = this;

  // Create a JWT token by signing the user's _id with a secret key
  // The token will expire in 7 days
  const token = await JsonWebTokenError.sign(
    { _id: user._id }, // Payload containing user ID
    "GURUJIKIJAY@19", // Secret key used to sign the token
    {
      expiresIn: "7d", // Token expiration time
    }
  );

  // Return the generated JWT token
  return token;
};

// get the current user token back inside an API
const token = await user.getJWT();
```

###### 4.Creating another method like above for validate the password and then use it inside an [/login] API.

```js
// Define a method on the userSchema to validate the password input by the user
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  // 'this' refers to the current user document instance
  const user = this;

  // Get the hashed password stored in the database for this user
  const hashPassword = user.password;

  // Use bcrypt to compare the plaintext password input by the user
  // with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashPassword
  );

  // Return true if the password matches, otherwise false
  return isPasswordValid;
};
```

- Using the validating password method

```js
const isPasswordValid = await user.validatePassword(password);
```

###### 5. Final Code

### App.js

```js
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // validation
    validateSignUpData(req);
    // only these will be allowed.
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // Creating a new instance of the user model
    // good way is explicitly mention all the fields
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successsfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    // extract the emailId and password from the user's input.
    const { emailId, password } = req.body;

    // Checking whether the user exists with this email
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // use the method of validating the password
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // And we don't have to manage how to get the jwt token inside an api.
      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the user.
      res.cookie("token", token, {
        // expire the cookie
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successfully!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/sendConectionRequest", userAuth, async (req, res) => {
  //! this [userAuth] will handle the authentication once it is used as a middleware.
  // first login to generate the cookie -> if want to check the profile check it -> check who's send the connection request.
  // get the user
  const user = req.user;
  console.log("Send a connection request");

  res.send(user.firstName + " sent the connection request!");
});
```

### User.js

```js
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// creating a user schema
const userSchema = new mongoose.Schema(
  {
    // code
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "GURUJIKIJAY@19", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashPassword = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashPassword
  );
  return isPasswordValid;
};

// Creating a mongoose model

// Method -1
const User = mongoose.model("User", userSchema);
module.exports = User;
```

#### Auth.js

```js
// Importing the jsonwebtoken package to handle JWT tokens
const jwt = require("jsonwebtoken");

// Importing the User model to interact with the users collection in the database
const User = require("../models/user");

// Middleware to authenticate the user using the JWT token stored in cookies
const userAuth = async (req, res, next) => {
  try {
    // Read the token from the cookies in the incoming request
    const { token } = req.cookies;

    // If no token is found, throw an error (user is not authenticated)
    if (!token) {
      throw new Error("Invalid token");
    }

    // Validate and decode the JWT token using the secret key
    const decodeObj = await jwt.verify(token, "GURUJIKIJAY@19");

    // Extract the user ID (_id) from the decoded token payload
    const { _id } = decodeObj;

    // Look up the user in the database using the extracted user ID
    const user = await User.findById(_id);

    // If no user is found with that ID, throw an error
    if (!user) {
      throw new Error("user not found");
    }

    // Attach the user document to the request object for use in downstream middleware/routes
    req.user = user;

    // Call the next middleware or route handler in the stack
    next();
  } catch (err) {
    // If any error occurs (invalid token, user not found, etc.), send a 400 response with the error message
    res.status(400).send("ERROR: " + err.message);
  }
};

// Export the middleware so it can be used in other files
module.exports = {
  userAuth,
};
```

---

# Chapter - 11
