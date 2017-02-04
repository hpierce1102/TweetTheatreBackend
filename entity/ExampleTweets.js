const Tweet =  require("./Tweet");
const ExampleTwitterUsers = require("./ExampleTwitterUsers");

const tweet1 = new Tweet();
tweet1.text = "FooBar. This is a Tweet.";
tweet1.imageUrl = null;
tweet1.user = ExampleTwitterUsers[0];

const tweet2 = new Tweet();
tweet2.text = "This is another example Tweet. it has been said by an example user.";
tweet2.imageUrl = null;
tweet2.user = ExampleTwitterUsers[1];

const tweet3 = new Tweet();
//https://twitter.com/realDonaldTrump/status/826175120238604288
tweet3.text = "The American dream is back. We’re going to create an environment for small business like we haven’t had in many, many decades!";
tweet3.imageUrl = "https://pbs.twimg.com/media/C3cp3XdVYAA6zqE.jpg:large";
tweet3.user = ExampleTwitterUsers[2];

const ExampleTweets = [tweet1, tweet2, tweet3];

module.exports = ExampleTweets;

