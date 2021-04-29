const router = require("express").Router();
const { Page } = require("../models");
const { addPage, wikiPage } = require("../views");


// GET /wiki
router.get('/', (req, res, next) => {
  res.send('got to /wiki/')
})

// POST /wiki
router.post('/', async (req, res, next) => {
  try{

    const {
      name,
      email,
      title,
      content,
      status
    } = req.body;

    const page = await Page.create({
      title,
      content,
      status
    })

    res.send(wikiPage(page, name))

    // console.log("page = ", page)

  } catch(error){next(error)}
})

// GET /wiki/add
router.get('/add', (req, res, next) => {
  res.send(addPage())
})

// GET /wiki/:slug
router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params;

  const page = await Page.findOne({
    where:{
      slug
    }
  })

  res.json(page)
})

module.exports = router;
