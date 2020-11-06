require('dotenv').config()
const axios = require('axios');
// Set token on .env file
const token = process.env.TWITTER_TOKEN;
const { mapTweetsData } = require('./mapdata');
const { getSentiments } = require('./analyze');
const generatePdf = require('./generatePdf');
// Create base HTTP client instance to make requests
const instance = axios.create({
  baseURL: 'https://api.twitter.com/2/',
  headers: { 'Authorization': 'Bearer ' + token }
});

const getData = async (topicToSearch) => {
  // Make requests
  const { data } = await instance.get('tweets/search/recent', {
    params: {
      'query': topicToSearch,
      'expansions': 'author_id',
      'user.fields': 'username,profile_image_url',
      'max_results': 10
    }
  }
  )

  const mappedResults = mapTweetsData(data);
  const sentimentAnalysis = await getSentiments(mappedResults);
  generatePdf(sentimentAnalysis, topicToSearch);
  console.log('File generated!')

}

// specify query here
//getData()

const queryToSearch = (process.argv.slice(2))[0];
if(queryToSearch) {
  getData(queryToSearch)
}


