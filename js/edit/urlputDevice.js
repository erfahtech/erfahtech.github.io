const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user");

export const urlPUT =
  "https://asia-southeast2-urse-project.cloudfunctions.net/urse-updatedevice" +
  user;

export const AmbilResponse = (result) => {
  console.log(result); // menampilkan response API pada console
  Swal.fire({
    icon: "success",
    title: "Data berhasil diubah",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    window.location.href = "profile.html";
  });
};