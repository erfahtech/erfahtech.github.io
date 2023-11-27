// getprofile.js

export const URLGetProfile = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getprofile";

export const responseProfileData = (data) => {
  // Pastikan data adalah array dan memiliki elemen pertama
  if (Array.isArray(data) && data.length > 0) {
    const userData = data[0]; // Ambil elemen pertama dari array

    // Menggunakan getElementById untuk mengatur nilai dalam elemen HTML
    document.getElementById("username").textContent = userData.username;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("phonenumber").textContent = userData.phonenumber;

    //Mengambil Lokasi
    const location = localStorage.getItem("user-location");
    document.getElementById("location").textContent = location;

    //Mengambil Total devices
    const totalDevices = localStorage.getItem("totalDevices");
    document.getElementById("totaldev").textContent = totalDevices;
  } else {
    console.error("Data pengguna tidak valid atau tidak ditemukan.");
  }
};
