import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../Components/Navbar';

import styled from 'styled-components';
import { Grid, Card, Image, Header, Icon } from 'semantic-ui-react';
import { loadTweets, loadTweetsByKey } from '../../actions';
import { selectTweets, selectSearchResult } from '../../selectors';
import LoadingTweets from './LoadingTweets';

import moment from 'moment';

const MainWrapper = styled.div`
`;

const TweetsContainer = styled.div`
    padding: 3em;
    .profile-image{
        height: 58px !important;
        width: 58px !important;
    }
    .tweet-date{
        font-size: 12px;
        float: right;
        margin-top: 8px !important;
    }
    .tweet-social-interactions span{
        font-size: 12px;
        margin-right: 15px !important;
    }
    .user-name{
        font-size: 18px;
        margin-top: 8px !important;
    }
    .screen-name, .tweet-descr{
        font-size: 14px
    }
`;

class Tweets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: ''
        }
        this.updateKeyToState = this.updateKeyToState.bind(this);
        this.selectTweetResult = this.selectTweetResult.bind(this);
    }


    componentDidMount() {
        const { match: { params } } = this.props;
        const screen_name = params && params.username;
        this.props.loadTweets(screen_name);
    }

    componentWillReceiveProps(nextProps){
        const oldParams = this.props && this.props.match && this.props.match.params;
        const currentParams = nextProps && nextProps.match && nextProps.match.params;
        if(oldParams.username !== currentParams.username){
            const screen_name = currentParams && currentParams.username;
            this.props.loadTweets(screen_name);
        }
    }

    updateKeyToState(key) {
        this.setState({
            searchKeyword: key
        })
    }
    selectTweetResult(screen_name) {
        const { history } = this.props;
        history.push(`/${screen_name}`);
    }
    renderTweets() {
        const { tweetList: { isTweetsLoading, tweets } } = this.props;
        if (isTweetsLoading) {
            return <LoadingTweets />
        }
        if(tweets && tweets.length === 0){
            return (
                <Header as='h4' content='No Tweets Found !!!' />
            )
        }
        return tweets && tweets.length > 0 && tweets.map((_tweet, index) => {
            const tweet_user = _tweet && _tweet.user;
            return (
                <Grid.Column key={index}>
                    <Card.Group>
                        <Card style={{ width: '90%' }}>
                            <Card.Content>
                                <span className='tweet-date'>{moment(_tweet && _tweet.created_at).format('ll')}</span>
                                <Image className='profile-image' floated='left' src={tweet_user && tweet_user.profile_image_url} avatar />
                                <Card.Header className='user-name'>
                                    {tweet_user && tweet_user.name}
                                </Card.Header>
                                <Card.Meta className='screen_name'>{tweet_user && `@${tweet_user.screen_name}`}</Card.Meta>
                                <Card.Description>
                                    <p className='tweet-descr'> {_tweet && _tweet.text} </p>
                                    <br />
                                    <p className='tweet-social-interactions'>
                                        <span>
                                            <Icon name='comment outline' />
                                            {_tweet && _tweet.favorite_count}
                                        </span>
                                        <span>
                                            <Icon name='retweet' />
                                            {_tweet && _tweet.retweet_count}
                                        </span>
                                    </p>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
            )
        })
    }
    render() {
        const { searchResult: { isSearchActive, result },tweetList: {searchKey} } = this.props;
        const { searchKeyword } = this.state;
        return (
            <MainWrapper>
                <Navbar
                search={this.props.loadTweetsByKey}
                updateKey={this.updateKeyToState}
                results={result}
                isResultLoading={isSearchActive}
                onResultSelect={this.selectTweetResult}
                searchBtnRoute={searchKeyword}
                defaultSearchVal={searchKey}
                />
                <TweetsContainer>
                    <Grid columns={3} stackable>
                        {this.renderTweets()}
                    </Grid>
                </TweetsContainer>
            </MainWrapper>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tweetList: selectTweets(state),
        searchResult: selectSearchResult(state)
    }
}

const mapDispatchToProps = dispatch => ({
    loadTweets: (screen_name) => { dispatch(loadTweets(screen_name)) },
    loadTweetsByKey: (key) => { dispatch(loadTweetsByKey(key)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);