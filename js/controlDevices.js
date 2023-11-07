// import mqqtt connection
import mqttClient from "./mqttConnection.js";

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

  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch relative inline-flex w-[52px] h-1 mb-6";

  const input = document.createElement("input");
  input.className = "toggle-checkbox";
  input.type = "checkbox";
  input.checked = true;
  input.style.display = "none"; // Sembunyikan checkbox

  toggleSwitch.appendChild(input);

  const statusSpan = document.createElement("span"); // Tambahkan elemen span untuk status
  statusSpan.textContent = "ON"; // Inisialisasi status dengan "ON"
  statusSpan.id = `status-${topic}`; // Atur ID yang sesuai dengan card

  // Tambahkan elemen span status ke cardDiv
  const cardDiv = document.createElement("div");
  cardDiv.className = "flex-shrink max-w-full px-4 w-full sm:w-1/2 mb-6";
  cardDiv.innerHTML = `
    <div class="bg-white dark-bg-surfacedark-200 rounded-lg shadow-lg h-full p-6">
      <div class="flex flex-wrap flex-row items-center">
        <div class="flex-shrink max-w-full w-1/2">
          <h5 class="text-gray-500 mb-1">${topic}</h5>
          <h3 class="text-lg font-bold mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="inline-block h-4 w-4 mr-2 bi bi-lightbulb" viewBox="0 0 16 16">
              <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z" />
            </svg>
            ${name}
          </h3>
          <p class="status text-sm text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              class="inline-block w-4 h-4 bi bi-arrow-down-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z">
              </path>
            </svg>
            <span id="status"></span>
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
  cardDiv.querySelector(".status").appendChild(statusSpan); // Tambahkan statusSpan ke cardDiv
  devicesContainer.appendChild(cardDiv);

  toggleSwitch.addEventListener("click", (event) => {
    const input = event.currentTarget.querySelector("input");
    const cardId = `status-${topic}`; // ID elemen status yang sesuai dengan card
    const statusSpan = document.getElementById(cardId); // Dapatkan elemen status yang sesuai

    input.checked = !input.checked;
    const payload = input.checked ? "1" : "0";

    if (mqttClient && mqttClient.connected) {
      mqttClient.publish(topic, payload);
      console.log(`Mengirim payload ${payload} ke topik ${topic}`);
      statusSpan.textContent = input.checked ? "ON" : "OFF";
      // insertHistory();
    } else {
      console.error("Koneksi MQTT tidak aktif");
    }
  });
}
