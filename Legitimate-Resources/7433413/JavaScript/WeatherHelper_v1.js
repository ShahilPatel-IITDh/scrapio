function setZip (newZip) {
    if(!checkZip(newZip)) newZip = '10001';
    localStorage.removeItem('weather');
    localStorage.setItem('zip', newZip);
    return newZip;
}
function getZip() {
    return localStorage.getItem('zip') || '10001';
}
function submitZip(value, callback = () => {}) {
    let newZip = setZip(value);
    callback(newZip);
    return false;
}
function checkZip(zip) {
    let regexCheck = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?appid=beac7c40c6ebee3f7f54a7a3544c9986&zip=${zip}&type=accurate&units=imperial`, false);
    request.send(null);
    return regexCheck && request.status !== 404;
}

async function apiCall(endpoint) {
    return await fetch(`https://api.openweathermap.org/data/2.5${endpoint}?appid=beac7c40c6ebee3f7f54a7a3544c9986&zip=${getZip()}&type=accurate&units=imperial`)
        .then(response => response.json());
}

async function buildWeather(includeCurrent = true, includeHourly = false, includeDaily = false) {
    let currentData = {};
    if (includeCurrent) {
        const currentWeather = await apiCall("/weather");
        currentData = {
            Main: currentWeather["weather"][0]["main"],
            Description: currentWeather["weather"][0]["description"],
            Temperature: {
                Temp: currentWeather["main"]["temp"],
                Max: currentWeather["main"]["temp_max"],
                Min: currentWeather["main"]["temp_min"],
                FeelsLike: currentWeather["main"]["feels_like"]
            },
            Location: {
                City: currentWeather["name"],
                Country: currentWeather["sys"]["country"],
                Coordinates: {
                    Longitude: currentWeather["coord"]["lon"],
                    Latitude: currentWeather["coord"]["lat"]
                }
            },
            Time: new Date(currentWeather["dt"] * 1000),
            Sunrise: new Date(currentWeather["sys"]["sunrise"] * 1000),
            Sunset: new Date(currentWeather["sys"]["sunset"] * 1000),
            Icon: currentWeather["weather"][0]["icon"],
            Wind: {
                Speed: currentWeather["wind"]["speed"],
                Direction: currentWeather["wind"]["deg"]
            },
            Pressure: currentWeather["main"]["pressure"],
            Humidity: currentWeather["main"]["humidity"],
            CloudCover: currentWeather["clouds"]["all"]
        }
    }

    const hourlyData = [];
    if (includeHourly) {
        const hourlyWeather = await apiCall("/forecast");
        for (const hourOfWeather of hourlyWeather["list"]) {
            const wd = {
                Main: hourOfWeather["weather"][0]["main"],
                Description: hourOfWeather["weather"][0]["description"],
                Temperature: {
                    Temp: hourOfWeather["main"]["temp"],
                    Max: hourOfWeather["main"]["temp_max"],
                    Min: hourOfWeather["main"]["temp_min"],
                    FeelsLike: hourOfWeather["main"]["feels_like"]
                },
                Location:{
                    City: hourlyWeather["city"]["name"],
                    Country: hourlyWeather["city"]["country"],
                    Coordinates:{
                        Longitude: hourlyWeather["city"]["coord"]["lon"],
                        Latitude: hourlyWeather["city"]["coord"]["lat"]
                    }
                },
                Time: new Date(hourOfWeather["dt"] * 1000),
                Sunrise: new Date(hourlyWeather["city"]["sunrise"] * 1000),
                Sunset: new Date(hourlyWeather["city"]["sunset"] * 1000),
                Icon: hourOfWeather["weather"][0]["icon"],
                Wind: {
                    Speed: hourOfWeather["wind"]["speed"],
                    Direction: hourOfWeather["wind"]["deg"]
                },
                Pressure: hourOfWeather["main"]["pressure"],
                Humidity: hourOfWeather["main"]["humidity"],
                CloudCover: hourOfWeather["clouds"]["all"],
            };
            hourlyData.push(wd);
        }
    }

    const dailyData = [];
    if (includeDaily) {
        const dailyWeather = await apiCall("/forecast/daily");

        for (const dayOfWeather of dailyWeather["list"]) {
            const wd = {
                Main: dayOfWeather["weather"][0]["main"],
                Description: dayOfWeather["weather"][0]["description"],
                Temperature: {
                    Temp: dayOfWeather["temp"]["day"],
                    Max: dayOfWeather["temp"]["max"],
                    Min: dayOfWeather["temp"]["min"],
                    FeelsLike: dayOfWeather["feels_like"]["day"]
                },
                Location: {
                    City: dailyWeather["city"]["name"],
                    Country: dailyWeather["city"]["country"],
                    Coordinates: {
                        Longitude: dailyWeather["city"]["coord"]["lon"],
                        Latitude: dailyWeather["city"]["coord"]["lat"]
                    }
                },
                Time: new Date(dayOfWeather["dt"] * 1000),
                Sunrise: new Date(dayOfWeather["sunrise"] * 1000),
                Sunset: new Date(dayOfWeather["sunset"] * 1000),
                Icon: dayOfWeather["weather"][0]["icon"],
                Wind: {
                    Speed: dayOfWeather["speed"],
                    Direction: dayOfWeather["deg"],
                },
                Pressure: dayOfWeather["pressure"],
                Humidity: dayOfWeather["humidity"],
                CloudCover: dayOfWeather["clouds"],
            };
            dailyData.push(wd);
        }
    }
    
    return {
        Current: currentData,
        Hourly: hourlyData,
        Daily: dailyData
    };
}

function GetWeather(includeCurrent = true, includeHourly = false, includeDaily = false) {
    return new Promise(resolve => {
        if (localStorage.getItem('weather')) {
            const stored = JSON.parse(localStorage.getItem('weather'));
            const lastUpdated = new Date(stored.date);

            if ((new Date() - lastUpdated) < ((60*1000)*60)*4) {
                resolve(stored.data);
                return true;
            }
        }

        buildWeather(includeCurrent, includeHourly, includeDaily).then(data => {
            localStorage.setItem('weather', JSON.stringify({ date:new Date(), data }));
            resolve(data);
        });
    });
}
