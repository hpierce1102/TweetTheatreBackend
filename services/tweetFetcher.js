const Twitter = require('twitter');
const OAuth2 = require('oauth').OAuth2;

//heavily modified from:
//https://coderwall.com/p/3mcuxq/twitter-and-node-js-application-auth
function getBearerToken(consumerKey, consumerSecret, callback){
    let oauth2 = new OAuth2(consumerKey, consumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);

    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function (e, access_token) {
        callback(access_token);
    });
}

class TweetFetcher {
    constructor(consumerKey, consumerSecret){

        //We need a promise here because the bearer token must be retrieved async.
        this.twitterAPI = new Promise(function(resolve, reject){
                getBearerToken(consumerKey, consumerSecret, function(bearerToken){
                    resolve(new Twitter({
                        consumer_key : consumerKey,
                        consumer_secret: consumerSecret,
                        bearer_token: bearerToken,
                    }))
                })
            })
            .catch(e => console.error(e))
        ;

        this.lastAPICheck = {
            time : null,
            keyword : null
        };
        this.tweets = [];
    }

    getTweets(keyword, maxTweets){
        const cachedTweetsStillRelevant = this.lastAPICheck.keyword === keyword;
        if(!cachedTweetsStillRelevant){
            this.tweets = [];
        }

        return this.fetchTweets(keyword)
            .then( () => this.tweets.splice(0, maxTweets) )
            .catch( response => console.error('failed to fetch tweets' + response))
    }

    fetchTweets(keyword, count){
        return new Promise(
            function(resolve, reject){
                this.accessApi(keyword)
                    .then(function(tweets){
                        this.tweets = this.tweets.concat(tweets);

                        if(this.tweets.length < count){
                            return this.fetchTweets(keyword, count);
                        } else {
                            resolve();
                        }
                    }.bind(this));
            }.bind(this)
        )
        .catch(e => console.error(e))
    }

    accessApi(keyword){
        this.lastAPICheck.keyword = keyword;

        return this.twitterAPI
            .then(function(twitter){
                return twitter.get('https://api.twitter.com/1.1/search/tweets.json',
                    {
                        q : keyword,
                        result_type : 'recent'
                    }
                )
                    .then( tweets => tweets.statuses)
                    .catch(error => console.error(error));
            })
            .catch(e => console.error(e));
    }

    // static constructFromFile(path){
    //     // return new
    // }
}

module.exports = TweetFetcher;