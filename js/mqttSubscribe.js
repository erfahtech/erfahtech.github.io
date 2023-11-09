// main.js
import mqttClient from "./mqttConnection.js";

// Function to create a card with the received message
function createMessageCard(message) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "message-card";
  cardDiv.innerHTML = `<p>${message}</p>`;
  document.getElementById("messagesContainer").appendChild(cardDiv);
}

// Subscribe to a topic
const topicToSubscribe = "your/topic"; // Replace with the actual topic
mqttClient.subscribe(topicToSubscribe);

// Listen for incoming messages on the subscribed topic
mqttClient.on("message", (topic, message) => {
  const receivedMessage = message.toString();
  console.log(`Received message on topic ${topic}: ${receivedMessage}`);

  // Display the received message in a card
  createMessageCard(receivedMessage);
});

// Handle errors in MQTT connection
mqttClient.on("error", (error) => {
  console.error("Kesalahan koneksi MQTT:", error);
});
