class TwitterUser{
    constructor(){
        this._username = '';
        this._realName = '';
        this._profileImageUrl = '';
        this._verified = false;

        return this;
    }

    get username() { return this._username }
    set username(string){
        if(!(typeof string == 'string')){
            throw new Error('Invalid Argument: TwitterUser.username must be a string.');
        } else {
            this._username = string;
        }
    }

    get realName() { return this._realName }
    set realName(string){
        if(!(typeof string == 'string')){
            throw new Error('Invalid Argument: TwitterUser.realName must be a string.');
        } else {
            this._realName = string;
        }
    }

    get profileImageUrl() { return this._profileImageUrl }
    set profileImageUrl(string){
        if(!(typeof string == 'string')){
            throw new Error('Invalid Argument: TwitterUser.profileImageUrl must be a string.');
        } else {
            this._profileImageUrl = string;
        }
    }

    get verified() { return this._verified }
    set verified(bool){
        if(!(typeof bool == 'boolean')){
            throw new Error('Invalid Argument: TwitterUser.verified must be a boolean.');
        } else {
            this._verified = bool;
        }
    }
}

module.exports = TwitterUser;