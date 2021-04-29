const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {main} = require('./views')
const { Page, User, db } = require('./models');
const app = express();


// Logging Middleware
app.use(morgan("dev"));

// Static Middleware
app.use(express.static(__dirname + "/stylesheets"));

// Bodyparsing Middleware
app.use(bodyParser.urlencoded({extended: false}))


// Database initialization
const init = async() => {
  await db.sync({force: true})
  // await Page.sync();
  // await User.sync();
  // const PORT = 5432;
  app.listen(PORT, () => {
    console.log(`Server is listning on port ${PORT}!`)
  })
}
init();

// Connection Verification
db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

// GET /
app.get("/", (req, res, next) =>{
  res.send(main())
})



const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
