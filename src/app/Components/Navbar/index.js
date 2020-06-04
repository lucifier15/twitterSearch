import React, { Component } from 'react';
import { Segment, Grid, Menu, Icon, Header, Button } from 'semantic-ui-react';
import GlobalSearch from '../Search';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const NavContainer = styled.div`
    padding: 1em;
    .search .input{
        width: 100%;
    }
    .results{
        width: 100% !important;
        max-height: 50vh;
        overflow-y: scroll;
    }
    h1 > i{
        color: #00acee !important;
        margin: 0 2px !important;
    }
    .search-btn{
        background: #00acee !important;
        color: #fff;
        padding: 10px 30px;
        font-weight: 100;
    }
`;

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { searchBtnRoute } = this.props
        return (
            <Segment>
                <NavContainer>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Link to='/'>
                                    <Header as='h1'>
                                        TWEET
                                    <Icon name='twitter' />
                                    SEARCH
                                    </Header>
                                </Link>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <GlobalSearch {...this.props} />
                            </Grid.Column>
                            <Grid.Column>
                                <Link to={searchBtnRoute}>
                                    <Button className='search-btn'>Search</Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </NavContainer>
            </Segment>
        )
    }
}

export default Navbar;