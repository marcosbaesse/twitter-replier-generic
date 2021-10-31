import Twitter, { AccessTokenOptions } from 'twitter';

interface Tweet {
    id_str: string;
    user: {
        screen_name: string;
    }
}
class TwitterClient {

    private client: Twitter;

    constructor(credentials: AccessTokenOptions) {
        this.client = new Twitter(credentials);
    }

    replyGenerate(tweet: Tweet): object {
        const lerolero = require('lerolero');
        let replyMessage = lerolero().toLowerCase();

        const reply = {
            status: `Oi @${tweet.user.screen_name}, ${replyMessage}`,
            in_reply_to_status_id: tweet.id_str
        };

        if (reply.status.length > 250) {
            reply.status = reply.status.slice(0, 250 - reply.status.length)
        }

        console.log({ reply });

        return reply;
    }

    stream(): void {
        this.client.stream("statuses/filter", { track: "@MarcosBBot" }, (stream: any): void => {
            console.log("listening...");

            stream.on("data", (tweet: any): void => {
                const reply = this.replyGenerate(tweet);

                this.client.post("statuses/update", reply, (error: any, tweetReply: any, response: any): void => {
                    if (error) {
                        console.log({ error, reply, response });
                    }

                    console.log({ tweetReply });
                });
            });

            stream.on("error", (error: any): void => {
                console.log({ "streamError": error });
            });
        });
    }
}

export default TwitterClient