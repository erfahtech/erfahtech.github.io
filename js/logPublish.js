import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const logPublish = (name, topic, payload) => {
  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-inserthistory";
  const datainjson = {
    name: name,
    topic: topic,
    payload: payload,
  };

  postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
    responseData(result);
  });
};

const responseData = (result) => {
  if (result) {
    console.log("History Device Berhasil Disimpan", result.message);
  } else {
    console.error("History Device Gagal Disimpan", result.message);
  }
};

export { logPublish };
