import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const deleteDevice = async (IDHAPUS) => {
  const deviceId = IDHAPUS;
  console.log("device id= " + deviceId);

  const isConfirmed = await Swal.fire({
    title: "Apakah Anda yakin ingin menghapus device ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

  if (isConfirmed.isConfirmed) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie("token"));

    const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-deletedevice?id=" + deviceId;

    try {
      const response = await fetch(target_url, {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Data berhasil dihapus",
          showConfirmButton: false,
          timer: 1500,
        });
        location.reload();
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

window.deleteDevice = deleteDevice;
