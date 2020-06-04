import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

import styled from 'styled-components';
import _ from 'lodash';

const SearchWrapper = styled.div`
`;
class GlobalSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchVal: ''
        };
        this.search = this.search.bind(this);
        this.selectResult = this.selectResult.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const prevSearchKey = this.props.defaultSearchVal;
        const newSearchKey = nextProps.defaultSearchVal;
        if (prevSearchKey !== newSearchKey) {
            this.setState({
                searchVal: newSearchKey
            })
        }
    }
    search(e, data) {
        const key = data && data.value;
        this.setState({
            searchVal: key
        })
        this.props.updateKey(key);
        if (key.length > 0) {
            this.props.search(key);
        }
    }
    selectResult(e, data) {
        this.props.onResultSelect(data.result.screen_name);
    }
    getFormattedResults() {
        const { results } = this.props;
        let formattedResults = [];
        results && results.length > 0 && results.map((_result) => {
            formattedResults.push({ title: _result && _result.user && _result.user.name, screen_name: _result && _result.user && _result.user.screen_name });
        });
        return formattedResults;
    }
    render() {
        const { isResultLoading } = this.props;
        return (
            <SearchWrapper>
                <Search
                    input={{ icon: 'search', type: 'text', iconPosition: 'left' }}
                    value={this.state.searchVal}
                    aligned='center'
                    onSearchChange={_.debounce(this.search, 500, { leading: true })}
                    results={this.getFormattedResults()}
                    loading={isResultLoading}
                    onResultSelect={this.selectResult}
                />
            </SearchWrapper>
        )
    }
}

export default GlobalSearch;