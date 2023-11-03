import { addInner } from "https://jscroot.github.io/element/croot.js";

export const URLGetDevice =
    "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

export const cardDevice = `
<div class="bg-white dark:bg-surfacedark-200 rounded-lg shadow-lg h-full p-6">
        <div class="flex flex-wrap flex-row items-center">
          <div class="flex-shrink max-w-full w-1/2">
            <h5 class="text-gray-500 mb-1">#Topic#</h5>
            <h3 class="text-lg font-bold mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="inline-block ltr:mr-2 rtl:ml-2 -mt-1 bi bi-lightbulb" viewBox="0 0 16 16">
                <path
                  d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
              </svg> #Name#
            </h3>
            <p class="text-sm text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                class="inline-block w-4 h-4 bi bi-arrow-down-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z">
                </path>
              </svg>
              #Status#
            </p>
          </div>
          <div class="flex-shrink max-w-full w-1/2">
            <canvas class="max-w-100" id="BarComments"
              style="display: block; box-sizing: border-box; height: 66px; width: 132px;" width="528"
              height="264"></canvas>
          </div>
        </div>
      </div>
`;

export function responseData(results) {
    console.log(results);
    results.forEach(isiCard);
}

export function isiCard(value) {
    const content = cardDevice
        .replace("#Topic#", value.topic)
        .replace("#Name#", value.name)
        .replace("#Status#", value.status);
    addInner("devices", content);
}