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
        <button class="mr-4 edit-button" title="Edit">
            <span class="material-symbols-outlined">
                edit
            </span>
        </button>
        <button type="button" id="del_button" onclick="" title="Delete">
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>
    </td>
</tr>
`;

export function showEditDialog(index) {
    const dialog = document.getElementById('edit-dialog');
    dialog.style.display = 'block';
    const device = tableDevice.devices[index];
    const nameInput = document.getElementById('device-name');
    const topicInput = document.getElementById('device-topic');
    nameInput.value = device.name;
    topicInput.value = device.topic;
}

export function closeEditDialog() {
    const dialog = document.getElementById('edit-dialog');
    dialog.style.display = 'none';
}


export function responseData(results) {
    console.log(results);
    results.data.forEach(isiTable);
}

export function isiTable(value) {
    const content = tableDevice.replace("#TOPIC#", value.topic).replace("#NAME#", value.name);
    addInner("device", content);
}