
const mapTweetsData = tweetResults => {
    const data = tweetResults.data;
    const users = tweetResults.includes.users;
    
    const results = [];
    
    for(let tw of data ) {
    
        const userData = users.find((u) => u.id == tw.author_id);
    
        const toSave = {
            text: tw.text,
            user: userData.username,
            name: userData.name,
            photo: userData.profile_image_url
        }
        results.push(toSave)
        
    }
    return results
}


module.exports = {mapTweetsData}