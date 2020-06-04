import { call, put, takeLatest, all, fork } from 'redux-saga/effects';

import * as types from '../util/constants';
import { loadTweetsSuccess, loadTweetsByKeySuccess, loadTweetsByKeyError, loadTweetsError } from '../actions';
import { request } from '../util/request';

const globalTweetAwsApi = 'https://xiop23jh23.execute-api.ap-south-1.amazonaws.com/DevStage/api-search-tweets';

function* fetchSearchResults(action) {
    const key = action && action.key ? action.key : false;
    const requestUri = `${globalTweetAwsApi}?type=gSearch` + `${key ? `&_key=${key}` : ''}`;
    try {
        let result = yield call(request, requestUri);
        result = result && result.data && result.data.statuses ? result.data.statuses : null;
        yield put(loadTweetsByKeySuccess(result));
    } catch (error) {
        yield put(loadTweetsByKeyError());
    }
}

//watcher saga
function* fetchSearchResultsWatcher() {
    yield takeLatest(types.LOAD_TWEETS_BY_KEY, fetchSearchResults);
}

function* fetchTweets(action) {
    const screen_name = action && action.screen_name ? action.screen_name : false;
    const requestUri = `${globalTweetAwsApi}?type=uSearch` + `${screen_name ? `&screen_name=${screen_name}` : ''}`;
    try {
        let tweets = yield call(request, requestUri);
        tweets = tweets && tweets.data ? tweets.data : null;
        yield put(loadTweetsSuccess(tweets));
    } catch (error) {
        yield put(loadTweetsError());
    }
}

//watcher saga
function* fetchTweetsWatcher() {
    yield takeLatest(types.LOAD_USER_TWEETS, fetchTweets);
}

export default function* rootSaga() {
    yield all([
        fork(fetchTweetsWatcher),
        fork(fetchSearchResultsWatcher)
    ])
}