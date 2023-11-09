// Mendefinisikan URL broker MQTT yang akan dihubungi
const brokerUrl = "wss://broker.emqx.io:8084/mqtt";

// Membuat koneksi MQTT menggunakan URL broker
const mqttClient = mqtt.connect(brokerUrl);

// Menetapkan event handler ketika koneksi berhasil terhubung
mqttClient.on("connect", () => {
  console.log("Terhubung ke broker MQTT");
  // mqttClient.subscribe("urse/#");
});

// Menetapkan event handler untuk menangani kesalahan koneksi MQTT
mqttClient.on("error", (error) => {
  console.error("Kesalahan koneksi MQTT:", error);
});

// Mengekspor objek klien MQTT untuk digunakan di file lain
export default mqttClient;
