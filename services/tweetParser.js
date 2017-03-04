//Parses objects from the Twitter API into significantly stripped down models that we use
const TwitterUser = require('../entity/TwitterUser');
const Tweet = require('../entity/Tweet');

//Only get the first image - others will take too much space.
function getImageUrl(tweet){
    if(typeof tweet.entities == "object" && tweet.entities.media == "object"){
        return tweet.entities.media[0].media_url;
    } else {
        return null;
    }
}

class TweetParser {
    static stripTweet(tweetObj){
        let user = new TwitterUser();

        user.realName = tweetObj.user.name;
        user.username = tweetObj.user.screen_name;
        user.profileImageUrl = tweetObj.user.profile_image_url;
        user.verified = tweetObj.user.verified;

        let tweet = new Tweet();

        tweet.user = user;
        tweet.text = tweetObj.text;
        tweet.imageUrl = getImageUrl(tweet);

        return tweet;
    }
}

module.exports = TweetParser;