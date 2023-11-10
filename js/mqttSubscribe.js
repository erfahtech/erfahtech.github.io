// mqttconnection.js
import mqttClient from "./mqttConnection.js";

// Function to update the temperature on the card
function updateTemperature(temperature) {
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.textContent = `Indoor Temperature: ${temperature}°C`;
}

// Function to update the humidity on the card
function updateHumidity(humidity) {
  const humidityElement = document.getElementById("humidity");
  humidityElement.textContent = `Indoor Humidity: ${humidity}%`;
}

// Subscribe to topics
const temperatureTopic = "urse/suhu";
const humidityTopic = "urse/humidity";

mqttClient.subscribe(temperatureTopic);
mqttClient.subscribe(humidityTopic);
console.log(`Berlangganan ke topik ${temperatureTopic} dan ${humidityTopic}`);

// Listen for incoming messages on the subscribed topics
mqttClient.on("message", (topic, message) => {
  const receivedMessage = message.toString();
  console.log(`Received message on topic ${topic}: ${receivedMessage}`);

  // Update card based on the received topic and message
  if (topic === temperatureTopic) {
    updateTemperature(receivedMessage);
  } else if (topic === humidityTopic) {
    updateHumidity(receivedMessage);
  }
});

// Handle errors in MQTT connection
mqttClient.on("error", (error) => {
  console.error("Kesalahan koneksi MQTT:", error);
});
