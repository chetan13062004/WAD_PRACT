// Simulated weather database (local map)
const weatherData = {
    "mumbai": {
      temperature: "32°C",
      humidity: "70%",
      condition: "Sunny"
    },
    "delhi": {
      temperature: "28°C",
      humidity: "65%",
      condition: "Hazy"
    },
    "pune": {
      temperature: "26°C",
      humidity: "60%",
      condition: "Cloudy"
    },
    "kolkata": {
      temperature: "30°C",
      humidity: "75%",
      condition: "Rainy"
    }
  };
  
  // Function to fetch weather data (mock AJAX)
  function getWeather() {
    const city = document.getElementById("cityInput").value.toLowerCase();
    const resultDiv = document.getElementById("weatherResult");
  
    resultDiv.innerHTML = ""; // Clear old results
  
    setTimeout(() => {
      if (weatherData[city]) {
        const data = weatherData[city];
        resultDiv.innerHTML = `
          <p><strong>Temperature:</strong> ${data.temperature}</p>
          <p><strong>Humidity:</strong> ${data.humidity}</p>
          <p><strong>Condition:</strong> ${data.condition}</p>
        `;
      } else {
        resultDiv.innerHTML = `<p style="color: red;">City not found in local data.</p>`;
      }
    }, 500); // simulate AJAX delay
  }
  