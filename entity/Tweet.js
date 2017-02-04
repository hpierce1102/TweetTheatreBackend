const TwitterUser = require('./TwitterUser');

class Tweet{
    constructor(){
        this._user = new TwitterUser();
        this._text = '';
        this._imageUrl = '';

        return this;
    }

    get user(){ return this._user }
    set user(user){
        if(!(user instanceof TwitterUser)){
            throw new Error('Invalid Argument: Tweet.user must be an instance of TwitterUser');
        } else {
            this._user = user;
        }
    }

    get text(){ return this._text }
    set text(text){
        if(!(typeof text == 'string')){
            throw new Error('Invalid Argument: Tweet.text must be a string.');
        } else {
            this._text = text;
        }
    }

    get imageUrl(){ return this._imageUrl }
    set imageUrl(imageUrl){
        if(!(typeof imageUrl == 'string' || imageUrl === null)){
            throw new Error('Invalid Argument: Tweet.imageUrl must be a string or null.');
        } else {
            this._imageUrl  = imageUrl;
        }
    }
}

module.exports = Tweet;