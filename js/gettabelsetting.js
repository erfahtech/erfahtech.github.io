import { addInner } from "https://jscroot.github.io/element/croot.js";

export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

export const tableDevice = `
<tr>
    <td>
        <div class="flex items-center gap-3">
            <div class="flex flex-col">
                <h4 class="font-semibold">#NAME#.</h4>
            </div>
        </div>
    </td>
    <td>
        <span
            class="inline-flex items-center h-6 px-3 text-label-md text-pink-700 dark:text-pink-200 bg-pink-100 dark:bg-opacity-20 rounded-full">
            #TOPIC#
        </span>
    </td>
    <td class="whitespace-nowrap px-6 bg-white dark:bg-surfacedark-200 text-sm font-medium text-coolGray-800 text-center">
        <button onclick="editDevice('#IDEDIT#', '#NAME#', '#TOPIC#')" title="Edit">
            <span class="material-symbols-outlined">
                edit
            </span>
        </button>
        <button onclick="deleteDevice('#IDHAPUS#')" title="Delete">
            <span class="material-symbols-outlined">
            delete
            </span>
        </button>
    </td>
</tr>
`;

export function responseData(results) {
  console.log(results);
  results.data.forEach(isiTable);
}

export function isiTable(value) {
  const content = tableDevice
    .replace(/#TOPIC#/g, value.topic)
    .replace(/#NAME#/g, value.name)
    .replace(/#IDEDIT#/g, value.id)
    .replace(/#IDHAPUS#/g, value.id);
  addInner("devices", content);
}
