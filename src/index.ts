import { config } from 'dotenv';
config();
import Twitter from 'twitter';

const lerolero = require('lerolero');

const credentials = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
} as Twitter.AccessTokenOptions;

const client = new Twitter(credentials);

client.stream("statuses/filter", { track: "@MarcosBBot" }, (stream): void => {
    console.log("listening...");

    stream.on("data", (tweet): void => {
        let replyMessage = lerolero().toLowerCase();

        const reply = {
            status: `Oi @${tweet.user.screen_name}, ${replyMessage}`,
            in_reply_to_status_id: tweet.id_str
        };

        if(reply.status.length>250){
            reply.status = reply.status.slice(0,250-reply.status.length)
        }

        console.log({ reply });

        client.post("statuses/update", reply, (error, tweetReply, response): void => {
            if (error) {
                console.log({ error, reply, response });
            }

            console.log({ tweetReply });
        });
    });

    stream.on("error", (error): void => {
        console.log({ "streamError": error });
    });
});
