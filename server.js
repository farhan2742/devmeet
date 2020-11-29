const express = require('express');
const mongoose = require("mongoose");

const { restart } = require('nodemon');

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

app.get('/', (req, res) => res.send("hello world"));

// dot ENV
const dotenv = require('dotenv');
dotenv.config();

// DB Config
const dbuser = process.env.DBUser
const dbpass = process.env.DBPass
const dbname = process.env.DBName
const dburl = `mongodb+srv://${dbuser}:${dbpass}@cluster0.tkvye.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose
    .connect(dburl)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// routes

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));