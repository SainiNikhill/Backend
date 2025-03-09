# Backend Development with Express.js & MongoDB

## Overview
This document serves as a recall guide for everything learned during this backend development session, focusing on **Express.js**, **MongoDB**, **Mongoose**, and essential CRUD operations.

---

## 📌 Express.js Overview
**Express.js** is a fast and minimalist web framework for **Node.js**, used for building web applications and APIs.

### 🔹 Features of Express.js:
- **Middleware Support** – Pre-process requests before sending responses.
- **Routing System** – Define multiple routes for different HTTP methods (GET, POST, PUT, DELETE).
- **Template Engines** – Supports **EJS**, **Pug**, **Handlebars**, etc.
- **Static File Serving** – Serve images, CSS, and JavaScript files easily.
- **REST API Development** – Ideal for building APIs.
- **Database Integration** – Works well with MongoDB (Mongoose), PostgreSQL, MySQL, etc.

---

## 🚀 Server Setup
### 🔹 Install Express.js
```sh
npm i express
```
### 🔹 Basic Server Setup
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

## 📍 Routes in Express.js
Routes define how an application responds to client requests.
```js
const express = require('express');
const app = express();

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

// About Route
app.get('/about', (req, res) => {
    res.send('This is the About Page');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

## ⚙️ Middleware in Express.js
Middleware functions execute during the request-response cycle.
### 🔹 Types of Middleware
1. **Built-in Middleware**
   ```js
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(express.static("public"));
   ```
2. **Third-party Middleware**
   ```js
   const morgan = require('morgan');
   app.use(morgan("dev"));
   ```
3. **Custom Middleware**
   ```js
   app.use((req, res, next) => {
       console.log("Custom Middleware Executed");
       next();
   });
   ```

---

## 🗄️ Database: MongoDB & Mongoose
**Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js.

### 🔹 Install Mongoose
```sh
npm i mongoose
```
### 🔹 Database Connection
```js
const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://0.0.0.0/backend').then(() => {
    console.log("Connected to database");
});
module.exports = connection;
```

### 🔹 Defining a Model
```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
```

---

## 🔄 CRUD Operations with Mongoose

### **Create (C) - Insert Data**
```js
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const newUser = await User.create({ username, password, email });
    res.send(newUser);
});
```

### **Read (R) - Retrieve Data**
```js
app.get('/get-users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.get('/get-user', async (req, res) => {
    const user = await User.findOne({ username: 'chikoo' });
    res.send(user);
});
```

### **Update (U) - Modify Data**
```js
app.put('/update-user', async (req, res) => {
    await User.findOneAndUpdate({ username: "chikoo" }, { email: "updated@example.com" });
    res.send("User Updated");
});
```

### **Delete (D) - Remove Data**
```js
app.delete('/delete-user', async (req, res) => {
    await User.findOneAndDelete({ username: "chikoo" });
    res.send("User Deleted");
});
```

---

## 🖥️ Views with EJS
EJS (Embedded JavaScript) is a template engine for rendering HTML in Express.
### 🔹 Setup EJS
```js
app.set('view engine', 'ejs');
```

### 🔹 Sample Form (register.ejs)
```html
<form action="/register" method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="email" name="email" placeholder="Email">
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Register</button>
</form>
```

---

## 🌐 Frontend Interaction with Forms
### 🔹 HTML Form (index.html)
```html
<form action="/get-form-data" method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="email" name="email" placeholder="Email">
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Submit</button>
</form>
```
### 🔹 Handling Form Data in Express
```js
app.post('/get-form-data', (req, res) => {
    console.log(req.body);
    res.send("Data received");
});
```

---

## 🎯 Summary
- **Express.js** is a powerful framework for building backend applications.
- **Middleware** enhances request processing.
- **MongoDB with Mongoose** simplifies database operations.
- **CRUD operations** are the core functionalities.
- **EJS** enables dynamic HTML rendering.
- **Forms & Body Parsing** allow user input handling.

This document will help recall key concepts and code snippets whenever needed! 🚀

