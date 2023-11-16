// const  updateClock = () => {
//   var currentTime = new Date();
//   var hours = currentTime.getHours();
//   var minutes = currentTime.getMinutes();
//   var seconds = currentTime.getSeconds();

//   var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   var day = dayNames[currentTime.getDay()];

//   var date = currentTime.getDate();
//   var month = currentTime.getMonth() + 1; // January is 0!
//   var year = currentTime.getFullYear();

//   // Pad single digit minutes and seconds with a leading zero
//   minutes = (minutes < 10 ? "0" : "") + minutes;
//   seconds = (seconds < 10 ? "0" : "") + seconds;

//   // Set the content of the elements with the current time and date
//   document.getElementById("current-time").innerText = hours + ":" + minutes + " " + (hours >= 12 ? "PM" : "AM");
//   document.getElementById("current-day").innerText = day;
//   document.getElementById("current-date").innerText = month + "/" + date + "/" + year;

//   // Update the clock every second
//   setTimeout(updateClock, 1000);
// }

// // Initial call to update the clock
// updateClock();

// const apiKey = 'c96a2bfbf2f7991983dbe8a1bc0df62d';
// const updateWeather = (latitude, longitude) => {
//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       // Update the HTML elements with real-time data
//       document.getElementById('location').textContent = data.name;
//       document.getElementById('temperature').textContent = `${Math.round(data.main.temp - 273.15)}°C`;
//       document.getElementById('weather-description').textContent = data.weather[0].description;

//       // Update the weather icon based on the weather condition code
//       const iconElement = document.querySelector('.weather-icon');
//       const weatherCode = data.weather[0].icon;
//       const weatherIconClass = getWeatherIconClass(weatherCode);
//       iconElement.className = `weather-icon material-symbols-outlined !text-6xl text-primary-600 dark:text-primary-200 ${weatherIconClass}`;

//       // Update other weather information accordingly
//       document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

//       // Check if wind property exists in the response
//       if (data.wind && data.wind.speed !== undefined) {
//         document.getElementById('wind-speed').textContent = `Wind: ${data.wind.speed} km/h`;
//       } else {
//         document.getElementById('wind-speed').textContent = 'Wind information not available';
//       }

//       // Call the function again after a certain interval (e.g., 5 minutes)
//       setTimeout(() => getLocationAndWeather(), 300000); // 300,000 milliseconds = 5 minutes
//     })
//     .catch(error => {
//       console.error('Error fetching weather data:', error);
//       document.getElementById('wind-speed').textContent = 'Error fetching weather data';
//     });
// }

// const getWeatherIconClass = (weatherCode) => {
//   // Map OpenWeatherMap icon codes to Weather Icons classes
//   switch (weatherCode) {
//     case '01d':
//       return 'wi-day-sunny';
//     case '01n':
//       return 'wi-night-clear';
//     case '02d':
//       return 'wi-day-cloudy';
//     case '02n':
//       return 'wi-night-alt-cloudy';
//     // Add more cases for other weather conditions
//     default:
//       return 'wi-day-sunny'; // Default to a sunny icon if code not found
//   }
// }

// const getLocationAndWeather = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         updateWeather(latitude, longitude);
//       },
//       error => {
//         console.error('Error getting location:', error);
//         document.getElementById('wind-speed').textContent = 'Error getting location';
//       }
//     );
//   } else {
//     console.error('Geolocation is not supported by this browser.');
//     document.getElementById('wind-speed').textContent = 'Geolocation not supported';
//   }
// }
// // Initial call to start the process
// getLocationAndWeather();

// window.getLocationAndWeather = getLocationAndWeather;
// window.updateClock = updateClock;


const updateClock = () => {
  const currentTime = new Date();
  let { hours, minutes, seconds } = currentTime;

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = dayNames[currentTime.getDay()];

  const date = currentTime.getDate();
  const month = currentTime.getMonth() + 1; // January is 0!
  const year = currentTime.getFullYear();

  // Pad single digit minutes and seconds with a leading zero
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  // Set the content of the elements with the current time and date
  document.getElementById("current-time").innerText = `${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
  document.getElementById("current-day").innerText = day;
  document.getElementById("current-date").innerText = `${month}/${date}/${year}`;

  // Update the clock every second
  setTimeout(updateClock, 1000);
};

// Initial call to update the clock
updateClock();

const apiKey = 'c96a2bfbf2f7991983dbe8a1bc0df62d';

const updateWeather = async (latitude, longitude) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Update the HTML elements with real-time data
    document.getElementById('location').textContent = data.name;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    document.getElementById('weather-description').textContent = data.weather[0].description;

    // Update the weather icon based on the weather condition code
    const iconElement = document.querySelector('.weather-icon');
    const weatherCode = data.weather[0].icon;
    const weatherIconClass = getWeatherIconClass(weatherCode);
    iconElement.className = `weather-icon material-symbols-outlined !text-6xl text-primary-600 dark:text-primary-200 ${weatherIconClass}`;

    // Update other weather information accordingly
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

    // Check if wind property exists in the response
    if (data.wind && data.wind.speed !== undefined) {
      document.getElementById('wind-speed').textContent = `Wind: ${data.wind.speed} km/h`;
    } else {
      document.getElementById('wind-speed').textContent = 'Wind information not available';
    }

    // Call the function again after a certain interval (e.g., 5 minutes)
    setTimeout(getLocationAndWeather, 300000); // 300,000 milliseconds = 5 minutes
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('wind-speed').textContent = 'Error fetching weather data';
  }
};

const getWeatherIconClass = (weatherCode) => {
  // Map OpenWeatherMap icon codes to Weather Icons classes
  switch (weatherCode) {
    case '01d':
      return 'wi-day-sunny';
    case '01n':
      return 'wi-night-clear';
    case '02d':
      return 'wi-day-cloudy';
    case '02n':
      return 'wi-night-alt-cloudy';
    // Add more cases for other weather conditions
    default:
      return 'wi-day-sunny'; // Default to a sunny icon if code not found
  }
};

const getLocationAndWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        updateWeather(latitude, longitude);
      },
      error => {
        console.error('Error getting location:', error);
        document.getElementById('wind-speed').textContent = 'Error getting location';
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    document.getElementById('wind-speed').textContent = 'Geolocation not supported';
  }
};

// Initial call to start the process
getLocationAndWeather();

window.getLocationAndWeather = getLocationAndWeather;
window.updateClock = updateClock;
