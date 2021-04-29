const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {main} = require('./views')
const { Page, User, db } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

const app = express();


// Logging Middleware
app.use(morgan("dev"));

// Static Middleware
app.use(express.static(__dirname + "/stylesheets"));

// Bodyparsing Middleware
app.use(bodyParser.urlencoded({extended: false}))



// Database initialization
const init = async() => {
  await db.sync({force: false})

  const PORT = 5432;
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

// Route to /wiki
app.use('/wiki', wikiRouter);

// Route to /users
app.use('/users', userRouter);

// GET /
app.get("/", (req, res, next) =>{
  res.redirect('/wiki')
})


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
