// mqttconnection.js
import mqttClient from "./mqttConnection.js";
import { insertHistory } from "./logSubcribe.js";
let i = 1;
// Function to update the temperature on the card
function updateTemperature(temperature) {
  const temperatureElement = document.getElementById("temperature-sensor");
  if (temperatureElement) {
    temperatureElement.textContent = temperature ? ` ${temperature}°C` : "--°C";
    // console.log("Update Suhu:", temperature);
  }
}

// Function to update the humidity on the card
function updateHumidity(humidity) {
  const humidityElement = document.getElementById("humidity-sensor");
  if (humidityElement) {
    humidityElement.textContent = humidity ? ` ${humidity}%` : "--%";
    // console.log("Update Humidity:", humidity);
  }
}

// Subscribe to topics
mqttClient.on("connect", () => {
  const email = localStorage.getItem("userEmail");
  console.log("Subcribing...");
  mqttClient.subscribe("urse/" + email + "/monitoring");
  console.log("Berlangganan ke topik urse/" + email + "/monitoring");
});

// Panggil fungsi untuk dijalankan
mqttClient.on("message", (topic, message) => {
  const email = localStorage.getItem("userEmail");
  const receivedMessage = message.toString();
  console.log(`Received message on topic ${topic}: ${receivedMessage} ke ${i++}`);

  // Update card based on the received topic and message
  if (topic === "urse/" + email + "/monitoring") {
    let data = receivedMessage.split("-");
    updateTemperature(data[0]);
    updateHumidity(data[1]);
    runFunction(topic, data[0], data[1]);
  }
});

// Handle errors in MQTT connection
mqttClient.on("error", (error) => {
  console.error("Kesalahan koneksi MQTT:", error);
  // Update card with placeholders when there is an error
  updateTemperature(null);
  updateHumidity(null);
});

let isFunctionActive = true;

function runFunction(topic, suhu, humidity) {
  if (isFunctionActive) {
    // Lakukan sesuatu di sini
    insertHistory(topic, suhu, humidity);

    // Menonaktifkan fungsi selama 4 menit
    isFunctionActive = false;
    setTimeout(() => {
      isFunctionActive = true;
      console.log("Fungsi dapat dijalankan kembali setelah 4 menit.");
    }, 10 * 1000); // Waktu dalam milidetik (4 menit)
  } else {
    console.log("Fungsi sedang dinonaktifkan.");
  }
}

// window.mqttClient = mqttClient;
// window.updateTemperature = updateTemperature;
// window.updateHumidity = updateHumidity;
