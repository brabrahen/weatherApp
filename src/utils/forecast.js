const request = require('request')
const resquest = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=932900026a1ea07a8c7561eba07032c9&query=${longitude},${latitude}&units=m`

    request({ url, json: true }, (error, {body})  => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, { message: `${body.current.weather_descriptions[0]}. Now it's ${body.current.temperature}°C in ${body.location.name}, ${body.location.region} and it feels like ${body.current.feelslike}°C` })
        }
    })

}

module.exports = forecast