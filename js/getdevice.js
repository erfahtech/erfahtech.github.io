// mqtt.js
import * as mqtt from "../node_modules/mqtt/build/mqtt"; // Impor library MQTT

let mqttClient = null;

function connectToMqttBroker() {
  const brokerUrl = "wss://broker.emqx.io:8084/mqtt";
  mqttClient = mqtt.connect(brokerUrl);

  mqttClient.on("connect", () => {
    console.log("Terhubung ke broker MQTT");
    console.log(mqttClient.subscribe("test/topic"));
  });

  mqttClient.on("error", (error) => {
    console.error("Kesalahan koneksi MQTT:", error);
  });
}

// getdevice.js
export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

// Ini adalah elemen container di mana Anda akan menambahkan elemen toggle switch
const devicesContainer = document.getElementById("devices");

export function responseData(results) {
  console.log(results);
  results.data.forEach(isiCard);
}

export function isiCard(value) {
  const topic = value.topic;
  const name = value.name;

  // Buat elemen toggle switch
  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch relative inline-flex w-[52px] h-1 mb-6";

  const input = document.createElement("input");
  input.className = "toggle-checkbox";
  input.type = "checkbox";
  input.checked = true;
  input.setAttribute("data-topic", topic);

  const label = document.createElement("label");
  label.className = "toggle-icon relative block w-12 h-8 rounded-full transition-color duration-150 ease-out";

  toggleSwitch.appendChild(input);
  toggleSwitch.appendChild(label);

  // Tambahkan elemen toggle switch ke container
  const cardDiv = document.createElement("div");
  cardDiv.className = "flex-shrink max-w-full px-4 w-full sm:w-1/2 mb-6";
  cardDiv.innerHTML = `
    <div class="bg-white dark-bg-surfacedark-200 rounded-lg shadow-lg h-full p-6">
      <div class="flex flex-wrap flex-row items-center">
        <div class="flex-shrink max-w-full w-1/2">
          <h5 class="text-gray-500 mb-1">${topic}</h5>
          <h3 class="text-lg font-bold mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="inline-block h-4 w-4 mr-2 bi bi-thermometer" viewBox="0 0 16 16">
              <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z" />
            </svg>
            ${name}
          </h3>
          <p class="text-sm text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              class="inline-block w-4 h-4 bi bi-arrow-up-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"></path>
            </svg>
            On
          </p>
          <br />
        </div>
        <div class="flex-shrink max-w-full w-1/2">
          <canvas class="max-w-100" id="LineAreaSm" style="display: block; box-sizing: border-box; height: 66px; width: 132px" width="528"
            height="264"></canvas>
        </div>
      </div>
    </div>
  `;

  cardDiv.querySelector(".flex-shrink").appendChild(toggleSwitch);
  devicesContainer.appendChild(cardDiv);

  input.addEventListener("change", (event) => {
    const payload = event.target.checked ? "1" : "0";

    if (mqttClient && mqttClient.connected) {
      mqttClient.publish(topic, payload);
      console.log(`Mengirim payload ${payload} ke topik ${topic}`);
    } else {
      console.error("Koneksi MQTT tidak aktif");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  connectToMqttBroker();
});
