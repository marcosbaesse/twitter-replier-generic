import { config } from 'dotenv';
config();
import Twitter from 'twitter';

const credentials = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
} as Twitter.AccessTokenOptions;

const client = new Twitter(credentials);

client.stream("statuses/filter", { track: "@FlerteB" }, (stream): void => {
    stream.on("data", (tweet): void => {
        const reply = {
            status: "Você não é o steven, mas é meu universo :D",
            in_reply_to_status_id: tweet.id_str
        };

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
