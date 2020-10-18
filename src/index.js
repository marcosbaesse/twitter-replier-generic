require('dotenv').config();
const Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.post('statuses/update', { status: 'Roi... Twitter, né?' }, function(error, tweet, response) {
    if (error) {
        console.error(error);
    }

    console.log(tweet);
  });

