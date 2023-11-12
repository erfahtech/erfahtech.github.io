// Mendefinisikan URL broker MQTT yang akan dihubungi
const brokerUrl = "wss://broker.emqx.io:8084/mqtt";
// const clientId = "urse-user";
// const password = "urse-secret";

// Membuat koneksi MQTT menggunakan URL broker dan informasi klien
const mqttClient = mqtt.connect(brokerUrl, {
  clientId: clientId,
  username: clientId,
  password: password,
});

// Menetapkan event handler ketika koneksi berhasil terhubung
mqttClient.on("connect", () => {
  console.log("Terhubung ke broker MQTT");
  // mqttClient.subscribe("urse/#");
  // mqttClient.subscribe("urse/suhu");
  // mqttClient.subscribe("urse/humidity");
  // console.log("Berlangganan ke topik urse/suhu dan urse/humidity");
});

// Menetapkan event handler untuk menangani kesalahan koneksi MQTT
mqttClient.on("error", (error) => {
  console.error("Kesalahan koneksi MQTT:", error);
});

// Mengekspor objek klien MQTT untuk digunakan di file lain
export default mqttClient;
