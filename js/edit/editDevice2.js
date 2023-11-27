// import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

// const updateWithBearer = async (target_url, token, datajson, responseFunction) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${token}`);
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify(datajson);

//     const requestOptions = {
//         method: "PUT",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//     };

//     try {
//         const response = await fetch(target_url, requestOptions);
//         const result = await response.text();
//         responseFunction(JSON.parse(result));
//         return response; // Return the entire response object
//     } catch (error) {
//         console.log("error", error);
//         throw error; // Rethrow the error to be caught in the calling function
//     }
// };

// const editDevice = async (IDEDIT, NAME, TOPIC) => {
//     const deviceId = IDEDIT;
//     const deviceName = NAME;
//     const deviceTopic = TOPIC;
//     console.log("Edit device called:", IDEDIT, NAME, TOPIC);

//     const data = {
//         name: NAME,
//         topic: TOPIC,
//     };
//     const { value: combinedInput, isConfirmed: isInputConfirmed } = await Swal.fire({
//         title: "Edit Device",
//         html: `<div>
//                 <input id="swal-input1" class="swal2-input" placeholder="New Name" value="${deviceName}">
//                 <input id="swal-input2" class="swal2-input" placeholder="New Topic" value="${deviceTopic}">
//                 </div>`,
//         showCancelButton: true,
//         confirmButtonColor: "#6750A4",
//         cancelButtonColor: "#999999",
//         confirmButtonText: "Simpan",
//         cancelButtonText: "Batal",
//         preConfirm: (input) => {
//             // Update data object with new values
//             data.name = newName;
//             data.topic = newTopic;

//             const newName = input[0];
//             const newTopic = input[1];

//             if (!newName || !newTopic) {
//                 Swal.showValidationMessage("Nama dan Topic perangkat tidak boleh kosong!");
//                 return false;
//             }

//             // Validate that the Topic allows only lowercase letters, numbers, and symbols
//             const topicRegex = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`-]+$/;
//             if (!topicRegex.test(newTopic)) {
//                 Swal.showValidationMessage("Topic perangkat hanya boleh mengandung huruf kecil, angka, dan simbol!");
//                 return false;
//             }

//             return true;
//         },
//         didOpen: () => {
//             const inputs = Swal.getPopup().querySelectorAll("input");
//             inputs[0].focus();
//         },
//     });

//     if (isInputConfirmed) {
//         const [newName, newTopic] = combinedInput;
//         const isConfirmed = await Swal.fire({
//             title: `Konfirmasi`,
//             html: `<div>Apakah Anda yakin mengubah?</div>
//                     <div>Nama: ${newName}</div>
//                     <div>Topic: ${newTopic}</div>`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#6750A4",
//             cancelButtonColor: "#999999",
//             confirmButtonText: "Ya, Edit!",
//             cancelButtonText: "Batal",
//         });

//         if (isInputConfirmed) { // Change isConfirmed.isConfirmed to isInputConfirmed
//             const token = getCookie("token");
//             const target_url = `https://asia-southeast2-urse-project.cloudfunctions.net/urse-updatedevice?id=${deviceId}`;
//             const requestBody = {
//                 name: newName,
//                 topic: newTopic,
//             };

//             try {
//                 const response = await updateWithBearer(target_url, token, requestBody, (result) => result);

//                 if (response && response.status) {
//                     await Swal.fire({
//                         icon: "success",
//                         title: response.message || "Perangkat berhasil diubah",
//                         showConfirmButton: false,
//                         timer: 1500,
//                     });
//                     location.reload();
//                 } else {
//                     console.error("Request failed with status:", response && response.status);
//                     throw new Error("Request failed with status: " + (response && response.status));
//                 }
//             } catch (error) {
//                 console.error("Error:", error);
//             }
//         }
//     }
// };

// window.editDevice = editDevice;

import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const updateWithBearer = async (target_url, token, datajson, responseFunction) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(datajson);

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(target_url, requestOptions);
        const result = await response.text();
        responseFunction(JSON.parse(result));
        return response; // Return the entire response object
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error to be caught in the calling function
    }
};

const editDevice = async (IDEDIT, NAME, TOPIC) => {
    const deviceId = IDEDIT;
    const deviceName = NAME;
    const deviceTopic = TOPIC;
    console.log("Edit device called:", IDEDIT, NAME, TOPIC);

    const data = {
        name: deviceName,
        topic: deviceTopic,
    };

    const { value: combinedInput, isConfirmed: isInputConfirmed } = await Swal.fire({
        title: "Edit Device",
        html: `<div>
                <input id="swal-input1" class="swal2-input" placeholder="New Name" value="${deviceName}">
                <input id="swal-input2" class="swal2-input" placeholder="New Topic" value="${deviceTopic}">
            </div>`,
        showCancelButton: true,
        confirmButtonColor: "#6750A4",
        cancelButtonColor: "#999999",
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        preConfirm: (input) => {
            const newName = input[0];
            const newTopic = input[1];

            if (!newName || !newTopic) {
                Swal.showValidationMessage("Nama dan Topic perangkat tidak boleh kosong!");
                return false;
            }

            // Validasi bahwa Topic hanya boleh mengandung huruf kecil, angka, dan simbol
            const topicRegex = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`-]+$/;
            if (!topicRegex.test(newTopic)) {
                Swal.showValidationMessage("Topic perangkat hanya boleh mengandung huruf kecil, angka, dan simbol!");
                return false;
            }

            // Perbarui objek data dengan nilai baru
            data.name = newName;
            data.topic = newTopic;

            return true;
        },
        didOpen: () => {
            const inputs = Swal.getPopup().querySelectorAll("input");
            inputs[0].focus();
        },
    });

    if (isInputConfirmed) {
        const [newName, newTopic] = combinedInput;
        const isConfirmed = await Swal.fire({
            title: `Konfirmasi`,
            html: `<div>Apakah Anda yakin mengubah?</div>
                    <div>Nama: ${newName}</div>
                    <div>Topic: ${newTopic}</div>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6750A4",
            cancelButtonColor: "#999999",
            confirmButtonText: "Ya, Edit!",
            cancelButtonText: "Batal",
        });

        if (isConfirmed.value) { // Change isConfirmed.isConfirmed to isConfirmed.value
            const token = getCookie("token");
            const target_url = `https://asia-southeast2-urse-project.cloudfunctions.net/urse-updatedevice?id=${deviceId}`;
            const requestBody = {
                name: newName,
                topic: newTopic,
            };

            try {
                const response = await updateWithBearer(target_url, token, requestBody, (result) => result);

                if (response && response.status) {
                    await Swal.fire({
                        icon: "success",
                        title: response.message || "Perangkat berhasil diubah",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    location.reload();
                } else {
                    console.error("Request failed with status:", response && response.status);
                    throw new Error("Request failed with status: " + (response && response.status));
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
};

window.editDevice = editDevice;

