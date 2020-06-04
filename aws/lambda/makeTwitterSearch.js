/**
 * Below AWS Lambda function 
 * uses AWS Lambda Layer that contains
 * twit package. 
 */


exports.handler = async (event) => {
    var Twit = require('twit');

    /**
     * Replace below keys with yours
     */
    var T = new Twit({
      consumer_key:         '***********************************',
      consumer_secret:      '***********************************',
      access_token:         '***********************************',
      access_token_secret:  '***********************************',
      timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
      strictSSL:            true,     // optional - requires SSL certificates to be valid.
    })
    
    const searchQuery = event['queryStringParameters'];
    const type= searchQuery && searchQuery['type'];
    let route = '';
    let query = {};
    if(type === 'gSearch'){
        route = 'search/tweets';
        query = { key: 'q', value: searchQuery && searchQuery['_key'] };
    }else if(type === 'uSearch'){
        route = 'statuses/user_timeline';
        query = { key: 'screen_name', value: searchQuery && searchQuery['screen_name'] };
    }
    const screen_name = searchQuery && searchQuery['screen_name'] || 'ayush';
    const res = await T.get(route, { [query.key]: query['value'], count: 20 }).then((err, data, response) => {
        if(err){
            return err;
        }
        return data.data.stat;
    })
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(res),
    };
    return response;
};
