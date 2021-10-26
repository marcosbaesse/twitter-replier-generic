import { config } from 'dotenv';
config();

import Twitter from 'twitter';
import TwitterClient from './twitter-client';

const credentials = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
} as Twitter.AccessTokenOptions;

const client = new TwitterClient(credentials);
client.stream();