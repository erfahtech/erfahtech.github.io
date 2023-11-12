// Define MQTT broker URL and client ID
const brokerUrl = "wss://broker.emqx.io:8084/mqtt";
const clientId = "urse-user";

let mqttClient = null;

// Function to create or return the existing MQTT client
const getMqttClient = () => {
  if (!mqttClient || !mqttClient.connected) {
    // Create MQTT client if it doesn't exist or if it's not connected
    mqttClient = mqtt.connect(brokerUrl, {
      clientId: clientId,
      // username: clientId, // Uncomment if your broker requires authentication
      // password: password, // Uncomment and provide the password if required
    });

    // Set up event handler for successful connection
    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      // Uncomment and adjust if you need to subscribe to specific topics
      // mqttClient.subscribe("urse/#");
      // mqttClient.subscribe("urse/suhu");
      // mqttClient.subscribe("urse/humidity");
    });

    // Set up event handler for connection errors
    mqttClient.on("error", (error) => {
      console.error("MQTT connection error:", error);
    });
  }

  return mqttClient;
};

// Immediately establish the MQTT connection when the script is loaded
getMqttClient();

// Export the getMqttClient function
export default getMqttClient;
