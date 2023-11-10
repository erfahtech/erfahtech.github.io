import { addInner } from "https://jscroot.github.io/element/croot.js";

export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

export const tableDevice = `
<tr class="h-18 border-b border-coolGray-100">
    <td class="whitespace-nowrap px-6 bg-white text-left">
        <div class="flex items-center">
                <p class=" font-semibold text-coolGray-800">
                #NAME#
                </p>
    </td>
    <td class="whitespace-nowrap px-6 bg-white text-left">
    <div class="flex items-center">
            <p class=" font-semibold text-coolGray-500">#TOPIC#</p>
    </div>
    </td>
    <td class="whitespace-nowrap px-6 bg-white text-sm font-medium text-coolGray-800 text-center">
     <button class="edit-button">
        <span class="material-symbols-outlined">
        edit
        </span>
     </button>
     <button class="delete-button">
        <span class="material-symbols-outlined">
        delete
        </span>
     </button>
     </td>
    </td>
</tr>
`;

export function responseData(results) {
    console.log(results);
    results.data.forEach(isiTable);
}

export function isiTable(value) {
    const content = tableDevice.replace("#TOPIC#", value.topic).replace("#NAME#", value.name);
    addInner("device", content);

    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((button, index) => {
        button.addEventListener('click', () => openEditDialog(value.name, value.topic, index));
    });
}

function openEditDialog(name, topic, index) {
    // Mengisi nilai input dengan nilai saat ini
    document.getElementById('editName').value = name;
    document.getElementById('editTopic').value = topic;

    // Menyimpan index untuk referensi saat menyimpan perubahan
    document.getElementById('saveChanges').setAttribute('data-index', index);

    // Menampilkan dialog
    document.getElementById('editDialog').style.display = 'block';
}

document.getElementById('saveChanges').addEventListener('click', () => {
    const editedName = document.getElementById('editName').value;
    const editedTopic = document.getElementById('editTopic').value;
    const index = document.getElementById('saveChanges').getAttribute('data-index');

    // Lakukan apa pun yang diperlukan untuk menyimpan perubahan (misalnya, update data di server)
    // Misalnya: 
    // Update data di array:
    // results.data[index].name = editedName;
    // results.data[index].topic = editedTopic;

    // Kemudian, tutup dialog
    document.getElementById('editDialog').style.display = 'none';
});