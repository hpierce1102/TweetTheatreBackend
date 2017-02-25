const ExampleTweets = require("../entity/ExampleTweets");
const Tweet = require("../entity/Tweet");
const TwitterUser = require("../entity/TwitterUser");

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tweets', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(ExampleTweets);
});

module.exports = router;
