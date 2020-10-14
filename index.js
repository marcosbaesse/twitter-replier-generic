const axios = require('axios').default;

axios.get("https://api.twitter.com/2/tweets/20", {
    headers: { "Authorization": "Bearer <>" }
})
.then(console.log);
