// mqttconnection.js
import mqttClient from "./mqttConnection.js";

// Function to update the temperature on the card
function updateTemperature(temperature) {
  const temperatureElement = document.getElementById("temperature");
  if (temperatureElement) {
    temperatureElement.textContent = temperature ? `Indoor Temperature: ${temperature}°C` : "Indoor Temperature: --";
  }
}

// Function to update the humidity on the card
function updateHumidity(humidity) {
  const humidityElement = document.getElementById("humidity");
  if (humidityElement) {
    humidityElement.textContent = humidity ? `Indoor Humidity: ${humidity}%` : "Indoor Humidity: --";
  }
}

// Subscribe to topics
mqttClient.subscribe("urse/suhu");
mqttClient.subscribe("urse/humidity");
console.log("Berlangganan ke topik urse/suhu dan urse/humidity");

// Listen for incoming messages on the subscribed topics
mqttClient.on("message", (topic, message) => {
  const receivedMessage = message.toString();
  console.log(`Received message on topic ${topic}: ${receivedMessage}`);

  // Update card based on the received topic and message
  if (topic === "urse/suhu") {
    updateTemperature(receivedMessage);
  } else if (topic === "urse/humidity") {
    updateHumidity(receivedMessage);
  }
});

// Handle errors in MQTT connection
mqttClient.on("error", (error) => {
  console.error("Kesalahan koneksi MQTT:", error);
  // Update card with placeholders when there is an error
  updateTemperature(null);
  updateHumidity(null);
});
