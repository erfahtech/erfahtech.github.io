import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const editDevice = async (IDEDIT, DeviceName, DeviceTopic) => {
    const deviceId = IDEDIT;
    const deviceName = DeviceName; // Nama perangkat
    const deviceTopic = DeviceTopic;
    // console.log("device id= " + deviceId);

    const { value: combinedInput, isConfirmed: isInputConfirmed } = await Swal.fire({
        title: 'Edit Device',
        html:
            `<input id="swal-input1" class="swal2-input" placeholder="New Name" value="${DeviceName}">
            <input id="swal-input2" class="swal2-input" placeholder="New Topic" value="${DeviceTopic}">`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ];
        },
        didOpen: () => {
            const inputs = Swal.getPopup().querySelectorAll('input');
            inputs[0].focus();
        },
        inputValidator: (value) => {
            if (!value[0]) {
                return 'Nama perangkat tidak boleh kosong!';
            }
            if (!value[1]) {
                return 'Topic perangkat tidak boleh kosong!';
            }
        }
    });

    if (isInputConfirmed) {
        const [newName, newTopic] = combinedInput;
        const isConfirmed = await Swal.fire({
            title: `Apakah Anda yakin ingin mengedit perangkat ini menjadi:\nNama: '${newName}'\nTopic: '${newTopic}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Edit!',
            cancelButtonText: 'Batal',
        });

        if (isConfirmed.isConfirmed) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + getCookie("token"));

            const target_url = `https://asia-southeast2-urse-project.cloudfunctions.net/urse-editdevice?id=${deviceId}&name=${newName}&topic=${newTopic}`;

            try {
                const response = await fetch(target_url, {
                    method: "PUT",
                    headers: myHeaders,
                    redirect: "follow",
                });

                if (response.ok) {
                    await Swal.fire({
                        icon: "success",
                        title: "Perangkat berhasil diubah",
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
    }
};

window.editDevice = editDevice;
