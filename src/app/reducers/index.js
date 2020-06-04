import * as types from '../util/constants';

const initialState = {
    isSearchActive: false,
    result: null,
    searchKey: '',
    isTweetsLoading: false,
    tweets: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_TWEETS_BY_KEY:
            return { ...state, isSearchActive: true }
        case types.LOAD_TWEETS_BY_KEY_SUCCESS:
            return {
                ...state,
                isSearchActive: false,
                result: action.result
            }
        case types.LOAD_TWEETS_BY_KEY_ERROR:
            return {
                ...state,
                result: [],
                isSearchActive: false
            }
        case types.LOAD_USER_TWEETS:
            return {
                ...state,
                searchKey: action.screen_name,
                isTweetsLoading: true
            }
        case types.LOAD_USER_TWEETS_SUCCES:
            return {
                ...state,
                isTweetsLoading: false,
                tweets: action.tweets
            }
        case types.LOAD_USER_TWEETS_ERROR:
            return {
                ...state,
                isTweetsLoading: false,
                tweets: []
            }
        default:
            return state;
    }
}

export default rootReducer;