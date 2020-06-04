import { createSelector } from 'reselect';

const tweetsLoadingSelector = state => state.rootReducer.isTweetsLoading;
const searchScreenNameSelector = state => state.rootReducer.searchKey;
const tweetsSelector = state => state.rootReducer.tweets;

export const selectTweets = createSelector(
    [tweetsLoadingSelector, searchScreenNameSelector, tweetsSelector],
    (isTweetsLoading, searchKey, tweets) => {
        return {
            isTweetsLoading,
            searchKey,
            tweets
        }
    }
)

const searchActiveSelector = state => state.rootReducer.isSearchActive;
const searchResultSelector = state => state.rootReducer.result;

export const selectSearchResult = createSelector(
    [searchActiveSelector, searchResultSelector],
    (isSearchActive, result) => {
        return {
            isSearchActive,
            result
        }
    }
)