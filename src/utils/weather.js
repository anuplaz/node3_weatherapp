const request = require('request')

const weather = (latitude, longitude,callback) => {
    const access_key = '59320dbcb2f085c88c8fb284aea04428'
    const units = 'm'
    const weatherUrl = 'http://api.weatherstack.com/current?access_key='+access_key+'&query='+latitude+','+longitude+'&units='+units
    request({url:weatherUrl, json:true}, (error, response) => {
        if(error)
            callback('Unable to connect to weather service.', undefined)
        else if(response.body.error) 
            callback('Unable to find location. Please enter a valid one.', undefined)
        else{
            callback(undefined, 'Temperatures is '+ response.body.current.temperature +' degrees out, but feels like '+
                response.body.current.feelslike+ ' degrees. Weather is '+
                response.body.current.weather_descriptions+'.')
        }
    })
}
module.exports = weather