const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fa852b51b737a8d2db21cd4465e0c9f3&query='+latitude+','+longitude

    request({url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect with weather services!!', undefined)
        }
        else if( response.body.error) {
            callback(undefined, 'Unable to forecast at given location...try some other location!')
        }
        else{
            callback(undefined, {
                temp: response.body.current.temperature,
                prob_of_rain: response.body.current.feelslike,
                weather : response.body.current.weather_descriptions[0]
            })
        }
    })

}

module.exports = forecast 
