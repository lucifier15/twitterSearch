import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Button, Grid } from 'semantic-ui-react';
import GlobalSearch from '../../Components/Search';
import { Link } from 'react-router-dom';
import { loadTweetsByKey } from '../../actions';
import { selectSearchResult } from '../../selectors';
import styled from 'styled-components';
const MainWrapper = styled.div`
    h1{
        margin-top: 7.5em !important;
        i{
            font-size: 70px !important;
            color: #00acee !important;
            line-height: 60px;
        }
    }
    .results{
        left: 30% !important;
        width: 40% !important;
        max-height: 40vh;
        overflow-y: scroll;
    }
    .search .input{
        margin-top: 1.5em;
        width: 40%;
    }
    .search .input{
        border-radius: 10% !important;
    }
    .search-btn{
        margin-top: 2em;
        background: #00acee !important;
        padding: 10px 30px;
        font-weight: 100;
    }
    @media(max-width: 480px){
        .search .input{
            width: 100%;
        }
        .results{
            left: 0 !important;
            width: 100% !important;
        }
    }
`;

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: ''
        }
        this.updateKeyToState = this.updateKeyToState.bind(this);
        this.selectTweetResult = this.selectTweetResult.bind(this);
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
    render() {
        const { searchResult: { isSearchActive, result } } = this.props;
        const { searchKeyword } = this.state;
        return (
            <MainWrapper>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Header as='h1'>
                            TWEET
                            <Icon name='twitter' />
                            SEARCH
                             </Header>
                            <GlobalSearch
                                search={this.props.loadTweetsByKey}
                                updateKey={this.updateKeyToState}
                                results={result}
                                isResultLoading={isSearchActive}
                                onResultSelect={this.selectTweetResult}
                            />
                            <Link to={`/${searchKeyword}`}>
                                <Button className='search-btn' color='blue'>Search</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </MainWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchResult: selectSearchResult(state)
    }
}

const mapDispatchToProps = dispatch => ({
    loadTweetsByKey: (key) => { dispatch(loadTweetsByKey(key)) },
})
export default connect(mapStateToProps, mapDispatchToProps)(Landing);