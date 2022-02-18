const request = require("request")

const forecast = (lati,longi,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4e4ad20818704718ef17f58cda0db238&query=' + lati +',' + longi;
    request({url,json:true} , (error,response) => {
        if (error){
            callback('No connection');
        }
        else if (response.body.error){
            callback('No forecast found')
        }
        else{
            callback(undefined,{
                time : response.body.current.observation_time,
                feelsLike : response.body.current.feelslike,
                temp : response.body.current.temperature,
                desc : response.body.current.weather_descriptions[0],
                humidity : response.body.current.humidity,
                weatherIcon : response.body.current.weather_icons[0]
            })
        }
    })

}

module.exports = forecast;