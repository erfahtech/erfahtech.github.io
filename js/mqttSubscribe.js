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

// // main.js
// import mqttClient from "./mqttConnection.js";

// // Function to create a card with the received message
// // function createMessageCard(message) {
// //   const cardDiv = document.createElement("div");
// //   cardDiv.className = "message-card";
// //   cardDiv.innerHTML = `<p>${message}</p>`;
// //   document.getElementById("messagesContainer").appendChild(cardDiv);
// // }

// // Subscribe to a topic
// const topicToSubscribe = "urse/#"; // Change this to your topic
// mqttClient.subscribe(topicToSubscribe);
// console.log(`Berlangganan ke topik ${topicToSubscribe}`);

// // Listen for incoming messages on the subscribed topic
// mqttClient.on("message", (topic, message) => {
//   const receivedMessage = message.toString();
//   console.log(`Received message on topic ${topic}: ${receivedMessage}`);

//   // Display the received message in a card
//   //   createMessageCard(receivedMessage);
// });

// // Handle errors in MQTT connection
// mqttClient.on("error", (error) => {
//   console.error("Kesalahan koneksi MQTT:", error);
// });

// window.mqttClient = mqttClient;
// window.topicToSubscribe = topicToSubscribe;
