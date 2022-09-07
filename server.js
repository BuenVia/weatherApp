const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.post('/', (req, res) => {
const key = "1b4285cacb852ff76f4aa122cc7bc8d1"
const location = req.body.cityName
const unit = "metric"
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=${unit}`

https.get(url, function (response){
    response.on("data", (data) => {
        const weatherData = JSON.parse(data)
        console.log(weatherData)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const country = weatherData.sys.country
        res.write(`<h1>The weather is currently ${weatherDescription}</h1>`)
        res.write(`<p>The temperature in ${location}, ${country}, is ${temp}&#8451</p>`)
        res.write(`<img src=http://openweathermap.org/img/wn/${icon}@2x.png>`)
        res.send()
    })
})
})

app.listen(3000, () => {
    console.log('App running on port 3000');
})