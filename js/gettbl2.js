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
<div class="flex justify-between px-6 py-1.5">
  <div>
    <a
      href="editMagang?magangId=#IDEDIT#"
      class="inline-flex items-center px-2 cursor-pointer text-sm text-green-600 decoration-2 hover:underline font-medium"
    >
      Edit
    </a>
  </div>
  <div>
    <a
      class="inline-flex items-center cursor-pointer text-sm text-red-600 decoration-2 hover:underline font-medium"
      onclick="deleteDevice('#IDHAPUS#')"
    >
      Delete
    </a>
  </div>
</div>
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
