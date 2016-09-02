import Twit from "twit";
import report from "./text-responder";

const Tweet = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
});

var stream = Tweet.stream('statuses/filter', { track: ['@nairabot'] });
stream.on('tweet', tweetEvent);

async function tweetEvent(tweet) {
  console.log(tweet, "=====================teswwett");
  const rates = await report("rates");
  console.log(rates)
    // Who sent the tweet?
    var name = tweet.user.screen_name;
    // What is the text?
    // var txt = tweet.text;
    // the status update or tweet ID in which we will reply
    var nameID  = tweet.id_str;

     // Get rid of the @ mention
    // var txt = txt.replace(/@myTwitterHandle/g, "");

    // Start a reply back to the sender
    var reply = "You mentioned me! @" + name + ' ' + 'You are super cool!';
    var params             = {
                              status: reply,
                              in_reply_to_status_id: nameID
                             };

    Tweet.post('statuses/update', params, function(err, data, response) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log('Tweeted: ' + params.status);
      }
    })
};