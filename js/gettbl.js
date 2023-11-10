import { addInner } from "https://jscroot.github.io/element/croot.js";

export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

export const tableDevice = `
<tr class="h-18 border-b border-coolGray-100">
    <td class="whitespace-nowrap px-4 bg-white text-left">
        <div class="flex items-center -m-2">
        <div class="w-auto p-2">
                <p class="text-xs font-semibold text-coolGray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="inline-block ltr:mr-2 rtl:ml-2 -mt-1 bi bi-cpu" viewBox="0 0 16 16">
                    <path
                        d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg>
                #NAME#
                </p>
        </div>
    </td>
    <td class="whitespace-nowrap px-4 bg-white text-left">
    <div class="flex items-center -m-2">
        <div class="w-auto p-2">
            <p class="text-xs font-semibold text-coolGray-500">#TOPIC#</p>
        </div>
    </div>
    </td>
    <td class="whitespace-nowrap px-4 bg-white text-sm font-medium text-coolGray-800 text-center">
    <a type="button" href="#" class="mr-4" title="Edit">
    </a>
    <button type="button" id="del_button" onclick="" title="Delete">
    </button>
    </td>
</tr>
`;

export function responseData(results) {
    console.log(results);
    results.data.forEach(isiTable);
}

export function isiTable(value) {
    const content = tableDevice.replace("#TOPIC#", value.topic).replace("#NAME#", value.name);
    // .replace("#STATUS#", value.status);
    addInner("device", content);
}