import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const insertHistory = (topic, suhu, humidity) => {
  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
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
    Swal.fire({
      icon: "success",
      title: "Tambah Device Berhasil",
      text: result.message,
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "device_control.html";
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Tambah Device Gagal",
      text: result.message,
    });
  }
};

export { insertHistory };
