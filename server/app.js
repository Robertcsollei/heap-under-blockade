/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
var mongoose = require('mongoose');

/**** link to route files ****/
const questionRoutes = require("./routes/questionRoutes")();
const userRoutes = require("./routes/userRoutes")();
const roleRoutes = require("./routes/roleRoutes")();
const categoryRoutes = require("./routes/categoryRoutes")();
const commentRoutes = require("./routes/commentRoutes")();

/**** MongoDB connection string ****/
let baseUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@heapunderblockade.yjepg.mongodb.net/questions?retryWrites=true&w=majority`

mongoose.connect(baseUrl ,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected!');
    }
});

/**** Configuration ****/
const app = express(); 

function createServer() {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  /**** Add routes ****/
  app.use("/api", questionRoutes);
  app.use("/api", userRoutes);
  app.use("/api", roleRoutes);
  app.use("/api", categoryRoutes);
  app.use("/api", commentRoutes)

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );

  
  return app;
}

module.exports = createServer;