import mqtt from "mqtt";

const MQTT_BROKER_URL = "ws://broker.emqx.io:8083/mqtt";
const client = mqtt.connect(MQTT_BROKER_URL);

// Code for MQTT connections and message handling
client.on("connect", function () {
  console.log("Tersambung ke broker!");
  // client.subscribe("koalawan/iot/temperature");
  // client.subscribe("koalawan/iot/humidity");
});

// Fungsi untuk mengirim pesan MQTT
function sendMessage(topic, payload) {
  client.publish(topic, payload);
}

// Fungsi untuk menginisialisasi toggle switch
function initializeToggleSwitch(cardElement) {
  const switchElement = cardElement.querySelector("#switch");
  const topic = cardElement.querySelector(".text-gray-500").textContent; // Mengambil topik dari elemen card
  switchElement.addEventListener("change", (event) => {
    const payload = event.target.checked ? "1" : "0";
    sendMessage(topic, payload);
  });
}

export { initializeToggleSwitch };
