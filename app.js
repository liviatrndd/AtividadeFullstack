const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());

app.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/atvconn', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => {console.log('Can not connect to the database'+ err)});

const moviesRoute = require('./routes/movies.routes');

app.use('/movies', moviesRoute);
app.get('/', function(req, res){
    res.send("Hello World!")
});



app.listen(3000, function(){
    console.log("Server working");
});
