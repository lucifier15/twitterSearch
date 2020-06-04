import React, { Component } from 'react';
import { Card, Image, Button, Grid, Placeholder } from 'semantic-ui-react';

class LoadingTweets extends Component {
    render() {
        return (
            <div>
                <Grid.Column>
                    <Card.Group>
                        <Card style={{ width: '90% !important' }}>
                            <Card.Content>
                                <Placeholder>
                                    <Placeholder.Header image>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                    <Placeholder.Paragraph>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                            </Card.Content>
                        </Card>
                        <Card style={{ width: '90% !important' }}>
                            <Card.Content>
                                <Placeholder>
                                    <Placeholder.Header image>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                    <Placeholder.Paragraph>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                            </Card.Content>
                        </Card>
                        <Card style={{ width: '90% !important' }}>
                            <Card.Content>
                                <Placeholder>
                                    <Placeholder.Header image>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                    <Placeholder.Paragraph>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
            </div >
        )
    }
}

export default LoadingTweets;