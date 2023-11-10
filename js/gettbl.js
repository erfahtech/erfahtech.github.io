import { addInner } from "https://jscroot.github.io/element/croot.js";

export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

// export const tableDevice = `
// <tr class="h-18 border-b border-coolGray-100">
//     <td class="whitespace-nowrap px-6 bg-white text-left">
//         <div class="flex items-center">
//                 <p class=" font-semibold text-coolGray-800">
//                 #NAME#
//                 </p>
//     </td>
//     <td class="whitespace-nowrap px-6 bg-white text-left">
//     <div class="flex items-center">
//             <p class=" font-semibold text-coolGray-500">#TOPIC#</p>
//     </div>
//     </td>
//     <td class="whitespace-nowrap px-6 bg-white text-sm font-medium text-coolGray-800 text-center">
//     <a type="button" href="#" class="mr-4" title="Edit">
//             <span class="material-symbols-outlined">
//             edit
//             </span>
//         </a>
//         <button type="button" id="del_button" onclick="" title="Delete">
//             <span class="material-symbols-outlined">
//             delete
//             </span>
//         </button>
//     </td>
// </tr>
// `;

export const tableDevice = `
<tr class="h-18 border-b border-coolGray-100">
    <td class="whitespace-nowrap px-6 bg-white text-left">
        <div class="flex items-center">
            <p class=" font-semibold text-coolGray-800">
                #NAME#
            </p>
        </div>
    </td>
    <td class="whitespace-nowrap px-6 bg-white text-left">
        <div class="flex items-center">
            <p class=" font-semibold text-coolGray-500">#TOPIC#</p>
        </div>
    </td>
    <td class="whitespace-nowrap px-6 bg-white text-sm font-medium text-coolGray-800 text-center">
        <a type="button" href="#" class="mr-4 edit-button" title="Edit">
            <span class="material-symbols-outlined">
                edit
            </span>
        </a>
        <button type="button" id="del_button" onclick="" title="Delete">
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>
    </td>
</tr>
`;

// Menambahkan event listener pada tombol "Edit"
document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', () => {
        const dialog = document.getElementById('your-dialog-id'); // Ganti dengan ID dialog Anda

        // Tampilkan dialog
        dialog.style.display = 'block';

        // Mendapatkan nilai dari kolom #NAME# dan #TOPIC# untuk diedit
        const name = button.closest('tr').querySelector('.text-coolGray-800').textContent.trim();
        const topic = button.closest('tr').querySelector('.text-coolGray-500').textContent.trim();

        // Isi nilai kolom pada dialog
        document.getElementById('isiName').value = name;
        document.getElementById('isiTopic').value = topic;

        // Setelah pengguna selesai mengedit, Anda dapat menangani penyimpanan perubahan dengan mengatur event handler pada tombol "Save" di dalam dialog.
        const saveButton = dialog.querySelector('.btn');
        saveButton.addEventListener('click', () => {
            // Lakukan logika untuk menyimpan perubahan di sini

            // Setelah selesai, sembunyikan dialog
            dialog.style.display = 'none';
        });

        // Atau Anda juga bisa menambahkan event listener untuk tombol "Cancel" di dalam dialog untuk menyembunyikan dialog saat tombol "Cancel" ditekan.
        const cancelButton = dialog.querySelector('.closeDialog');
        cancelButton.addEventListener('click', () => {
            dialog.style.display = 'none';
        });
    });
});


export function responseData(results) {
    console.log(results);
    results.data.forEach(isiTable);
}

export function isiTable(value) {
    const content = tableDevice.replace("#TOPIC#", value.topic).replace("#NAME#", value.name);
    addInner("device", content);
}