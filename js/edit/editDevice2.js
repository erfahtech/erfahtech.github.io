import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export function updatetWithBearer(target_url, token, datajson, responseFunction) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(datajson);

    var requestOptions = {
        method: "PUT", // Metode PUT
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    return fetch(target_url, requestOptions)
        .then((response) => response.text())
        .then((result) => responseFunction(JSON.parse(result)))
        .catch((error) => console.log("error", error));
}

const editDevice = async (IDEDIT, NAME, TOPIC) => {
    const deviceId = IDEDIT;
    const deviceName = NAME;
    const deviceTopic = TOPIC;
    console.log("Edit device called:", IDEDIT, NAME, TOPIC);

    const { value: combinedInput, isConfirmed: isInputConfirmed } = await Swal.fire({
        title: "Edit Device",
        html: `<div>
                <input id="swal-input1" class="swal2-input" placeholder="New Name" value="${deviceName}">
                <input id="swal-input2" class="swal2-input" placeholder="New Topic" value="${deviceTopic}">
                </div>`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        preConfirm: () => {
            return [document.getElementById("swal-input1").value, document.getElementById("swal-input2").value];
        },
        didOpen: () => {
            const inputs = Swal.getPopup().querySelectorAll("input");
            inputs[0].focus();
        },
        inputValidator: (value) => {
            if (!value[0]) {
                return "Nama perangkat tidak boleh kosong!";
            }
            if (!value[1]) {
                return "Topic perangkat tidak boleh kosong!";
            }
        },
    });

    if (isInputConfirmed) {
        const [newName, newTopic] = combinedInput;
        const isConfirmed = await Swal.fire({
            title: `Konfirmasi`,
            text: `Apakah Anda yakin? \nNama: '${newName}'\nTopic: '${newTopic}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Edit!",
            cancelButtonText: "Batal",
        });

        if (isConfirmed.isConfirmed) {
            const token = getCookie("token");
            const target_url = `https://asia-southeast2-urse-project.cloudfunctions.net/urse-updatedevice?id=${deviceId}`;
            const requestBody = {
                name: newName,
                topic: newTopic,
            };

            try {
                const response = await updatetWithBearer(target_url, token, requestBody, (result) => result);

                if (response.status) {
                    await Swal.fire({
                        icon: "success",
                        title: response.message || "Perangkat berhasil diubah",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    location.reload();
                } else {
                    console.error("Request failed with status:", response.status);
                    throw new Error("Request failed with status: " + response.status);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
};

window.editDevice = editDevice;
