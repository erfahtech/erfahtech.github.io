// import getDevices from "./getfunction-devices.js";

// window.getDevices = getDevices;

import { URLGetDevice, responseData } from "../js/getdevice.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const get = (target_url, responseFunction) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getCookie("token"));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

get(URLGetDevice, responseData);
