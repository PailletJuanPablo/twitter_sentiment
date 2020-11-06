# Twitter sentiment analyzer

Simple node script to get a list of tweets based on a query, and generate a PDF with an analysis of the sentiment.

## Techs Used
- Google Cloud Natural Language
- Twitter API v2
- Axios
- EJS
- Html-pdf
- DotEnv

## How to use
1) Install libraries running
`npm install`

2) Copy the file .env.example to .env and set the envinroment variables to use the system. 
- TWITTER_TOKEN: Needs to be the Authorization Token from Twitter API 
- GOOGLE_CLIENT_SERVICE_ACCOUNT_PATH: Path to the google client json credentials

3) To run the script, call the method getData() in index.js with the query you want to make. Eg: getData('#hi')

4) The result will be a file called generated.pdf in your root folder

