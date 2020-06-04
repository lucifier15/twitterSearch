/**
 * All actions here  
 */
import * as types from '../util/constants';

export function loadTweetsByKey(key) {
    return {
        type: types.LOAD_TWEETS_BY_KEY,
        key
    }
}

export function loadTweetsByKeySuccess(result) {
    return {
        type: types.LOAD_TWEETS_BY_KEY_SUCCESS,
        result
    }
}

export function loadTweetsByKeyError() {
    return {
        type: types.LOAD_TWEETS_BY_KEY_ERROR
    }
}

export function loadTweets(screen_name) {
    return {
        type: types.LOAD_USER_TWEETS,
        screen_name
    }
}

export function loadTweetsSuccess(tweets) {
    return {
        type: types.LOAD_USER_TWEETS_SUCCES,
        tweets
    }
}

export function loadTweetsError() {
    return {
        type: types.LOAD_USER_TWEETS_ERROR
    }
}