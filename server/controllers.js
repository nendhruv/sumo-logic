var unirest = require('unirest');

exports.findInLocation = function(req, res){
  var minLat = req.query.minlat;
  var maxLat = req.query.maxlat;
  var type = req.query.type;
  console.log(minLat, maxLat, type)
  unirest.get('https://data.sfgov.org/resource/6a9r-agq8.json?$where=latitude between '+minLat+' and '+maxLat+'&facilitytype='+type).end(function(response){
    if(response.statusCode === 200){
      res.json({err: false, data: response.body})
    }
    else{
      res.json({err: true, data: []})
    }
  })
}
