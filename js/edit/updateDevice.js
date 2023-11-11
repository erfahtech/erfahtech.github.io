import { getValue } from "https://jscroot.github.io/element/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { urlPUT, AmbilResponse } from "./urlPutProfileMhs.js";


const putData = (target_url, datajson, responseFunction) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", getCookie("Authorization"));

  const raw = JSON.stringify(datajson);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.json())
    .then((result) => responseFunction(result))
    .catch((error) => console.log("error", error));
};

const pushData = () => {
  const namaDeviceValue = getValue("name");
  const topicDeviceValue = getValue("topik");

  // Create the updated data object
  const data = {
    name: namaDeviceValue,
    topic: topicDeviceValue,
  };
  putData(urlPUT, data, AmbilResponse);
};

const updateDevice = document.getElementById("updateDevice");

updateDevice.addEventListener("click", () => {
  pushData(); // Call pushData function when the button is clicked
});