const router = require("express").Router();
const { User } = require('../models');

// GET /users
router.get('/', (req, res, next) => {
  res.send('got to /users/')
})

// POST /wiki
router.post('/', (req, res, next) => {
  res.send('got to POST /users/')
})

// GET /add
router.get('/add', (req, res, next) => {
  res.send('got to GET /users/')
})



module.exports = router;


