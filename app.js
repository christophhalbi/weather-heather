const storage = require('electron-json-storage')
const axios = require('axios')

storage.get('settings', (error, data) => {
    if (error) throw error

    openSettings()

    if (data.apiKey) {
        getWeather(data.apiKey)
    }
})

function openSettings() {

    storage.get('settings', (error, data) => {
        if (error) throw error

        document.getElementById('apiKey').value = data.apiKey || ''

        document.getElementById('saveSettings').addEventListener('click', () => {

            const apiKey = document.getElementById('apiKey').value

            storage.set('settings', { 'apiKey': apiKey }, (error) => {
                if (error) throw error

                if (apiKey)
                    getWeather(apiKey)
            })
        })
    })
}

function getWeather(apiKey) {

    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Linz,at&units=metric&lang=de&appid=' + apiKey

    axios.get(API_URL)
        .then((response) => {

            document.getElementById('temperature').innerHTML = response.data.main.temp
            document.getElementById('temperatureMin').innerHTML = response.data.main.temp_min
            document.getElementById('temperatureMax').innerHTML = response.data.main.temp_max
            document.getElementById('weather').innerHTML = response.data.weather[0].description
        })
        .catch((error) => {
            document.getElementById('apiStatus').innerHTML = 'Fehler bei API'
        })
}
