const escapeHtml = (str) => {
  return str.toString().replace(/^\s+|\s+$/g,'');
}

const showTodaysWeather = (response) => {
  const obj = JSON.parse(response);

  const city = obj.name;
  document.getElementById('selectedCity').textContent = `現在の${escapeHtml(city)}の天気は...`;

  const weather = obj.weather[0].description;
  document.getElementById('weather').innerHTML = `<span>${escapeHtml(weather)}</span>`;

  const temperature = obj.main.temp;
  document.getElementById('temperature').innerHTML = `<span>${escapeHtml(temperature)}℃</span>`;

  const weatherIcon = obj.weather[0].icon;
  document.getElementById('weather-icon').innerHTML = `<img src='http://openweathermap.org/img/w/${escapeHtml(weatherIcon)}.png' >`;
}

document.addEventListener('DOMContentLoaded', () => {
  const targetCity = document.getElementById('city');
  const appId = '4b5774e9f3d2a07b84f0f2f88e486224';

  const getWeatherAsync = () => {
    const cityName = targetCity.value;
    const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?APPID=' + appId + '&lang=ja&units=metric&q=' + cityName + ',jp;';

    const result = document.getElementById('result');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);
    xhr.send();

    xhr.addEventListener('loadstart', () => {
      result.textContent = '通信中...';
    }, false);

    xhr.addEventListener('load', () => {
      showTodaysWeather(xhr.responseText);
    }, false);

    xhr.addEventListener('error', () => {
      result.textContent = 'サーバーエラーが発生しました。';
    }, false);
  }
    
  getWeatherAsync();
  targetCity.addEventListener('change', getWeatherAsync);

}, false);
