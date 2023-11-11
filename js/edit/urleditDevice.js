const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user");

export const urlFetch =
  "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices" +
  user;