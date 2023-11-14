import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const insertHistory = (topic, suhu, humidity) => {
  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-inserthistory";
  const datainjson = {
    name: "monitoring",
    topic: topic,
    payload: "humidity: " + humidity + "," + "suhu: " + suhu,
  };

  postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
    responseData(result);
  });
};

const responseData = (result) => {
  if (result) {
    console.log("Tambah Device Berhasil:", result.message);
    // Redirect to device_control.html if needed
    // window.location.href = "device_control.html";
  } else {
    console.error("Tambah Device Gagal:", result.message);
  }
};

export { insertHistory };
