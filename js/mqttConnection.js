const brokerUrl = "wss://broker.emqx.io:8084/mqtt";
const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on("connect", () => {
  console.log("Terhubung ke broker MQTT");
});

mqttClient.on("error", (error) => {
  console.error("Kesalahan koneksi MQTT:", error);
});

export default mqttClient;
