const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

  let data = {
    name: 'sam',
    age: 18
  }

  res.render('index', data)
})

module.exports = router