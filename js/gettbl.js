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
     <button class="delete-button" onclick="deleteDevice('#IDHAPUS#')>
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
    const content = tableDevice.replace("#TOPIC#", value.topic).replace("#NAME#", value.name).replace("#IDHAPUS#", value._id);
    addInner("devices", content);
}
