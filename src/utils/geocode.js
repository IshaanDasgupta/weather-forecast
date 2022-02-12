const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiLWFxdWllbS0iLCJhIjoiY2t6OGNrcDkzMHNicTJ4cW04dThnejZoOSJ9.4RvwYJu23rjr5rm7Sl0Jqg';
    request({url,json:true} , (error,response) => {
        if (error){
            callback('No connection');
        }
        else if (!response.body.features[0]){
            callback('No such location found');
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                locationName: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;