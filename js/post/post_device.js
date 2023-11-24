// import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
// import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const loadingElement = document.getElementById("loading");
//   if (loadingElement) {
//     loadingElement.style.display = "none";
//   }
// });

// const postDevices = () => {
//   const nama = document.getElementById("isiName").value;
//   const topic = document.getElementById("isiTopic").value;
//   const loadingElement = document.getElementById("loading");
//   const diabuttonElement = document.getElementById("diabutton");
//   const email = localStorage.getItem("userEmail");

//   diabuttonElement.style.display = "none";
//   loadingElement.style.display = "block";

//   if (nama === "" || topic === "") {
//     Swal.fire({
//       icon: "error",
//       title: "Gagal Menambahkan Device",
//       text: "Please fill in all fields.",
//     });

//     loadingElement.style.display = "none";
//     diabuttonElement.style.display = "flex";
//     return;
//   }

//   const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
//   const datainjson = {
//     name: nama,
//     topic: "urse/" + email + "/" + topic,
//   };

//   postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
//     responseData(result);
//     loadingElement.style.display = "none";
//     diabuttonElement.style.display = "flex";
//   });
// };

// const responseData = (result) => {
//   if (result) {
//     Swal.fire({
//       icon: "success",
//       title: "Tambah Device Berhasil",
//       text: result.message,
//     }).then((result) => {
//       if (result.isConfirmed || result.isDismissed) {
//         window.location.href = "device_control.html";
//       }
//     });
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Tambah Device Gagal",
//       text: result.message,
//     });
//   }
// };

// window.postDevices = postDevices;


const postDevices = () => {
    const nama = document.getElementById("isiName").value;
    let topic = document.getElementById("isiTopic").value;
    const loadingElement = document.getElementById("loading");
    const diabuttonElement = document.getElementById("diabutton");
    const email = localStorage.getItem("userEmail");

    diabuttonElement.style.display = "none";
    loadingElement.style.display = "block";

    if (nama === "" || topic === "") {
        Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan Device",
            text: "Please fill in all fields.",
        });

        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
        return;
    }

    // Validate topic using regex
    const topicRegex = /^[a-z]+$/;
    if (!topicRegex.test(topic)) {
        Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan Device",
            text: "Topic should only contain lowercase letters and no numbers.",
        });

        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
        return;
    }

    // If validation passes, proceed with the API call
    topic = "urse/" + email + "/" + topic;
    const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
    const datainjson = {
        name: nama,
        topic: topic,
    };

    postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
        responseData(result);
        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
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

document.addEventListener("DOMContentLoaded", () => {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
        loadingElement.style.display = "none";
    }
});

window.postDevices = postDevices;
