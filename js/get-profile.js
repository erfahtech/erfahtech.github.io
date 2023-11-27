// Import URL dan fungsi respons yang sesuai
import { URLGetProfile, responseProfileData } from "./getprofile.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

document.addEventListener("DOMContentLoaded", function () {
  const getProfile = (target_url, responseFunction) => {
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

  // Panggil fungsi getProfile dengan URLGetProfile dan responseProfileData
  getProfile(URLGetProfile, responseProfileData);
});
