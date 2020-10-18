require('dotenv').config();
const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.stream("statuses/filter", { track: "@FlerteB" }, function(stream) {
    stream.on("data", function(tweet) {
        const reply = {
            status: "Você não é o steven, mas é meu universo :D",
            in_reply_to_status_id: tweet.id_str
        };

        client.post("statuses/update", reply, function(error, tweetReply, response) {
            if (error) {
                console.log({ error, reply, response });
            }

            console.log({ tweetReply });
        });
    });

    stream.on("error", function(error) {
        console.log({ "streamError": error });
    });
});
