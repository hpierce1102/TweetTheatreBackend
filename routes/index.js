// const ExampleTweets = require("../entity/ExampleTweets");
const Tweet = require("../entity/Tweet");
const TwitterUser = require("../entity/TwitterUser");
const TweetFetcher = require('../services/tweetFetcher.js');
const TweetParser = require('../services/tweetParser');

let express = require('express');
let router = express.Router();

let fs = require('fs');
let obj = JSON.parse(fs.readFileSync('./secret.json', 'utf8'));

const tweetFetcher = new TweetFetcher(obj.consumer_key, obj.consumer_secret, obj.bearer_token);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/tweets', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

    tweetFetcher.getTweets('@realDonaldTrump', 4)
        .then(function(tweets){
            tweets = tweets.map(function(tweet){
                return TweetParser.stripTweet(tweet);
            });

            res.json(tweets);
        })
        .catch(function(exception){
          console.error(exception);
        });

  // res.json(ExampleTweets);
});

module.exports = router;
