var unirest = require('unirest');

exports.initialize = function(req, res){
  console.log('hello')
  unirest.get('https://data.sfgov.org/resource/6a9r-agq8.json').end(function(response){
    res.send(response)
  })
}
