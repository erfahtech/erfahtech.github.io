// mqttconnection.js
import mqttClient from "./mqttConnection.js";
import { insertHistory } from "./logSubcribe.js";

let suhu = false;
let humidity = false;

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
  mqttClient.subscribe("urse/" + email + "/humidity");
  console.log("Berlangganan ke topik urse/" + email + "/suhu dan urse/" + email + "/humidity");
});

// Listen for incoming messages on the subscribed topics
mqttClient.on("message", (topic, message) => {
  const email = localStorage.getItem("userEmail");
  const receivedMessage = message.toString();
  console.log(`Received message on topic ${topic}: ${receivedMessage}`);

  // Update card based on the received topic and message
  if (topic === "urse/" + email + "/suhu") {
    suhu = receivedMessage;
    updateTemperature(receivedMessage);
  } else if (topic === "urse/" + email + "/humidity") {
    humidity = receivedMessage;
    updateHumidity(receivedMessage);
  }

  if (humidity && suhu) {
    // suhuBefore = suhu;
    // humidityBefore = humidity;
    insertHistory(topic, suhu, humidity);
    suhu = false;
    humidity = false;
  }

  // if (topic === "urse/" + email + "/suhu") {
  //   updateTemperature(receivedMessage);
  //   insertHistory(topic, receivedMessage, null);
  // } else if (topic === "urse/" + email + "/humidity") {
  //   updateHumidity(receivedMessage);
  //   insertHistory(topic, null, receivedMessage);
  // }
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
