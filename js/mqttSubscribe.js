// mqttconnection.js
import mqttClient from "./mqttConnection.js";

// Function to update the temperature on the card
function updateTemperature(temperature) {
  const temperatureElement = document.getElementById("temperature");
  if (temperatureElement) {
    temperatureElement.textContent = temperature ? ` ${temperature}°C` : "--°C";
  }
}

// Function to update the humidity on the card
function updateHumidity(humidity) {
  const humidityElement = document.getElementById("humidity");
  if (humidityElement) {
    humidityElement.textContent = humidity ? ` ${humidity}%` : "--%";
  }
}

// Subscribe to topics
mqttClient.on("connect", () => {
  const email = localStorage.getItem("userEmail");
  console.log("Subcribing...");

  // Subscribe to topics when connected
  mqttClient.subscribe("urse/" + email + "/suhu");
  mqttClient.subscribe("urse" + email + "/humidity");
  console.log("Berlangganan ke topik urse/" + email + "/suhu dan urse/" + email + "/humidity");
});

// Listen for incoming messages on the subscribed topics
mqttClient.on("message", (topic, message) => {
  const email = localStorage.getItem("userEmail");
  const receivedMessage = message.toString();
  console.log(`Received message on topic ${topic}: ${receivedMessage}`);

  // Update card based on the received topic and message
  if (topic === "urse/" + email + "/suhu") {
    updateTemperature(receivedMessage);
  } else if (topic === "urse" + email + "/humidity") {
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

// window.mqttClient = mqttClient;
// window.updateTemperature = updateTemperature;
// window.updateHumidity = updateHumidity;
