const path = require('path')
// key.json needs to be the google service acoount
const fileUrl = path.resolve(process.env.GOOGLE_CLIENT_SERVICE_ACCOUNT_PATH)
const fs = require('fs');

async function analyzeEntitiesOfText(text) {
    // [START language_entities_text]
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

    // Creates a client instance
    const client = new language.LanguageServiceClient({keyFilename: fileUrl});
    // Prepares a document, representing the provided text
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Detects sentiments in the document
    const [result] = await client.analyzeSentiment({document});
    const sentiment = result.documentSentiment;
    // Round results of the analysis
    return {
        magnitude: sentiment.magnitude.toFixed(2),
        score: sentiment.score.toFixed(2)
    }
  }


const getSentiments = async (mappedResults) => {
    const sentimentResults = []

    for(let res of mappedResults) {
        try {
            const sentiments = await analyzeEntitiesOfText(res.text);
            res.sentiments = sentiments;
            sentimentResults.push(res)
        } catch (error) {
            console.log(error)
        }
   
    }
    return sentimentResults
}

module.exports = {getSentiments}


 
