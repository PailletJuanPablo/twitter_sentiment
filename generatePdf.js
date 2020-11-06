const ejs = require('ejs');

var pdf = require('html-pdf');

module.exports = (results) => {

  let normal = 0;
  let possitive = 0;
  let negative = 0;
  let total = 0;
  
  // Calculate totals and percentage to show more data
  for(let tweet of results) {
    const sentiment = tweet.sentiments.score;
    if(sentiment < 0) {
      negative = negative  + 1
    } else
    if(sentiment > 0) {
      possitive = possitive + 1
    }
    if(sentiment == 0) {
      normal = normal +1
    }
    total = Number(total) + Number(sentiment)
  }
  // Generate object structure to show on ejs template
  const structure = {
    normal: normal * 100 / results.length,
    possitive: possitive * 100 / results.length,
    negative: negative * 100 / results.length,
    general: total
  }
  ejs.renderFile('template.ejs', { tweets: results, resume: structure }, function(err, str){
      pdf.create(str).toFile('generated.pdf', function(err, res) {
          if (err) return console.log(err);
          console.log(res); 
        });
        
  });
}
