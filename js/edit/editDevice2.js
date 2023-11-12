import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const editDevice = async (IDEDIT) => {
    const deviceId = IDEDIT;
    console.log("device id= " + deviceId);

    const { value: newName } = await Swal.fire({
        title: 'Edit Device Name',
        input: 'text',
        inputValue: deviceId, // Pre-fill the input with the current device name
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal',
        inputValidator: (value) => {
            if (!value) {
                return 'Nama perangkat tidak boleh kosong!';
            }
        }
    });

    const { value: newTopic } = await Swal.fire({
        title: 'Edit Device Topic',
        input: 'text',
        inputValue: 'Current Topic', // Pre-fill the input with the current device topic
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal',
        inputValidator: (value) => {
            if (!value) {
                return 'Tema perangkat tidak boleh kosong!';
            }
        }
    });

    if (newName && newTopic) {
        const isConfirmed = await Swal.fire({
            title: `Apakah Anda yakin ingin mengedit perangkat ini menjadi:\nNama: '${newName}'\nTema: '${newTopic}'?`,
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
